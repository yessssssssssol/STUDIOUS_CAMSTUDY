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
  createRef,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as API from '../../api/api';
import { useRouter } from 'next/router';
import { GoUnmute, GoMute } from 'react-icons/go';
import {
  TbDeviceComputerCamera,
  TbDeviceComputerCameraOff,
} from 'react-icons/tb';
import Other from "../other"
import * as ReactDOM from 'react-dom/client';
import { userAtom } from '../../../core/atoms/userState';
import ChatHeader from '../../../components/studyroom/chat/ChatHeader';

const backendPortNumber = process.env.REACT_APP_SERVER_PORT || 5000;

const hostname =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname : '';

const url = 'http://' + hostname + ':' + backendPortNumber;

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
}

const getMedia = async (deviceId) => {
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
      const myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints
      );
      // if (!deviceId) {
      //     await selectCamera();
      // }
      console.log(myStream);
      return myStream;
    } 

  } catch (e) {
    console.log(e);
    return null;
  }
};

async function selectCamera(myStream) {
  try {

      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === "videoinput");
      let currentCamera;

      // 현재 카메라
      
      if (myStream) {
          currentCamera = myStream.getVideoTracks()[0]; 
      }
      // 카메라 선택창 추가
      // cameras.forEach((camera) => {
      //     const option = document.createElement("option")
      //     option.value = camera.deviceId;
      //     option.innerText = camera.label;
      //     if (currentCamera.label === camera.label) {
      //         option.selected = true;
      //     }
      //     camearasSelect.appendChild(option);
      // })

      return currentCamera;

  } catch(e) {
      console.log(e);
  }
}

let myStream;
let room;
let myPeerConnection;
let myDataChannel;
let peerConnections = {};
let dataChannels = {};

const socket = io(url, {
  withCredentials: true,
  extraHeaders: {
    checkMyService: "asdasd",
  },
});

function rtcInit() {
  myStream = null;
  room = null;
  myPeerConnection = null;
  myDataChannel = null;
  peerConnections = {};
  dataChannels = {};
}

export default function Group () {

    const roomId = parseRoomId();
    const [chatAll, setChatAll] = useState([]);
    const [isMute, setIsMute] = useState(false);
    const [isCamera, setIsCamera] = useState(true);
    const [isState, setIsState] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [userDatas, setUserDatas] = useState([]);

    const chattingBoxRef = useRef();
    const stopWatchRef = useRef();
    const socketId = useRef();
    const otherCameras = useRef({});

    const router = useRouter();

    const [user, setUser] = useRecoilState(userAtom);
    const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);

    // ================== function =====================

    function addMessage(message) {
        console.log(chatAll);
        setChatAll(chatAll => [...chatAll, message]);
        console.log(chatAll);
    }
    // 버튼 갱신.

    function MessageParse(res) {
      if (res.type === 'message') {
        console.log("message : ", res.data);
        addMessage(res.data);

      } else if (res.type === 'enter') {
        console.log("message : ", res.data);
        addMessage(res.message);
        // 데이터 안에 넣기
        if (otherCameras.current.hasOwnProperty(res.id)) {
          otherCameras.current[res.id].state = res.data.state;
          otherCameras.current[res.id].camera = res.data.camera;
          otherCameras.current[res.id].mute = res.data.mute;
          otherCameras.current[res.id].time = res.data.time;
        }
        else {
          otherCameras.current[res.id] = {
            state : res.data.state,
            camera : res.data.camera,
            mute : res.data.mute,
            time : res.data.time,
          }
        }

      } else if (res.type == 'state') {

        // 데이터 안에 넣기
        console.log("others id : ", res.id);
        console.log("check othersid in list : ", otherCameras);

        console.log(otherCameras.current[res.id]);
        if (otherCameras.current.hasOwnProperty(res.id)) {
          otherCameras.current[res.id].state = res.data;
        }

        otherCameras.current[res.id].current.setState(res.id, res.data);



      } else if (res.type == 'camera') {

        console.log("others id : ", res.id);
        console.log("check othersid in list : ", otherCameras);

        console.log(otherCameras.current[res.id]);
        if (otherCameras.current.hasOwnProperty(res.id)) {
          otherCameras.current[res.id].camera = res.data;
        }

        otherCameras.current[res.id].current.setCamera(res.id, res.data);

      }else if (res.type == 'mute') {

        console.log("others id : ", res.id);
        console.log("check othersid in list : ", otherCameras);

        console.log(otherCameras.current[res.id]);
        if (otherCameras.current.hasOwnProperty(res.id)) {
          otherCameras.current[res.id].mute = res.data;
        }

        otherCameras.current[res.id].current.setMute(res.id, res.data);

      }
    }

    
    const scrollToBottom = () => {
      if (chattingBoxRef.current) {
        const { scrollHeight, clientHeight } = chattingBoxRef.current;
        chattingBoxRef.current.scrollTop = scrollHeight - clientHeight;
      }
    };

    function MuteBtnClick() {
        if (myStream !== null) {
          myStream
            .getAudioTracks()
            .forEach((track) => (track.enabled = !track.enabled));


          let req = {
            type: "mute",
            id: socketId.current,
          };

          if (isMute == true) {
            setIsMute(false);
            req["data"] = false;
          } else {
            setIsMute(true);
            req["data"] = true;
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

    function CameraOnOffClick() {
      if (myStream !== null) {
        myStream
          .getVideoTracks()
          .forEach((track) => (track.enabled = !track.enabled));

        let req = {
          type: "camera",
          id: socketId.current,
        }

        if (isCamera == true) {
          setIsCamera(false);
          req["data"] = false;
        }
        else {
          setIsCamera(true);
          req["data"] = true;
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
    
    function AlertNoHear(result) {
        // 만약 현재 나의 스테이트값이
        setIsState(result);

        const req = {
          type: "state",
          id: socketId.current,
          data: result
        }
    
        if (Object.keys(dataChannels).length > 0) {
          Object.keys(dataChannels).forEach((userId) => {
            if (dataChannels[userId].readyState == 'open') {
              dataChannels[userId]?.send(JSON.stringify(req));
            }
          });
        }
    }

    const sendChatHandler = (e) => {
        e.preventDefault();
        const input = document.getElementById('inputbox');
        console.log(dataChannels);
        addMessage(`${user.name} : ${input.value}`);

        Object.keys(dataChannels).forEach((userId) => {
          const req = {
            type : "message",
            id: socketId.current,
            data : `${user.name} : ${input.value}`
          };
          if (dataChannels[userId].readyState == 'open') {
            dataChannels[userId]?.send(JSON.stringify(req));
          }
        });
        input.value = '';
    };

    function handleIce(data, othersId) {
        // ice 이벤트 발생 시 이를 방안의 다른 사람들에게 내껄 전달
        console.log(`send my ice : `, data);
        socket.emit('ice', data.candidate, othersId, socket.id); // send ice candidate

    }

    // ================== socket =======================

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
          myPeerConnection.addEventListener('icecandidate', (data) =>
            handleIce(data, userId)
          );
          myPeerConnection.addEventListener('iceconnectionstatechange', (data) => {
            if (myPeerConnection.iceConnectionState === "failed") {
              myPeerConnection.restartIce();
            }
          })
          myPeerConnection.addEventListener('track', (data) => {
            console.log(data);
            console.log('get otheruser stream : ', data.streams[0]);
            console.log('get otheruser track : ', data.track);
            console.log('video check : ', data.track.enabled);
            console.log('mute check : ', data.track.muted);
            console.log("userId : ", userId);
            
            // 이작업이 끝나면 아래 화면 출력
            if (!dataChannels.hasOwnProperty(userId)) {
              console.log("add other camera");
              console.log("userId : ", userId);
              otherCameras.current[userId] = {
                stream : data.streams[0],
              }
              console.log("current otherCamera : ", otherCameras.current);

            }
            else {
              otherCameras.current[userId].stream = data.streams[0]
            }
            
          })

          // 나한테 webcam이 있으면 피어컨넥션에 추가한다.
          if (myStream != null) {
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
                type: "enter",
                id: socket.id,
                message: `${user?.name}님이 입장하셨습니다.`,
                data : {
                  state : isState,
                  camera : isCamera,
                  mute : isMute,
                  time: stopWatchRef.current.getTime() // 시간 가져옴
                }
              }
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
            console.log("add DataChannels")
            console.log(dataChannels);
          } else {
            myPeerConnection.addEventListener('datachannel', (event) => {

              myDataChannel = event.channel;
              myDataChannel.addEventListener('open', (event) => {

                const req = {
                  type: "enter",
                  id: socket.id,
                  message: `${user?.name}님이 입장하셨습니다.`,
                  data : {
                    state : isState,
                    camera : isCamera,
                    mute : isMute,
                    time: stopWatchRef.current.getTime() // 시간 가져옴
                  } 
                }

                myDataChannel.send(JSON.stringify(req));
              });

              myDataChannel.addEventListener('message', (event) => {
                const res = JSON.parse(event.data);
                MessageParse(res);
              });

              dataChannels[userId] = myDataChannel;
              console.log("add DataChannels")
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

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    async function init() {

      myStream = await getMedia();

      if (myStream !== null) {
        console.log("find Camera");
      }
      // if (myStream == null) {
      //   location.reload();
      //   rtcInit();
      //   router.back();
      // }

      const res = await API.get(`studyroom/${roomId}`);
      room = res.data;

      console.log("my first socket : ", socket.id);
      socketId.current = socket.id;
      console.log("input socketID : ", socketId.current);
      socket.emit('enter_room', roomId, socket.id, user?.id, user?.name, () => { setIsLoading(true); });
    }

    useEffect(() => {
        
        init();
        
        socket.on('welcome', async (userId, userName, newUserId) => {
          console.log("enter user : ", userName);
          console.log("other userId : ", userId);
          console.log("other userSocketId : ", newUserId);
          const offer = await makeConnection(newUserId);
          console.log("--------------------------------------");
          console.log("make - peerconnections", peerConnections);
          console.log(`${userName} send offer`, userId);
  
          socket.emit('offer', offer, newUserId, socket.id); // 초대장 서버로 보내기
        });
    
        socket.on('refuse', (errorMessage) => {
            console.log(errorMessage);
            // 들어가지 못한다는 에러페이지 출력
            rtcInit();
            location.reload();
            router.back();
        });
    
        socket.on('bye', (leaveId, name) => {
            // 나갔다는 메시지
            addMessage(`${name}님이 퇴장하셨습니다.!`);
            console.log("leaveId : ", leaveId);
    
            Object.keys(dataChannels).forEach((v) => {
              if (v === leaveId) {
                console.log("delete dataChannel : ", v);
                delete dataChannels[v];
              }
            });
    
            Object.keys(peerConnections).forEach((v) => {
              if (v === leaveId) {
                console.log("delete peerConnection : ", v);
                delete peerConnections[v];
              }
            });
    
            Object.keys(otherCameras.current).forEach((v) => {
              if(v === leaveId) {
                
                // const temp = otherCameras.current;
                // delete temp[v];
                // otherCameras.current = temp;
                delete otherCameras.current[v];
                console.log("delete otherCamera", otherCameras.current);
              }
            })
    
            console.log(otherCameras);
            console.log(dataChannels);
            console.log(peerConnections);
        });
    
        socket.on('offer', async (offer, offersId) => {
            // 데이터 체널에 대한 이벤트 추가
            // 서버에서 받은 초대장 설정하기.
            // peerB에 offer이 도착하는 순간 아직 myPeerConnection이 존재하지 않음.
            const answer = await makeConnection(offersId, offer);
            socket.emit('answer', answer, socket.id, offersId);
        });
        
        socket.on('answer', async (answer, newUserId) => {
            // 방에 있던 사람들은 뉴비를 위해 생성한 커섹션에 answer를 추가한다.
            peerConnections[newUserId].setRemoteDescription(answer);
        });
        
        socket.on('ice', (ice, othersId) => {
            // 다른 사람에게 온 othersId를 myPeerConnection에 등록
            peerConnections[othersId].addIceCandidate(ice); // recv icecandidate
            console.log("add IceCandidate");
            console.log("ice owner : ", othersId);
            console.log(peerConnections)
        });
  
        return () => {
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
        <div className="lg:grid lg:justify-center">
          <p className="font-bold text-center text-4xl m-5 mb-10">
            {room?.roomName}
          </p>
          <StopWatch
            myTimer={true}
            roomId={roomId}
            membersOnly={room?.membersOnly}
            ref={stopWatchRef}
            userT={0}
          />
          <AIFunc
            cb={(result) => {
              AlertNoHear(result);
            }}
          />
          <AlertModal />
          {
            Object.keys(otherCameras.current).map((user) => {
              console.log("userId : ", user);
              console.log("usercamera : ", otherCameras.current[user].stream);
              console.log(otherCameras.current[user].mute);
              return(
                <>
                  <Other time={otherCameras.current[user].time} userId={user} stream={otherCameras.current[user].stream} ref={otherCameras.current[user]}></Other>
                </>
            )})
          }
          
          <div className=" my-[5%] mx-[15%] w-[70%] h-[60vh] items-center lg:h-[770px] min-w-[380px] max-w-[500px] lg:my-0 lg:mx-0 lg:items-center lg:w-3/12 bg-white border-amber-100 border-2 shadow-2xl shadow-amber-400/10 rounded-xl">
              {/* <div className="my-[5%] mx-[20%] w-[60%] h-full grid items-center lg:w-3/12 bg-purple-400"></div> */}
              <ChatHeader roomName={room?.roomName} roomImg={room?.roomImg} />
              <div
                  ref={chattingBoxRef}
                  className="relative w-full p-6 overflow-y-auto h-[72%]"
                  >
                  <ul className="space-y-2">
                      {chatAll?.map((chat) => {
                      
                      let name = chat.split(' : ');

                      let userI = userDatas.find((userData) => {
                        if (userData.name === name[0]) {
                          return true;
                        }
                      });
  
                      return (
                        <>
                          {name[0] === `${user?.name}` ? (
                            // 나
                            <li className="flex justify-end">
                              <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-amber-50 rounded shadow">
                                <span className="block">{name[1]}</span>
                              </div>
                              <img
                                className="rounded-full bg-cover w-10 h-10 ml-2"
                                src={user?.profileUrl}
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
          <div className="flex justify-between px-3">
            <div className="flex items-center">
              <button
                id="cameraBtn"
                className="mx-2"
                onClick={CameraOnOffClick}
              >
                {isCamera == true ? (
                  <TbDeviceComputerCamera
                    color="#ea580c"
                    size="30"
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  <TbDeviceComputerCameraOff
                    color="#ea580c"
                    size="30"
                    style={{ marginBottom: 10 }}
                  />
                )}
              </button>
              <button id="muteBtn" onClick={MuteBtnClick}>
                {isMute == true ? (
                  <GoMute
                    color="#ea580c"
                    size="30"
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  <GoUnmute
                    color="#ea580c"
                    size="30"
                    style={{ marginBottom: 10 }}
                  />
                )}
              </button>
            </div>

            <button
              className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              onClick={() => {
                rtcInit();
                stopWatchRef.current.handleClick();
              }}
            >
              {' '}
              나가기{' '}
            </button>
          </div>
        </div>
    )
}
  