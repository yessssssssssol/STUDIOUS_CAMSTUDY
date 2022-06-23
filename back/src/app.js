import cors from 'cors';
import express from 'express';
import SocketIO from "socket.io";
import http from "http";
import { userAuthRouter } from './routers/userRouter';
import { timeLogRouter } from './routers/timeLogRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { userDailySheetRouter } from './routers/userDailySheetRouter';
import { userStudyRoomsRouter } from './routers/userStudyRoomsRouter';
import { commentsRouter } from './routers/commentsRouter';
import { userStudyRoomsService } from './services/userStudyRoomsService';


const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
    res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(timeLogRouter);
app.use(userDailySheetRouter);
app.use(userStudyRoomsRouter);
app.use(commentsRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
        allowedHeaders: ["checkMyService"],
        credentials: true
    }
});

const roomList = {};

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`socket event: ${event}`);
    })

    socket.on("enter_room", async (roomName, newUserId, userToken) => {
        
        if (!roomList[roomName]) {
            roomList[roomName] = [];
        }

        const getInfo = await userStudyRoomsService.getRoom({ roomName });

        if (!getInfo?.members?.includes(userToken) || roomList[roomName]) {
            // 유저 토큰이 있는지 확인
            const errorMessage = "스터디를 참여하셔야 방에 입장하실 수 있습니다."
            socket.emit("refuse", errorMessage);
        }
        else {

            if (!roomList[roomName]) {
                roomList[roomName] = [];
                roomList[roomName].push({
                    "userId" : newUserId,
                    "userToken" : userToken
                });
            }
            else {
                roomList[roomName].push({
                    "userId" : newUserId,
                    "userToken" : userToken
                })
            }

             // 현재 방에 4명인지 체크
            socket.join(roomName);
            console.log(`${roomName} : ${nickName}`);
            socket.to(roomName).emit("welcome", newUserId); // 방에 접속하는 모든 사람에게 인사
        }
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
})


export { httpServer, wsServer };
