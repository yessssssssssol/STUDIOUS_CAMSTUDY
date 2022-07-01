import StopWatch from '../../../components/studyroom/StopWatch';
import AIFunc from '../../../components/studyroom/AIFunc';
import AlertModal from '../../../components/studyroom/AlertModal';
import Loading from '../../../components/common/Loading';
import { io } from 'socket.io-client';
import { aiAtom, noUseAiAtom } from '../../../core/atoms/aiState';
import React, {
  isValidElement,
  useEffect,
  useState,
  useRef,
  useDebugValue,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as API from '../../api/api';
import { useRouter } from 'next/router';
import { GoUnmute, GoMute } from 'react-icons/go';
import {
  TbDeviceComputerCamera,
  TbDeviceComputerCameraOff,
} from 'react-icons/tb';

import * as ReactDOM from 'react-dom/client';
import { userAtom } from '../../../core/atoms/userState';
import ChatHeader from '../../../components/studyroom/chat/ChatHeader';

const backendPortNumber = process.env.REACT_APP_SERVER_PORT || 5000;

const hostname =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : '';
const url = 'http://' + hostname + ':' + backendPortNumber;

let myStream = null;
let myPeerConnection = null;
let myDataChannel = null;
let peerConnections = {};
let dataChannels = {};
let chatAll = [];

function rtcInit() {
  myStream = null;
  myPeerConnection = null;
  myDataChannel = null;
  peerConnections = {};
  dataChannels = {};
  chatAll = [];
}

// 채팅용
const chatRes = {
  type: 'message',
  data: '',
};
// ex)
// const chatRes = {
//   type: "message",
//   data : "안녕하세여"
// }

// 유저 데이터 갱신용
const userRes = {
  type: 'user',
  data: {},
};

// ex)
// const userRes = {
//   type: "state",
//   data : {
//     userId :
//     state :
//     userName :
//     socketId
//   }
// }

const stateRes = {
  type: 'state',
  data: {},
};
// ex)
// const stateRes = {
//   type: "state",
//   data : {
//     userId :
//     result :
//   }
// }

const cameraRes = {
  type: 'camera',
  data: {},
};
// ex)
// const cameraRes = {
//   type: "camera",
//   data : {
//     userId :
//     result :
//   }
// }

const timeRes = {
  type: 'time',
  data: {},
};

const muteRes = {
  type: 'mute',
  data: {},
};

export default function Group() {
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);

  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);
  // const [noUseAi, setUserAiAtom] = useRecoilState(noUseAiAtom);

  const userValue = useRecoilValue(userAtom);
  const stopWatchRef = useRef();

  const [userList, setUserList] = useState({});

  const [key1Mute, setKey1Mute] = useState(false);
  const [key1Camera, setKey1Camera] = useState(true);
  const [key1State, setKey1State] = useState(false);

  const [key2Mute, setKey2Mute] = useState(false);
  const [key2Camera, setKey2Camera] = useState(true);
  const [key2State, setKey2State] = useState(false);

  const [key3Mute, setKey3Mute] = useState(false);
  const [key3Camera, setKey3Camera] = useState(true);
  const [key3State, setKey3State] = useState(false);

  let aiInterval = null;
  let roomId;

  // 채팅에 사용하는 유저 정보 리스트
  const [userDatas, setUserDatas] = useState([]);
  useEffect(() => {
    async function getUserId() {
      try {
        const res = await API.get(`userlist`);
        setUserDatas(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserId();
  }, []);

  if (typeof window !== 'undefined') {
    const leng = window.location.href.length;
    let href = window.location.href;
    if (href[leng - 1] === '/') {
      href = href.slice(0, leng - 1);
    }
    roomId = href.substring(href.lastIndexOf('/') + 1);
  }

  const socket = io(url, {
    withCredentials: true,
    extraHeaders: {
      checkMyService: user?.id,
    },
  });

  function addMessage(message) {
    setChat([...chatAll, message]);
    chatAll.push(message);
  }

  async function initCall(data) {
    await getMedia();

    // if (myStream == null) {
    //   rtcInit();
    //   location.reload();
    //   setUserAiAtom(false);
    //   router.push('/openroom');
    // }

    console.log("mystream : " + myStream);

    socket.emit(
      'enter_room',
      data?.roomId,
      socket.id,
      user?.id,
      user?.name,
      () => {
        setIsLoading(true);
      }
    );
  }

  async function getMedia(deviceId) {
    const initialConstraints = {
      audio: true,
      video: { facingMode: 'user' },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      if (navigator.mediaDevices) {
        setIsCamera(true);
        myStream = await navigator.mediaDevices.getUserMedia(
          deviceId ? cameraConstraints : initialConstraints
        );
        if (!deviceId) {
          await selectCamera();
        }
      } else {
        setIsCamera(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleIce(data, othersId) {
    // ice 이벤트 발생 시 이를 방안의 다른 사람들에게 내껄 전달
    socket.emit('ice', data.candidate, othersId, socket.id); // send ice candidate
  }

  function FindUser(socketId) {

    Object.keys(userList).forEach((v) => {
      if (userList[v].socketId === socketId) {
        const data = userList[v];
        return data;
      }
    });
    return null;
  }

  function handleAddStream(data, othersId) {
    console.log('got an stream from my pear');
    console.log("Peer's Stream", data.stream);
    console.log('my Stream', myStream);
    // 비디오 태그 추가한 뒤에 띄우기
    console.log('othersId : ' + othersId);

    document.get;

    const cameras = document.getElementsByClassName('camera');
    const names = document.getElementsByClassName('name');
    const timers = document.getElementsByClassName('stopWatch');

    console.log(cameras);
    console.log(names);
    console.log("datastream : ", data.stream);

    for (let i in cameras) {
      console.log(cameras[i]);
      if (cameras[i].id === 'none') {
        console.log("findfindfind");
        cameras[i].id = othersId;
        const video = document.createElement(video);

        if ('srcObject' in cameras[i]) {
          try{
            cameras[i].srcObject = data.stream;
          } catch(err) {
            console.log(err);
          }
        }
        names[i].id = othersId;
        timers[i].id = othersId;
        break;
      }
    }
  }

  function MuteBtnClick() {
    const muteBtn = document.getElementById('muteBtn');
    if (myStream !== null) {
      console.log(myStream.getAudioTracks());
      myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      if (isMute == true) {
        // muteBtn.innerText = 'Unmute';
        setMute(false);

        Object.keys(dataChannels).forEach((userId) => {
          let req = muteRes;
          req.data.userId = user.id;
          req.data.result = false;
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId].send(JSON.stringify(req));
          }
          // dataChannels[userId].send(JSON.stringify(req));
        });
      } else {
        // muteBtn.innerText = 'Mute';
        setMute(true);

        Object.keys(dataChannels).forEach((userId) => {
          let req = muteRes;
          req.data.userId = user.id;
          req.data.result = true;
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId].send(JSON.stringify(req));
          }
          // dataChannels[userId].send(JSON.stringify(req));
        });
      }
    }
    console.log(userList);
  }

  function CameraOnOffClick() {
    const cameraBtn = document.getElementById('cameraBtn');
    if (myStream !== null) {
      myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      console.log(myStream.getVideoTracks());
      if (isCameraOn == true) {
        // cameraBtn.innerText = 'turnOff';
        setCameraOn(false);

        Object.keys(dataChannels).forEach((userId) => {
          let req = cameraRes;
          req.data.userId = user.id;
          req.data.result = false;
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId].send(JSON.stringify(req));
          }
          // dataChannels[userId].send(JSON.stringify(req));
        });
      } else {
        // cameraBtn.innerText = 'turnOn';
        setCameraOn(true);

        Object.keys(dataChannels).forEach((userId) => {
          let req = cameraRes;
          req.data.userId = user.id;
          req.data.result = true;
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId].send(JSON.stringify(req));
          }
          // dataChannels[userId].send(JSON.stringify(req));
        });
      }
    }
    console.log(userList);
  }

  function MessageParse(res) {
    if (res.type === 'message') {
      addMessage(res.data);
    } else if (res.type === 'user') {
      // 유저 데이터 저장 혹인 갱신

      // userList[res.data?.userId] = res.data;
      addMessage(`  : ${res.data?.userName}님 입장하셨습니다!`);

      // 여기서 카메라 만듬 대신 아이디를 유저 아이디로 한다.
      console.log(res.data);
      console.log(res.data?.socketId);

      const names = document.getElementsByClassName('name');

      for (let i in names) {
        if (names[i].id === res.data?.socketId) {
          names[i].innerText = res.data?.userName;
        }
      }

      const timers = document.getElementsByClassName('stopWatch');

      for (let i in timers) {
        if (timers[i].id === res.data?.socketId) {
          const root = ReactDOM.createRoot(timers[i]);
          const stopwatch = React.createElement(StopWatch, {
            myTimer: false,
            roomId: roomId,
            membersOnly: room?.membersOnly,
            userT: res.data?.userTime,
          });
          root.render(stopwatch);
        }
      }

      let prevList = userList;
      prevList[res.data?.userId] = res.data;
      setUserList(prevList);
      
    } else if (res.type == 'state') {
      // 집중 여부 갱신
      if (userList.hasOwnProperty(res.data?.userId) == false) {
        return;
      }

      let prevList = userList;
      let prev = userList[res.data?.userId];

      prev['state'] = res.data?.result;
      prevList[res.data?.userId] = prev;

      setUserList(prevList);

      console.log(prevList[res.data?.userId]);
      // userList[res.data?.userId].state = res.data?.result;
      const cameras = document.getElementsByClassName('camera');

      for (let i in cameras) {
        if (FindUser(cameras[i].id) === null) {
          continue;
        } else {
          if (i == 0) {
            setKey1State(userList[res.data?.userId].state);
          } else if (i == 1) {
            setKey2State(userList[res.data?.userId].state);
          } else if (i == 2) {
            setKey3State(userList[res.data?.userId].state);
          }
          break;
        }
      }
    } else if (res.type == 'camera') {
      if (userList.hasOwnProperty(res.data?.userId) == false) {
        return;
      }

      let prevList = userList;
      let prev = userList[res.data?.userId];

      prev['cameraOnState'] = res.data?.result;
      prevList[res.data?.userId] = prev;

      setUserList(prevList);
      // userList[res.data?.userId].cameraOnState = res.data?.result;
      //console.log(userList[res.data?.userId]);

      const cameras = document.getElementsByClassName('camera');

      for (let i in cameras) {
        if (FindUser(cameras[i].id) === null) {
          continue;
        } else {
          if (i == 0) {
            setKey1Camera(userList[res.data?.userId].cameraOnState);
          } else if (i == 1) {
            setKey2Camera(userList[res.data?.userId].cameraOnState);
          } else if (i == 2) {
            setKey3Camera(userList[res.data?.userId].cameraOnState);
          }
          break;
        }
      }
    } else if (res.type == 'time') {
      if (userList.hasOwnProperty(res.data?.userId) == false) {
        return;
      }
    } else if (res.type == 'mute') {
      if (userList.hasOwnProperty(res.data?.userId) == false) {
        return;
      }
      let prevList = userList;
      let prev = userList[res.data?.userId];

      prev['muteState'] = res.data?.result;
      prevList[res.data?.userId] = prev;

      setUserList(prevList);

      const cameras = document.getElementsByClassName('camera');

      for (let i in cameras) {
        if (FindUser(cameras[i].id) === null) {
          continue;
        } else {
          if (i == 0) {
            setKey1Mute(userList[res.data?.userId].muteState);
          } else if (i == 1) {
            setKey2Mute(userList[res.data?.userId].muteState);
          } else if (i == 2) {
            setKey3Mute(userList[res.data?.userId].muteState);
          }
          break;
        }
      }
    }
  }

  async function makeConnection(userId, offer = null) {
    if (RTCPeerConnection != undefined) {
      myPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302',
              "stun:stun2.l.google.com:19302",
              "stun:stun3.l.google.com:19302",
              "stun:stun4.l.google.com:19302",
              "stun:stun.ekiga.net",
              "stun:stun.ideasip.com",
              "stun:stun.rixtelecom.se",
              "stun:stun.schlund.de",
              "stun:stun.stunprotocol.org:3478",
              "stun:stun.voiparound.com",
              "stun:stun.voipbuster.com",
              "stun:stun.voipstunt.com",
              "stun:stun.voxgratia.org"
            ],
          },
        ],
      });

      peerConnections[userId] = myPeerConnection;

      // 연결 후 처리 이벤트 등록
      myPeerConnection.addEventListener('icecandidate', (data) =>
        handleIce(data, userId)
      );
      myPeerConnection.addEventListener('addstream', (data) =>
        handleAddStream(data, userId)
      );
      if (myStream != null) {
        myStream
          .getTracks()
          .forEach((track) => myPeerConnection.addTrack(track, myStream));
      }

      let _offer = offer;
      let answer;

      if (!_offer) {
        myDataChannel = myPeerConnection.createDataChannel('chat');

        myDataChannel.addEventListener('open', (event) => {
          // let req = chatRes;
          // req.data = `${user?.name}님 입장하셨습니다!`;
          // myDataChannel.send(req);

          console.log(myPeerConnection);

          // 유저 데이터도 보내기?
          let req = userRes;

          req.data['userId'] = user?.id;
          req.data['socketId'] = socket.id;
          req.data['state'] = false;
          req.data['userName'] = user?.name;
          req.data['streamId'] = myStream?.id;
          req.data['cameraOnState'] = true;
          req.data['userTime'] = stopWatchRef?.current?.getTime()
            ? stopWatchRef?.current?.getTime()
            : 0;
          req.data['muteState'] = false;

          myDataChannel.send(JSON.stringify(req));
        });
        myDataChannel.addEventListener('message', (event) => {
          const res = JSON.parse(event.data);
          MessageParse(res);
        });
        // console.log("made data channel");
        // console.log(myDataChannel);

        _offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(_offer);
        // 자신의 로컬 목적지에 offer 설정

        dataChannels[userId] = myDataChannel;
      } else {
        myPeerConnection.addEventListener('datachannel', (event) => {
          myDataChannel = event.channel;
          myDataChannel.addEventListener('open', (event) => {
            // let req = chatRes;
            // req.data = `${user?.name}님 입장하셨습니다!`;
            // myDataChannel.send(req);

            // 유더 데이터도 보내기
            let req = userRes;
            console.log(myPeerConnection);

            req.data['userId'] = user?.id;
            req.data['socketId'] = socket.id;
            req.data['state'] = false;
            req.data['userName'] = user?.name;
            req.data['streamId'] = myStream?.id;
            req.data['cameraOnState'] = true;
            req.data['userTime'] = stopWatchRef?.current?.getTime()
              ? stopWatchRef?.current?.getTime()
              : 0;
            req.data['muteState'] = false;

            myDataChannel.send(JSON.stringify(req));
          });
          myDataChannel.addEventListener('message', (event) => {
            const res = JSON.parse(event.data);
            MessageParse(res);
          });

          dataChannels[userId] = myDataChannel;
        });

        myPeerConnection.setRemoteDescription(_offer);
        // 상대방 목적지로 전달받은 offer를 설정
        answer = await myPeerConnection.createAnswer();
        myPeerConnection.setLocalDescription(answer);
        // 내 로컬 목적지에 answer 설정
      }

      return answer || _offer;
    }
  }

  socket.on('welcome', async (newUserId) => {
    const offer = await makeConnection(newUserId);
    socket.emit('offer', offer, newUserId, socket.id); // 초대장 서버로 보내기
    console.log('send the offer');
  });

  socket.on('refuse', (errorMessage) => {
    console.log(errorMessage);
    // 들어가지 못한다는 에러페이지 출력
    rtcInit();
    // setUserAiAtom(false);
    location.reload();
    router.push('/openroom');
  });

  socket.on('bye', (leaveId, userName) => {
    // 나갔다는 메시지
    addMessage(`  : ${userName}님이 퇴장하셨습니다.!`);

    const stopWatch = document.getElementById(leaveId);
    if (stopWatch != null) {
      stopWatch.id = 'none';
      stopWatch.childNodes[0].remove();
    }

    const video = document.getElementById(leaveId);
    if (video != null) {
      video.id = 'none';
      video.srcObject = null;
    }

    const name = document.getElementById(leaveId);
    if (name != null) {
      name.id = 'none';
      name.innerText = '';
    }

    // peerConnections 제거
    Object.keys(peerConnections).forEach((id, i) => {
      if (id === leaveId) {
        delete peerConnections[id];
        console.log(peerConnections);
      }
    });

    const prevList = userList;

    Object.keys(prevList).forEach((v) => {
      if (v.socketId === leaveId) {
        delete prevList[v];
      }
    });

    setUserList(prevList);
  });

  // 이건 방에 접속한 사람이 실행된다. (Peer B)
  socket.on('offer', async (offer, offersId) => {
    console.log('receive the offer');
    console.log(offer);

    const answer = await makeConnection(offersId, offer);
    // 데이터 체널에 대한 이벤트 추가
    // 서버에서 받은 초대장 설정하기.
    // peerB에 offer이 도착하는 순간 아직 myPeerConnection이 존재하지 않음.

    socket.emit('answer', answer, socket.id, offersId);
  });

  socket.on('answer', async (answer, newUserId) => {
    console.log('receive the answer', newUserId);
    // 방에 있던 사람들은 뉴비를 위해 생성한 커섹션에 answer를 추가한다.
    peerConnections[newUserId].setRemoteDescription(answer);
  });

  socket.on('ice', (ice, othersId) => {
    // 다른 사람에게 온 othersId를 myPeerConnection에 등록
    peerConnections[othersId].addIceCandidate(ice); // recv icecandidate
    console.log(peerConnections);
  });

  const sendChatHandler = (e) => {
    e.preventDefault();
    const input = document.getElementById('inputbox');
    addMessage(`${user.name} : ${input.value}`);
    Object.keys(dataChannels).forEach((userId) => {
      let req = chatRes;
      req.data = `${user.name} : ${input.value}`;
      if (dataChannels[userId].readyState == 'open') {
        dataChannels[userId]?.send(JSON.stringify(req));
      }
      // dataChannels[userId]?.send(JSON.stringify(req));
    });
    input.value = '';
  };

  function AlertNoHear(result) {
    // 만약 현재 나의 스테이트값이
    let req = stateRes;
    req.data.userId = user?.id;
    req.data.result = result;

    if (Object.keys(dataChannels).length > 0) {
      Object.keys(dataChannels).forEach((userId) => {
        if (dataChannels[userId].readyState == 'open') {
          dataChannels[userId]?.send(JSON.stringify(req));
        }
        // console.log("datachannel : ", dataChannels[userId]);
        // dataChannels[userId]?.send(JSON.stringify(req));
      });
      console.log(result);
    }
    console.log('send Data');
  }

  function StartStopWatch(result) {
    let req = timeRes;
    req.data.userId = user?.id;
    req.data.result = result;

    if (Object.keys(dataChannels).length > 0) {
      Object.keys(dataChannels).forEach((userId) => {
        if (dataChannels[userId].readyState == 'open') {
          dataChannels[userId]?.send(JSON.stringify(req));
        }
      });
    }

    console.log(result);
  }

  function findUserByKey(key) {
    const cameras = document.getElementsByClassName('camera');
    const camera = cameras[key];

    const user = FindUser(camera?.id);
    return user;
  }

  useEffect(() => {
    async function getRoomData() {
      rtcInit();
      const res = await API.get(`studyroom/${roomId}`);
      const data = res.data;
      setRoom(data);

      if (myPeerConnection === null) {
        await initCall(data);
      }
    }
    getRoomData();

    return () => {
      rtcInit();
      // setUserAiAtom(false);
      location.reload();
    };
  }, []);

  // todo: 나갔을때 상태관리
  return (
    <div className="lg:grid lg:justify-center">
      <p className="font-bold text-center text-4xl m-5 mb-10">
        {room?.roomName}
      </p>
      {isLoading === true ? (
        <>
          <div className="grid justify-between lg:flex lg:mx-[10rem] lg:max-w-[1600px]  ">
            <div className="flex lg:w-9/12">
              <div className="h-full w-full flex flex-raw flex-wrap lg:flex justify-center gap-x-[2rem] gap-y-[2rem]">
                  <div className="rounded-xl w-[500px] h-[370px] relative bg-black">
                    <StopWatch
                      cb={(result) => {
                        StartStopWatch(result);
                      }}
                      myTimer={true}
                      roomId={roomId}
                      membersOnly={room?.membersOnly}
                      ref={stopWatchRef}
                      userT={0}
                    />
                    <div className="absolute bottom-[5px] left-[8px]">
                      {isMute ? (
                        <GoMute color="white" size="30" />
                      ) : (
                        <GoUnmute color="white" size="30" />
                      )}
                    </div>
                    <AIFunc
                      cb={(result) => {
                        AlertNoHear(result);
                      }}
                    />
                    <AlertModal />
                  </div>
                <div className="bg-yellow-200 w-[500px] h-[370px] relative rounded-xl ">
                  <div className="stopWatch" id="none" key={1}></div>
                  <div className="section w-full flex justify-center ">
                    <video
                      className="camera rounded-xl bg-blue"
                      id="none"
                      key={2}
                      width="100%"
                      height="100%"
                      playsInline
                      autoPlay
                    ></video>
                    {key1Camera && findUserByKey(0)?.cameraOnState ? 
                      ( <></> )
                     : (
                      <>
                        {key1State && findUserByKey(0)?.state ? (
                          <img
                            className="absolute w-[100%] h-[100%]"
                            src={`/work.png`}
                          ></img>
                        ) : (
                          <img
                            className="absolute w-[100%] h-[100%]"
                            src={`/sleep.png`}
                          ></img>
                        )}
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-[5px] left-[8px]">
                    {key1Mute && findUserByKey(0)?.muteState ? (
                      <GoMute color="white" size="30" />
                    ) : (
                      <GoUnmute color="white" size="30" />
                    )}
                  </div>
                  <div className="bottom-[5px] right-[0px] absolute w-[50xp] h-[30px] bg-white rounded-xl text-center">
                    <h3
                      className="name font-medium text-lg"
                      id="none"
                      key={3}
                    ></h3>
                  </div>
                </div>

                <div className="bg-yellow-200 w-[500px] h-[370px] relative rounded-xl ">
                  <div className="stopWatch" id="none" key={4}></div>
                  <div className="w-full flex justify-center ">
                    <video
                      className="camera rounded-xl"
                      id="none"
                      key={5}
                      width="100%"
                      height="100%"
                      playsInline
                      autoPlay
                    ></video>
                    {key2Camera && findUserByKey(1)?.cameraOnState ? (
                      <></>
                    ) : (
                      <>
                        {key2State && findUserByKey(1)?.state ? (
                          <img
                            className="absolute w-[100%] h-[100%]"
                            src={`/work.png`}
                          ></img>
                        ) : (
                          <img
                            className="absolute w-[100%] h-[100%]"
                            src={`/sleep.png`}
                          ></img>
                        )}
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-[5px] left-[8px]">
                    {key2Mute && findUserByKey(1)?.muteState ? (
                      <GoMute color="white" size="30" />
                    ) : (
                      <GoUnmute color="white" size="30" />
                    )}
                  </div>
                  <div className="bottom-[5px] right-[0px] absolute w-[50xp] h-[30px] bg-white rounded-xl text-center">
                    <h3
                      className="name font-medium text-lg"
                      id="none"
                      key={6}
                    ></h3>
                  </div>
                </div>

                <div className="bg-yellow-200 w-[500px] h-[370px] relative rounded-xl ">
                  <div className="stopWatch" id="none" key={7}></div>
                  <div className="w-full flex justify-center ">
                    <video
                      className="camera rounded-xl"
                      id="none"
                      key={8}
                      width="100%"
                      height="100%"
                      playsInline
                      autoPlay
                    ></video>
                    {key3Camera && findUserByKey(2)?.cameraOnState ? (
                      <></>
                    ) : (
                      <>
                        {key3State && findUserByKey(2)?.state ? (
                          <img
                            className="absolute w-[100%] h-[100%]"
                            src={`/work.png`}
                          ></img>
                        ) : (
                          <img
                            className="absolute w-[100%] h-[100%]"
                            src={`/sleep.png`}
                          ></img>
                        )}
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-[5px] left-[8px]">
                    {key3Mute && findUserByKey(2)?.muteState ? (
                      <GoMute color="white" size="30" />
                    ) : (
                      <GoUnmute color="white" size="30" />
                    )}
                  </div>
                  <div className="bottom-[5px] right-[0px] absolute w-[50xp] h-[30px] bg-white rounded-xl text-center">
                    <h3
                      className="name font-medium text-lg"
                      id="none"
                      key={9}
                    ></h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Chatting */}
            {/* <div className=" lg:items-center lg:w-3/12 bg-purple-400"> */}
            <div className=" my-[5%] mx-[15%] w-[70%] h-[60vh] items-center lg:h-[770px] min-w-[380px] max-w-[500px] lg:my-0 lg:mx-0 lg:items-center lg:w-3/12 bg-white border-amber-400 shadow-2xl shadow-amber-400/50 rounded-xl">
              {/* <div className="my-[5%] mx-[20%] w-[60%] h-full grid items-center lg:w-3/12 bg-purple-400"></div> */}
              <ChatHeader roomName={room.roomName} roomImg={room.roomImg} />
              <div className="relative w-full p-6 overflow-y-auto h-[72%]">
                <ul className="space-y-2">
                  {chat.map((chat) => {
                    console.log(chat, 'chat');
                    let name = chat.split(' : ');

                    let userI = userDatas.find((userData) => {
                      if (userData.name === name[0]) {
                        return true;
                      }
                    });

                    return (
                      <>
                        {name[0] === `${userValue?.name}` ? (
                          // 나
                          <li className="flex justify-end">
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-amber-50 rounded shadow">
                              <span className="block">{name[1]}</span>
                            </div>
                            <img
                              className="rounded-full bg-cover w-10 h-10 ml-2"
                              src={userValue?.profileUrl}
                            />
                          </li>
                        ) : (
                          // 상대
                          <li className="flex justify-start">
                            {/* <div className="grid mr-2"> */}
                            <img
                              className="rounded-full bg-cover w-10 h-10 mr-2"
                              src={userI?.profileUrl}
                              alt=""
                            />
                            {/* <small className="block text-center">
                                {name[0]}
                              </small> */}
                            {/* </div> */}
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-amber-50 rounded shadow">
                              <span className="block">{chat}</span>
                            </div>
                          </li>
                        )}
                      </>
                    );
                  })}
                </ul>
              </div>

              <form>
                <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                  <input
                    id="inputbox"
                    placeholder="message"
                    required
                    type="text"
                    className="block w-full py-2 pl-4 ml-1 mr-2 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  ></input>
                  <button onClick={sendChatHandler} clssName="py-2 p-4">
                    <svg
                      className="w-5 h-5 mr-1 ml-2 text-gray-500 origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="flex justify-between px-3 pt-5 ">
                <div className="flex items-center">
                  <button
                    id="cameraBtn"
                    className="mx-2"
                    onClick={CameraOnOffClick}
                  >
                    {isCameraOn == true ? (
                      <TbDeviceComputerCamera color="white" size="30" />
                    ) : (
                      <TbDeviceComputerCameraOff color="white" size="30" />
                    )}
                  </button>
                  <button id="muteBtn" onClick={MuteBtnClick}>
                    {isMute == true ? (
                      <GoMute color="white" size="30" />
                    ) : (
                      <GoUnmute color="white" size="30" />
                    )}
                  </button>
                </div>

                <button
                  className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  onClick={() => {
                    stopWatchRef.current.handleClick();
                  }}
                >
                  {' '}
                  나가기{' '}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
