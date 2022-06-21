const socket = io();

let roomName;
let muted = false;
let cameraOff = false;
let myStream;
let myPeerConnection;
let myDataChannel;
let peerConnections = {};
let dataChannels = {};

let nickName;

// 방 입장하기 전
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const roomNameInput = form.querySelector("input");

// 방 입장 후
const room = document.getElementById("room");
const myFace = document.getElementById("myFace");
myFace.volume = 0;
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camearasSelect = document.getElementById("cameras");

const chatWindow = room.querySelector("#room ul")
const chatInput = room.querySelector("#msg input");
const sendMsgForm = room.querySelector("#msg");

const roomTitle = room.querySelector("h3");

const others = document.getElementById("otherStream");

room.hidden = true;

// UI 버튼 핸들러
muteBtn.addEventListener("click", MuteBtnClick);
cameraBtn.addEventListener("click", CameraOnOffClick);
camearasSelect.addEventListener("click", CameraSelectClick);

sendMsgForm.addEventListener("submit", MessageSubmit);
form.addEventListener("submit", RoomEnterSubmit);

function MuteBtnClick () {
    myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    console.log(myStream.getAudioTracks());
    if (!muted) {
        muteBtn.innerText = "Unmute";
        muted = true;
    }
    else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}

function CameraOnOffClick () {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));

    if (cameraOff) {
        cameraBtn.innerText = "turnOff";
        cameraOff = false;
    }
    else {
        cameraBtn.innerText = "turnOn";
        cameraOff = true;
    }
}

async function CameraSelectClick() {
    await getMedia(camearasSelect.value);
    if (myPeerConnection) {
        const videoTrack = myStream.getVideoTracks()[0];
        const videoSender = myPeerConnection.getSenders().find((sender) => {
            sender.track.kind === "video"
        });
        videoSender.replaceTrack(videoTrack); 
        // sender => 다른 브라우저로 보내진 비디오, 오디오 데이터를 컨트롤 하는 방법이다.
        // 만약 카메라가 바꼈을 경우 다른 브라우저에 있는 스트림 정보를 수정해줘야 함.
        // 이럴 때 사용하는 게 sender
    }
}



// 방입장 후 초기 설정------------------------------------
// 카메라 리스트 셀렉터 태그에 추가.

// offer가 있으면 answer 이벤트에서 사용
// offer가 없으면 offer 이벤트에서 사용
async function makeConnection(userId, offer=null) {
    myPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
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
                ]
            }
        ]
    });    

    peerConnections[userId] = myPeerConnection

    // 연결 후 처리 이벤트 등록
    myPeerConnection.addEventListener("icecandidate", (data) => handleIce(data, userId));
    myPeerConnection.addEventListener("addstream", (data) => handleAddStream(data, userId));
    console.log(myStream.getTracks());
    myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));

    let _offer = offer;
    let answer;

    if(!_offer) {
        myDataChannel = myPeerConnection.createDataChannel("chat");
        myDataChannel.addEventListener("open", (event) => {
            myDataChannel.send(`${nickName}님 입장하셨습니다!`);
        })
        myDataChannel.addEventListener("message", (event) => {
            addMessage(`${event.data}`);
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
                myDataChannel.send(`${nickName}님 입장하셨습니다!`);
            })
            myDataChannel.addEventListener("message", (event) => {
                addMessage(`${event.data}`);
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

// 내 카메라, 오디오의 Stream 데이터 가져오기
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
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstraints
        )
        myFace.srcObject = myStream;
        if (!deviceId) {
            await selectCamera();
        }
    } catch (e) {
        console.log(e);
    }
}

async function selectCamera() {
    try {

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        let currentCamera;

        if (myStream) {
            currentCamera = myStream.getVideoTracks()[0]; // 현재 카메라
        }

        cameras.forEach((camera) => {
            const option = document.createElement("option")
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if (currentCamera.label === camera.label) {
                option.selected = true;
            }
            camearasSelect.appendChild(option);
        })

    } catch(e) {
        console.log(e);
    }
}

function setUserName() {
    // 랜덤 닉네임 설정
    nickName = randName();
}

function EnterRoom() {
    welcome.hidden = true;
    room.hidden = false;
    roomTitle.innerText = `Room ${roomName} (${Object.keys(peerConnections).length})`;
}

// 방 입장 시 가장 먼저 실행
async function initCall() {
    setUserName();
    EnterRoom()
    selectCamera();
    await getMedia();
    addMessage(`${nickName}(나)님 환영합니다😄`);
}
//---------------------------------------------------------------

// 채팅장에 메시지 추가
function addMessage(message) {
    //todo: 메시지 전달
    const chatMessage = document.createElement("li");
    chatMessage.innerText = message;
    chatWindow.appendChild(chatMessage);
}

// 메시지 전달.
function MessageSubmit(event) {
    event.preventDefault();
    //todo 데이터 체널로 메시지 전달.
    console.log(chatInput.value);
    addMessage(`${nickName}(나) : ${chatInput.value}`);

    Object.keys(dataChannels).forEach((userId) => {
        console.log(dataChannels[userId]);
        dataChannels[userId].send(`${nickName} : ${chatInput.value}`);
    })
    
    chatInput.value = "";
}

async function RoomEnterSubmit(event) {
    event.preventDefault();
    
    roomName = roomNameInput.value;
    roomNameInput.value = ""

    await initCall();

    socket.emit("enter_room", roomName, socket.id, nickName);
    // 백엔드에서 실행하는 콜백함수를 위해선 맨 마지막에 함수를 넣어야한다.
    // 예를 들어 일을 완료하고 나서 완료 메시지를 받고싶을때   
}


// socket-------------------------------------------------
/**
 * *welcome*
 * ! [방에 입장했을 시 이벤트] 
 * ? 가장 먼저 입장한 사람만 실행된다. (peer A)
 */
socket.on("welcome", async (newUserId) => {
    const offer = await makeConnection(newUserId);

    socket.emit("offer", offer, newUserId, socket.id); // 초대장 서버로 보내기
    console.log("send the offer");
})

socket.on("bye", (leaveId, userName) => {
    // 나갔다는 메시지
    addMessage(`${userName}님이 퇴장하셨습니다.!`);

    // 비디오 태그 삭제
    const video = document.getElementById(leaveId);
    video.remove();
    
    // peerConnections 제거


    // const h3 = room.querySelector("h3");
    // h3.innerText = `Room ${roomName} (${Object.keys(peerConnections).length})`;
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

// icecandidate 인터넷 연결 생성 => webRTC에서 사용하는 브라우저끼리 소통할때 사용하는 프로토콜
// 따라서 아이스캔디데이트를 만든 다음에 다른 브라우저에 전달해야 한다.
function handleIce(data, othersId) {
    // ice 이벤트 발생 시 이를 방안의 다른 사람들에게 내껄 전달
    socket.emit("ice", data.candidate, othersId, socket.id); // send ice candidate
}

function handleAddStream(data, othersId) {
    console.log("got an stream from my pear");
    console.log("Peer's Stream", data.stream);
    console.log("my Stream", myStream);

    const video = document.createElement("video");
    const name = document.createElement("h3");

    others.appendChild(video);
    others.appendChild(name);

    video.id = othersId;
    video.autoplay = true;
    video.playsInline = true;
    video.width = 400;
    video.height = 400;
    video.srcObject = data.stream;

    name.innerText = othersId;   
}

function randName() {
    let text = "";
    let first = "김이박최정강조윤장임한오서신권황안송류전홍고문양손배조백허유남심노정하곽성차주우구신임나전민유진지엄채원천방공강현함변염양변여추노도소신석선설마주연방위표명기반왕모장남탁국여진구";
    let last = "가강건경고관광구규근기길나남노누다단달담대덕도동두라래로루리마만명무문미민바박백범별병보사산상새서석선설섭성세소솔수숙순숭슬승시신아안애엄여연영예오옥완요용우원월위유윤율으은의이익인일자잔장재전정제조종주준중지진찬창채천철초춘충치탐태택판하한해혁현형혜호홍화환회효훈휘희운모배부림봉혼황량린을비솜공면탁온디항후려균묵송욱휴언들견추걸삼열웅분변양출타흥겸곤번식란더손술반빈실직악람권복심헌엽학개평늘랑향울련";
  
    for (var i = 0; i < 1; i++)
      text += first.charAt(Math.floor(Math.random() * first.length));
    for (var i = 0; i < 2; i++)
      text += last.charAt(Math.floor(Math.random() * last.length));
  
    return text;
  }
