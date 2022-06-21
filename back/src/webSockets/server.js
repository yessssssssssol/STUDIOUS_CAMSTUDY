import express from "express";
import http from "http";
import WebSocket from "ws";
import SocketIO from "socket.io";
import { doesNotMatch } from "assert";
import { uuidv4 } from 'uuid';
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

// app.listen(3000, () => {console.log("Server opened 3000 port : http://localhost:3000")});

// https://socket.io/docs/v4/server-api/
const httpServer = http.createServer(app); // http 서버
const wsServer = SocketIO(httpServer); // socket io로 ws 서버 만들기

function publicRooms() {
    const {
        sockets : {
            adapter: {sids, rooms},
        },
    } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) == undefined) {
            publicRooms.push(key)
        }
    });
    return publicRooms;
}

/**
 * * 디비에서 받은 게시판 데이터
 * ? 1. 게시판 uuid
 * ? 2. 게시판 이름
 */

const roomList = {};

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`socket event: ${event}`);
    })

    socket.on("enter_room", (roomName, newUserId, nickName) => {
        //console.log(socket.id); // 유저마다 고유한 소켓 아이디가 있음
        //console.log(socket.rooms); // 방을 보면 이미 뭔가 고유값이 들어가 있는데 이게 유저개인이 서버 접속하면서 들어간 개인실? 같은 느낌 => 이게 아이디가 된다.
        //console.log(socket.rooms);
        // setTimeout(() => {
        //     done("hello client"); // 백엔드에서 실행하는건 아님 프론트에서 실행하라고 신호를 주는 것 (이 함수를 실행하라고)
        // })
        // wsServer.sockets.emit("room_change", publicRooms());
        roomList[newUserId] = nickName;
        socket.join(roomName);
        console.log(wsServer.adapter);
        socket.to(roomName).emit("welcome", newUserId); // 방에 접속하는 모든 사람에게 인사
    });
    
    socket.on("offer", (offer, newUserId, offersId) => {
        socket.to(newUserId).emit("offer", offer, offersId);
    })
    socket.on("answer", (answer, newUserId, offersId) => {
        socket.to(offersId).emit("answer", answer, newUserId);
    })
    socket.on("ice", (ice, othersId, myId) => {
        // 다른 사람에게 나의 icecandidate 전달
        socket.to(othersId).emit("ice", ice, myId);
    })

    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.id, roomList[socket.id]));
        // 비디오 테그 삭제, 피어리스트 제거
        
    })
    // socket.on("disconnect", () => {
    //     wsServer.sockets.emit("room_change", publicRooms());
    // })
    // 서로 소통하는 소켓 그룹이 있어야 한다.
})


//const wss = new WebSocket.Server({ server }); 

// 매개변수로 아무것도 넣지 않아도 되지만 
// http와 wss를 모두 지원하는 서버를 만들기 위해 http서버를 매개변수로 넣는다.
// 3000번 포트로 http와 wss를 모두 사용하고 싶을 때 사용

// const sockets = [];

// // 연결했을때
// wss.on("connection", (socket) => { // cb의 socket은 연결한 상대(프론트)의 연결대리인
//     console.log(`Connected to Server ${socket.url} `);
//     sockets.push(socket);
//     socket.on("close", () => console.log("Disconnected browser"));
//     socket.on("message", (message) => {
//         sockets.forEach((aSocket) => aSocket.send(message.toString()))
//     })
// })


// socket io
// ws 지원 안하는 브라우저도 자동으로 연결하는 방법을 찾아 신뢰성을 준다.

httpServer.listen(3000, () => {console.log("Server opened 3000 port : http://localhost:3000")});