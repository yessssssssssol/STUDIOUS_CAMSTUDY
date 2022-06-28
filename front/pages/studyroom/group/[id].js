import StopWatch from '../../../components/studyroom/StopWatch';
import AIFunc from '../../../components/studyroom/AIFunc';
import AlertModal from '../../../components/studyroom/AlertModal';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as API from '../../api/api';
import { useRouter } from 'next/router';

import { userAtom } from '../../../core/atoms/userState';

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

export default function Group() {
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);

  let roomId;

  if (typeof window !== 'undefined') {
    const leng = window.location.href.length;
    let href = window.location.href;
    if (href[leng-1] === '/') {
      href = href.slice(0, leng-2);
    }
    roomId = href.substring(href.lastIndexOf('/') + 1);
  }

  const socket = io(url, {
    withCredentials: true,
    extraHeaders: {
      "checkMyService": user?.id
    }
  });

  function addMessage(message) {
    setChat([...chatAll, message]);
    chatAll.push(message);
  }
  
  async function initCall(data) {
    await getMedia();
    console.log(myStream);
    socket.emit("enter_room", data?.roomId, socket.id, user?.id, user?.name, () => {
      setIsLoading(true);
    });
  }
  
  async function getMedia(deviceId) {
    const initialConstraints = {
        audio : true, 
        video : {facingMode: "user"}
    }
    const cameraConstraints = {
        audio : true, 
        video : {deviceId: {exact : deviceId}},
    }
    try {
        if (navigator.mediaDevices) {
          setIsCamera(true);
          myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstraints
          )
          if (!deviceId) {
              await selectCamera();
          }
        }
        else {
          setIsCamera(false);
        }
        
    } catch (e) {
        console.log(e);
    }
  }

  function handleIce(data, othersId) {
    // ice 이벤트 발생 시 이를 방안의 다른 사람들에게 내껄 전달
    socket.emit("ice", data.candidate, othersId, socket.id); // send ice candidate
  }
  
  function handleAddStream(data, othersId) {
    console.log("got an stream from my pear");
    console.log("Peer's Stream", data.stream);
    console.log("my Stream", myStream);
    // 비디오 태그 추가한 뒤에 띄우기
    const others = document.getElementById("others");
    const video = document.createElement("video");
    const name = document.createElement("h3");
    
    others.appendChild(video);
    others.appendChild(name);

    video.id = othersId;
    video.key = othersId;
    video.autoplay = true;
    video.playsInline = true;
    video.width = 400;
    video.height = 400;
    video.srcObject = data.stream;

    name.innerText = othersId;
    name.id = othersId;
    name.key = othersId;
  }

  function MuteBtnClick () {
    const muteBtn = document.getElementById("muteBtn");
    if (myStream !== null) {
      console.log(myStream.getAudioTracks());
      myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      if (isMute == true) {
          muteBtn.innerText = "Unmute";
          setMute(false);
      }
      else {
          muteBtn.innerText = "Mute";
          setMute(true);
      }
    }
  }

  function CameraOnOffClick () {
    const cameraBtn = document.getElementById("cameraBtn");
    if (myStream !== null) {
      myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      console.log(myStream.getVideoTracks());
      if (isCameraOn == true) {
          cameraBtn.innerText = "turnOff";
          setCameraOn(false);
      }
      else {
          cameraBtn.innerText = "turnOn";
          setCameraOn(true);
      }
    }
  }

  async function makeConnection(userId, offer=null) {
    if (RTCPeerConnection != undefined) {
        myPeerConnection = new RTCPeerConnection({
          iceServers: [
              {
                  urls: [
                      "stun:stun.l.google.com:19302",
                      "stun:stun1.l.google.com:19302",
                      // "stun:stun2.l.google.com:19302",
                      // "stun:stun3.l.google.com:19302",
                      // "stun:stun4.l.google.com:19302",
                      // "stun:stun.ekiga.net",
                      // "stun:stun.ideasip.com",
                      // "stun:stun.rixtelecom.se",
                      // "stun:stun.schlund.de",
                      // "stun:stun.stunprotocol.org:3478",
                      // "stun:stun.voiparound.com",
                      // "stun:stun.voipbuster.com",
                      // "stun:stun.voipstunt.com",
                      // "stun:stun.voxgratia.org"
                  ]
              }
          ]
      });    
    
      peerConnections[userId] = myPeerConnection
    
      // 연결 후 처리 이벤트 등록
      myPeerConnection.addEventListener("icecandidate", (data) => handleIce(data, userId));
      myPeerConnection.addEventListener("addstream", (data) => handleAddStream(data, userId));
      if (myStream != null) {
        myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
      }
    
      let _offer = offer;
      let answer;
    
      if(!_offer) {
          myDataChannel = myPeerConnection.createDataChannel("chat");
          myDataChannel.addEventListener("open", (event) => {
            myDataChannel.send(`${user?.name}님 입장하셨습니다!`);
          })
          myDataChannel.addEventListener("message", (event) => {
            addMessage(event.data);
          });
          console.log("made data channel");
          console.log(myDataChannel);
    
          _offer = await myPeerConnection.createOffer();
          myPeerConnection.setLocalDescription(_offer); 
          // 자신의 로컬 목적지에 offer 설정
    
          dataChannels[userId] = myDataChannel
      }
      else {
    
          myPeerConnection.addEventListener("datachannel", (event) => {
            myDataChannel = event.channel;
            myDataChannel.addEventListener("open", (event) => {
                myDataChannel.send(`${user?.name}님 입장하셨습니다!`);
            })
            myDataChannel.addEventListener("message", (event) => {
              addMessage(event.data);
            });
  
            dataChannels[userId] = myDataChannel
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

  socket.on("welcome", async(newUserId) => {
    const offer = await makeConnection(newUserId);
    socket.emit("offer", offer, newUserId, socket.id); // 초대장 서버로 보내기
    console.log("send the offer");
  })

  socket.on("refuse", (errorMessage) => {
    console.log(errorMessage);
    // 들어가지 못한다는 에러페이지 출력
    rtcInit();
    router.push('/openroom');
  })

  socket.on("bye", (leaveId, userName) => {
    // 나갔다는 메시지
    addMessage(`${userName}님이 퇴장하셨습니다.!`);

    const video = document.getElementById(leaveId);
    const name = document.getElementById(leaveId);
    // 비디오 태그 삭제
    if (video != null && name != null) {
      video.remove();
      name.remove();
    }
    
    // peerConnections 제거
    Object.keys(peerConnections).forEach((id, i) => {
      if(id == leaveId) {
        delete peerConnections[id];
      }
    })
  })

  // 이건 방에 접속한 사람이 실행된다. (Peer B)
  socket.on("offer", async (offer, offersId) => {
    console.log("receive the offer");
    console.log(offer);
    
    const answer = await makeConnection(offersId, offer);
    //todo: 메시지 전달
    // 데이터 체널에 대한 이벤트 추가
    // 서버에서 받은 초대장 설정하기.
    // peerB에 offer이 도착하는 순간 아직 myPeerConnection이 존재하지 않음.

    socket.emit("answer", answer, socket.id, offersId);
  })

  socket.on("answer", async(answer, newUserId) => {
    console.log("receive the answer", newUserId);
    // 방에 있던 사람들은 뉴비를 위해 생성한 커섹션에 answer를 추가한다.
    peerConnections[newUserId].setRemoteDescription(answer);
  })

  socket.on("ice", (ice, othersId) => {
    // 다른 사람에게 온 othersId를 myPeerConnection에 등록
    peerConnections[othersId].addIceCandidate(ice); // recv icecandidate
  })

  const sendChatHandler = (e) => {
    e.preventDefault();
    const input = document.getElementById("inputbox");
    addMessage(`${user.name} : ${input.value}`);
    Object.keys(dataChannels).forEach((userId) => {
      console.log(dataChannels[userId]);
      dataChannels[userId].send(`${user.name} : ${input.value}`);
    })
    input.value = '';
  }

  useEffect(() => {
    async function getRoomData() {
      rtcInit();
      const res = await API.get(`studyroom/${roomId}`);
      const data = res.data;
      setRoom(data);

      if (myStream == null) {
        await initCall(data);
      }
    }
    getRoomData();
  }, []);
  
  return (
    <div>
      { isLoading === true ? 
        <div>
          <p>{room?.roomName}</p>
          <div className="w-full items-center lg:flex">
            <div className="w-full lg:w-1/2">
              { isCamera ? 
                <div>
                  <StopWatch />
                  <p>메인 카메라(인공지능 적용된 것)</p>
                    <AIFunc />
                    <AlertModal />
                    <button id='muteBtn' onClick={MuteBtnClick}>Unmute</button>
                    <br/>
                    <button id='cameraBtn' onClick={CameraOnOffClick}>turnOn</button>
                </div> : <p>카메라가 없습니다.</p>
              }
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <p>일반 카메라</p>
              <div id='others'>  
              </div>
            </div>
          </div>
          <div>채팅</div>
          <form>
            <input 
              id="inputbox"
              placeholder='message' 
              required type='text'
            ></input>
            <button onClick={sendChatHandler}>Send</button>
          </form>
          
          {chat.map((i) => {
            return <div>{i}</div>
          })}
        </div> : <p>로딩중</p> 
      }
    </div>
  );
}
