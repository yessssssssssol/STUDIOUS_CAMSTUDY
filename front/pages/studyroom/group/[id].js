import StopWatch from '../../../components/studyroom/StopWatch';
import AIFunc from '../../../components/studyroom/AIFunc';
import AlertModal from '../../../components/studyroom/AlertModal';
import Loading from '../../../components/common/Loading';
import { io, Socket } from 'socket.io-client';
import { aiAtom, noUseAiAtom } from '../../../core/atoms/aiState';
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as API from '../../api/api';
import { useRouter } from 'next/router';

import Other from '../other';
import { userAtom } from '../../../core/atoms/userState';
import ChatHeader from '../../../components/studyroom/chat/ChatHeader';
import ChatMainText from '../../../components/studyroom/chat/ChatMainText';
import ChatSendPart from '../../../components/studyroom/chat/ChatSendPart';
import ChatFooter from '../../../components/studyroom/chat/ChatFooter';

const backendPortNumber = process.env.REACT_APP_SERVER_PORT || 5000;

const hostname =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : '';

const url = 'http://' + hostname + ':' + backendPortNumber;
//const url = 'https://' + hostname;

/**
 * @description 방 url에서 roomId를 추출한다.
 * @returns string
 */
const parseRoomId = () => {
  if (typeof window !== 'undefined') {
    const leng = window.location.href.length;
    let href = window.location.href;
    if (href[leng - 1] === '/') {
      href = href.slice(0, leng - 1);
    }
    const roomId = href.substring(href.lastIndexOf('/') + 1);
    return roomId;
  }
  return null;
};

/** @type {MediaStream} */
let myStream;

/** @type {Object} */
let room;

/** @type {RTCPeerConnection} */
let myPeerConnection;

/** @type {RTCDataChannel} */
let myDataChannel;

/** @type {Object} */
let peerConnections = {};

let dataChannels = {};

/** @type {Socket} */
const socket = io(url, {
  withCredentials: true,
  extraHeaders: {
    checkMyService: 'connection',
  },
});

/** @description 전역변수 초기화 */
function rtcInit() {
  myStream = null;
  room = null;
  myPeerConnection = null;
  myDataChannel = null;
  peerConnections = {};
  dataChannels = {};
}

export default function Group() {
  /** @type {String} */
  const roomId = parseRoomId();

  /** @type {List[string]} */
  const [chatAll, setChatAll] = useState([]);

  /** @type {boolean} */
  const [isMute, setIsMute] = useState(false);

  /** @type {boolean} */
  const [isCamera, setIsCamera] = useState(true);

  /** @type {boolean} */
  const [isState, setIsState] = useState(true);

  /** @type {boolean} */
  const [isLoading, setIsLoading] = useState(false);

  /** @type {List[Object]} */
  const [userDatas, setUserDatas] = useState([]);

  const chattingBoxRef = useRef();
  const stopWatchRef = useRef();
  const socketId = useRef();

  /**
   * @type {{userId : Object, ...}}
   * @description 다른 유저의 비디오태그 (element) Map
   */
  const otherCameras = useRef({});

  /** @description 내 비디오 태그(element) */
  const videoRef = useRef({
    srcObject: null,
  });

  const router = useRouter();

  const [user, setUser] = useRecoilState(userAtom);
  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);

  // ================== function =====================

  /**
   * @description useState인 chatAll 배열에 채팅 추가
   * @param {string} message - 상대방에게서 받아온 채팅 문자열
   */
  function addMessage(message) {
    console.log(chatAll);
    setChatAll((chatAll) => [...chatAll, message]);
    console.log(chatAll);
  }

  /**
   * @description 데이터채널로 받은 메시지 파싱.
   * @param {Object} res
   */
  function MessageParse(res) {
    if (res.type === 'message') {
      console.log('message : ', res.data);
      addMessage(res.data);
    } else if (res.type === 'enter') {
      console.log('message : ', res.data);
      addMessage(res.message);
      // 데이터 안에 넣기
      if (otherCameras.current.hasOwnProperty(res.id)) {
        otherCameras.current[res.id].name = res.data.name;
        otherCameras.current[res.id].state = res.data.state;
        otherCameras.current[res.id].camera = res.data.camera;
        otherCameras.current[res.id].mute = res.data.mute;
        otherCameras.current[res.id].time = res.data.time;
      } else {
        otherCameras.current[res.id] = {
          name : res.data.name,
          state: res.data.state,
          camera: res.data.camera,
          mute: res.data.mute,
          time: res.data.time,
        };
      }
    } else if (res.type == 'state') {
      // 데이터 안에 넣기
      console.log('others id : ', res.id);
      console.log('check othersid in list : ', otherCameras);

      console.log(otherCameras.current[res.id]);
      if (otherCameras.current.hasOwnProperty(res.id)) {
        otherCameras.current[res.id].state = res.data;
      }

      otherCameras.current[res.id].current.setState(res.id, res.data);
    } else if (res.type == 'camera') {
      console.log('others id : ', res.id);
      console.log('check othersid in list : ', otherCameras);

      console.log(otherCameras.current[res.id]);
      if (otherCameras.current.hasOwnProperty(res.id)) {
        otherCameras.current[res.id].camera = res.data;
      }

      otherCameras.current[res.id].current.setCamera(res.id, res.data);
    } else if (res.type == 'mute') {
      console.log('others id : ', res.id);
      console.log('check othersid in list : ', otherCameras);

      console.log(otherCameras.current[res.id]);
      if (otherCameras.current.hasOwnProperty(res.id)) {
        otherCameras.current[res.id].mute = res.data;
      }

      otherCameras.current[res.id].current.setMute(res.id, res.data);
    }
  }

  /**
   * @description 채팅창이 넘어가면 자동 스크롤
   */
  const scrollToBottom = () => {
    if (chattingBoxRef.current) {
      const { scrollHeight, clientHeight } = chattingBoxRef.current;
      chattingBoxRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  /**
   * @description 채팅메시지 추가 시 화면이 꽉차면 스크롤을 자동으로 내림
   */
  useEffect(() => {
    scrollToBottom();
  }, [chatAll]);

  /**
   * @description 마이크 비활성화
   * @event button#muteBtn
   */
  function MuteBtnClick(e) {
    e.preventDefault();
    if (myStream !== null) {
      myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));

      let req = {
        type: 'mute',
        id: socketId.current,
      };

      if (isMute == true) {
        setIsMute(false);
        req['data'] = false;
      } else {
        setIsMute(true);
        req['data'] = true;
      }

      if (Object.keys(dataChannels).length > 0) {
        Object.keys(dataChannels).forEach((userId) => {
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId]?.send(JSON.stringify(req));
          }
        });
      }
    }
  }

  /**
   * @description 카메라 on / off
   * @event button#cameraBtn
   */
  function CameraOnOffClick(e) {
    e.preventDefault();
    if (myStream !== null) {
      // myStream
      //   .getVideoTracks()
      //   .forEach((track) => (track.enabled = !track.enabled));

      let req = {
        type: 'camera',
        id: socketId.current,
      };

      if (isCamera == true) {
        setIsCamera(false);
        req['data'] = false;
      } else {
        setIsCamera(true);
        req['data'] = true;
      }

      if (Object.keys(dataChannels).length > 0) {
        Object.keys(dataChannels).forEach((userId) => {
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId]?.send(JSON.stringify(req));
          }
        });
      }
    }
  }

  /**
   * @description AI로부터 사람유무를 체크 후 상대방에게 전달하는 함수
   * @param {boolean} result
   * ? true => 사람 있음
   * ? false => 사람 없음
   */
  function AlertNoHear(result) {
    setIsState(result);

    const req = {
      type: 'state',
      id: socketId.current,
      data: result,
    };

    if (Object.keys(dataChannels).length > 0) {
      Object.keys(dataChannels).forEach((userId) => {
        if (dataChannels[userId].readyState == 'open') {
          dataChannels[userId]?.send(JSON.stringify(req));
        }
      });
    }
  }

  /**
   * @description 채팅 입력시 실행되는 이벤트 함수
   * @param {event} e
   * @event button
   */
  const sendChatHandler = (e) => {
    e.preventDefault();
    const input = document.getElementById('inputbox');
    console.log(dataChannels);
    addMessage(`${user.name} : ${input.value}`);

    Object.keys(dataChannels).forEach((userId) => {
      const req = {
        type: 'message',
        id: socketId.current,
        data: `${user.name} : ${input.value}`,
      };
      if (dataChannels[userId].readyState == 'open') {
        dataChannels[userId]?.send(JSON.stringify(req));
      }
    });
    input.value = '';
  };

  // ================== socket =======================

  /**
   * @description 유저와 유저끼리 연결을 만들어내는 함수
   * @param {string} userId
   * @param {RTCPeerConnection} offer
   * @return {RTCPeerConnection}
   */
  async function makeConnection(userId, offer = null) {
    if (RTCPeerConnection != undefined) {
      myPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
              'stun:stun3.l.google.com:19302',
              'stun:stun4.l.google.com:19302',
              'stun:stun.ekiga.net',
              'stun:stun.ideasip.com',
              'stun:stun.rixtelecom.se',
              'stun:stun.schlund.de',
              'stun:stun.stunprotocol.org:3478',
              'stun:stun.voiparound.com',
              'stun:stun.voipbuster.com',
              'stun:stun.voipstunt.com',
              'stun:stun.voxgratia.org',
            ],
          },
        ],
      });

      // ice 후보를 수집합니다.
      myPeerConnection.addEventListener('icecandidate', (data) => {
        // ice 이벤트 발생 시 이를 방안의 다른 사람들에게 내껄 전달
        console.log(`send my ice : `, data);
        socket.emit('ice', data.candidate, userId, socket.id); // send ice candidate
      });
      myPeerConnection.addEventListener('iceconnectionstatechange', (data) => {
        if (myPeerConnection.iceConnectionState === 'failed') {
          myPeerConnection.restartIce();
        }
      });
      myPeerConnection.addEventListener('track', (data) => {
        console.log(data);
        console.log('get otheruser stream : ', data.streams[0]);
        console.log('get otheruser track : ', data.track);
        console.log('video check : ', data.track.enabled);
        console.log('mute check : ', data.track.muted);
        console.log('userId : ', userId);

        // 이작업이 끝나면 아래 화면 출력
        if (!otherCameras.hasOwnProperty(userId)) {
          console.log('add other camera');
          console.log('userId : ', userId);
          otherCameras.current[userId] = {
            stream: data.streams[0],
          };
          console.log('current otherCamera : ', otherCameras.current);
        } else {
          otherCameras.current[userId].stream = data.streams[0];
        }
      });

      // 나한테 webcam이 있으면 피어컨넥션에 추가한다.
      if (myStream !== null) {
        myStream
          .getTracks()
          .forEach((track) => myPeerConnection.addTrack(track, myStream));
      }

      // 내 피어컨넥션을 추가
      peerConnections[userId] = myPeerConnection;

      let _offer = offer;
      let answer;

      if (!_offer) {
        myDataChannel = myPeerConnection.createDataChannel('chat');

        myDataChannel.addEventListener('open', (event) => {
          const req = {
            type: 'enter',
            id: socket.id,
            message: `${user?.name}님이 입장하셨습니다.`,
            data: {
              name : user?.name,
              state: isState,
              camera: isCamera,
              mute: isMute,
              time: stopWatchRef.current.getTime(), // 시간 가져옴
            },
          };
          myDataChannel.send(JSON.stringify(req));
        });

        myDataChannel.addEventListener('message', (event) => {
          const res = JSON.parse(event.data);
          MessageParse(res);
        });

        _offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(_offer);
        // 자신의 로컬 목적지에 offer 설정

        dataChannels[userId] = myDataChannel;
        console.log('add DataChannels');
        console.log(dataChannels);
      } else {
        myPeerConnection.addEventListener('datachannel', (event) => {
          myDataChannel = event.channel;
          myDataChannel.addEventListener('open', (event) => {
            const req = {
              type: 'enter',
              id: socket.id,
              message: `${user?.name}님이 입장하셨습니다.`,
              data: {
                name : user?.name,
                state: isState,
                camera: isCamera,
                mute: isMute,
                time: stopWatchRef.current.getTime(), // 시간 가져옴
              },
            };

            myDataChannel.send(JSON.stringify(req));
          });

          myDataChannel.addEventListener('message', (event) => {
            const res = JSON.parse(event.data);
            MessageParse(res);
          });

          dataChannels[userId] = myDataChannel;
          console.log('add DataChannels');
          console.log(dataChannels);
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

  /**
   * @description 그룹 룸 데이터
   */
  async function roomData() {
    const res = await API.get(`studyroom/${roomId}`);
    room = res.data;
  }

  /**
   * @description 그룹 룸에 들어오면 처음 시작될 함수
   */
  function init() {
    // const res = await API.get(`studyroom/${roomId}`);
    // room = res.data;

    console.log('my first socket : ', socket.id);
    socketId.current = socket.id;
    console.log('input socketID : ', socketId.current);

    console.log(myStream);
    console.log(videoRef.current.className);
    videoRef.current.srcObject = myStream;
    console.log('enter room');
    socket.emit(
      'enter_room',
      roomId,
      socket.id,
      user?.id,
      user?.name,
      () => {}
    );
  }

  /**
   * @description 로딩 완료 시 방에 입장
   */
  useEffect(() => {
    {
      roomData();
    }
    if (isLoading) {
      if (myStream !== null) {
        init();
      } else {
        rtcInit();
        location.reload();
        router.back();
      }
    }
  }, [isLoading]);

  /**
   * @description 소켓 이벤트 정의
   */
  useEffect(() => {
    socket.on('welcome', async (userId, userName, newUserId) => {
      console.log('enter user : ', userName);
      console.log('other userId : ', userId);
      console.log('other userSocketId : ', newUserId);
      const offer = await makeConnection(newUserId);
      console.log('--------------------------------------');
      console.log('make - peerconnections', peerConnections);
      console.log(`${userName} send offer`, userId);

      socket.emit('offer', offer, newUserId, socket.id);
    });

    socket.on('refuse', (errorMessage) => {
      console.log(errorMessage);
      rtcInit();
      location.reload();
      router.back();
    });

    socket.on('bye', (leaveId, name) => {
      addMessage(`${name}님이 퇴장하셨습니다.!`);
      console.log('leaveId : ', leaveId);

      Object.keys(dataChannels).forEach((v) => {
        if (v === leaveId) {
          console.log('delete dataChannel : ', v);
          delete dataChannels[v];
        }
      });

      Object.keys(peerConnections).forEach((v) => {
        if (v === leaveId) {
          console.log('delete peerConnection : ', v);
          delete peerConnections[v];
        }
      });

      Object.keys(otherCameras.current).forEach((v) => {
        if (v === leaveId) {
          delete otherCameras.current[v];
          console.log('delete otherCamera', otherCameras.current);
        }
      });

      console.log(otherCameras);
      console.log(dataChannels);
      console.log(peerConnections);
    });

    socket.on('offer', async (offer, offersId) => {
      /**
       * @description
       * peerB에 offer이 도착하는 순간 아직 myPeerConnection이 존재하지 않음.
       * 데이터 체널에 대한 이벤트 추가
       * 서버에서 받은 초대장 설정하기.
       */
      const answer = await makeConnection(offersId, offer);
      socket.emit('answer', answer, socket.id, offersId);
    });

    socket.on('answer', async (answer, newUserId) => {
      /**
       * @description 방에 있던 사람들은 뉴비를 위해 생성한 커섹션에 answer를 추가한다.
       */
      peerConnections[newUserId].setRemoteDescription(answer);
    });

    socket.on('ice', (ice, othersId) => {
      /**
       * @description 다른 사람에게 온 othersId를 myPeerConnection에 등록
       */
      peerConnections[othersId].addIceCandidate(ice);
      console.log('add IceCandidate');
      console.log('ice owner : ', othersId);
      console.log(peerConnections);
    });

    /**
     * @description unmount시 소켓 초기화
     */
    return async () => {
      await API.put(`headcount`, {
        roomId,
        attend: false,
      });

      socket.off('welcome');
      socket.off('refuse');
      socket.off('bye');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice');
      location.reload();
      rtcInit();
    };
  }, []);

  /**
   * @description 방에 입장한 유저데이터 수집
   */
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

  return (
    <>
      {isLoading ? (
        <div className="w-full lg:grid lg:justify-center">
          <p className="font-bold text-center text-4xl m-5 mb-10">
            {room?.roomName}
          </p>
          <div className="grid justify-between lg:flex lg:mx-[2rem] lg:max-w-[1600px]  ">
            <div className="flex lg:w-9/12">
              <div className="h-full w-full flex flex-raw flex-wrap lg:flex justify-center gap-x-[1rem] gap-y-[2.5rem]">
                <div className="bg-yellow-50/30 w-[500px] h-[370px] relative rounded-xl border-amber-100 border-2 shadow-2xl shadow-amber-400/10 ">
                  <StopWatch
                    myTimer={true}
                    roomId={roomId}
                    membersOnly={room?.membersOnly}
                    ref={stopWatchRef}
                    userT={0}
                  />
                  {/* 내 웹캠 */}
                  <div className="w-full flex justify-center item-center rounded-xl border-2 border-amber-400 shadow-2xl shadow-amber-400/50">
                    <video
                      className="rounded-xl object-cover"
                      autoPlay
                      playsInline
                      muted
                      ref={videoRef}
                      width="100%"
                      height="100%"
                    ></video>
                  </div>
                  <AIFunc
                    cb={(result) => {
                      AlertNoHear(result);
                    }}
                    camera={videoRef}
                    isGroup={true}
                  />
                </div>
                <AlertModal />

                {/* 다른 사람들 웹캠 */}
                {Object.keys(otherCameras.current).map((user) => {
                  console.log('userId : ', user);
                  console.log(
                    'usercamera : ',
                    otherCameras.current[user].stream
                  );
                  console.log(otherCameras.current[user].mute);
                  return (
                    <>
                      <Other
                        time={otherCameras.current[user].time}
                        userId={user}
                        stream={otherCameras.current[user].stream}
                        ref={otherCameras.current[user]}
                        name={otherCameras.current[user].name}
                      ></Other>
                    </>
                  );
                })}
              </div>
            </div>

            {/* Chat */}
            <div className=" my-[5%] mx-[15%] w-[70%] h-[60vh] items-center lg:h-[770px] min-w-[380px] max-w-[500px] lg:my-0 lg:ml-[2rem] lg:mr-0 lg:items-center lg:w-3/12 bg-white border-amber-100 border-2 shadow-2xl shadow-amber-400/10 rounded-xl">
              <ChatHeader roomName={room?.roomName} roomImg={room?.roomImg} />
              <ChatMainText
                chattingBoxRef={chattingBoxRef}
                chatAll={chatAll}
                userDatas={userDatas}
                user={user}
              />
              <ChatSendPart sendChatHandler={sendChatHandler} />
              <ChatFooter
                isCamera={isCamera}
                isMute={isMute}
                CameraOnOffClick={CameraOnOffClick}
                MuteBtnClick={MuteBtnClick}
                stopWatchRef={stopWatchRef}
                rtcInit={rtcInit}
                router={router}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading
          cb={(stream) => {
            myStream = stream;
            console.log(myStream);
            setIsLoading(true);
          }}
        />
      )}
    </>
  );
}
