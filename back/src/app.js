import cors from 'cors';
import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import { userAuthRouter } from './routers/userRouter';
import { timeLogRouter } from './routers/timeLogRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { userDailySheetRouter } from './routers/userDailySheetRouter';
import { userStudyRoomsRouter } from './routers/userStudyRoomsRouter';
import { commentsRouter } from './routers/commentsRouter';
import { applicantsRouter } from './routers/applicantsRouter';
import { totalTimeRouter } from './routers/totalTimeRouter';
import { userStudyRoomsService } from './services/userStudyRoomsService';
// import fs from 'fs';

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
app.use('/api', userAuthRouter);
app.use('/api',timeLogRouter);
app.use('/api',userDailySheetRouter);
app.use('/api',userStudyRoomsRouter);
app.use('/api',commentsRouter);
app.use('/api',applicantsRouter);
app.use('/api',totalTimeRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

// const options = {
//     key: fs.readFileSync(__dirname + '/privkey.pem'),
//     cert: fs.readFileSync(__dirname + '/cert.pem')
// };

const httpServer = http.createServer(app);

const wsServer = SocketIO(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
        allowedHeaders: ['checkMyService'],
        credentials: true,
    }
});

const roomList = {};

function isUserInRoom(obj, roomId, userId) {
    let check = false;
    obj[roomId].forEach((data) => {
        if(data.userId === userId) {
            check = data;
        }
    });
   
    return check;
}

function isEmptyObj(obj)  {
    if(obj.constructor === Object
        && Object.keys(obj).length === 0)  {
        return true;
    }        
    
    return false;
}

function deleteUserInRoom(obj, userId) {
    let findUser = null;
    let roomId;
    let index;
    Object.keys(obj).forEach((v, i) => {
        roomList[v].forEach((data, i) => {
            if (data.userId === userId) {
                findUser = data
                roomId = v;
                index = i;
                return false;
            }
        })
    })
    
    if (findUser != null) {
        roomList[roomId]?.splice(index, 1);
        return true;
    }
}

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`socket event: ${event}`);
    });

    socket.on("enter_room", async (roomId, newUserId, userId, userName, done) => {
        let getInfo = {};
        getInfo = await userStudyRoomsService.getRoom({roomId}); // 이부분이 아직임.

        if (isEmptyObj(getInfo) == false) {
            if (!roomList[roomId]) {
                roomList[roomId] = [];
            }
        }
        else {
            const errorMessage = "요청하신 스터디룸은 없습니다."
            socket.emit("refuse", errorMessage);
            return;
        }

        if (getInfo?.membersOnly == true) {
            //맴버 방
            if (getInfo?.members?.includes(userId) == false || roomList[roomId]?.length >= getInfo.membersNum) {
                // 유저 토큰이 있는지 확인
                const errorMessage = "스터디를 참여하셔야 방에 입장하실 수 있습니다."
                socket.emit("refuse", errorMessage);
                return;
            }
        }
        else {
            // 오픈 방
            if (roomList[roomId]?.length >= getInfo.membersNum) {
                // 유저 토큰이 있는지 확인
                const errorMessage = "입장 인원을 초과하여 입장하실 수 없습니다."
                socket.emit("refuse", errorMessage);
                return;
            }
        }

        const anotherMe = isUserInRoom(roomList, roomId, userId);

        if (anotherMe != false) {
            
            const errorMessage = "스터디룸에 중복 참여하실 수 없습니다."
            socket.to(anotherMe.socketId).emit("refuse", errorMessage)
            deleteUserInRoom(roomList, userId);
        }
        
        roomList[roomId].push({
            "userName" : userName,
            "socketId" : newUserId,
            "userId" : userId
        });

        socket.join(roomId);
        done();
        socket.to(roomId).emit("welcome", newUserId); // 방에 접속하는 모든 사람에게 인사
    });

    socket.on('offer', (offer, newUserId, offersId) => {
        socket.to(newUserId).emit('offer', offer, offersId);
    });
    socket.on('answer', (answer, newUserId, offersId) => {
        socket.to(offersId).emit('answer', answer, newUserId);
    });
    socket.on('ice', (ice, othersId, myId) => {
        // 다른 사람에게 나의 icecandidate 전달
        socket.to(othersId).emit('ice', ice, myId);
    });

    socket.on("disconnecting", async () => {
        let findUser = null;
        let roomId;
        let index;
        Object.keys(roomList).forEach((v, i) => {
            roomList[v].forEach((data, i) => {
                if (data.socketId === socket.id) {
                    findUser = data
                    roomId = v;
                    index = i;
                    return false;
                }
            })
        })

        //todo: 룸정보 받음
        const room = await userStudyRoomsService.getRoom({roomId});
        console.log(room);
        if (room !== null) {
            if (room.group == true && room.membersOnly == false) {
                //todo: 룸 정보가 오픈방이면 headcount 뺀다
                const headCount = room.headCount.filter((userId) => findUser?.id !== userId);
                const updateChange = { headCount };
                const newHeadCount = await userStudyRoomsService.updateRoom({ roomId, updateChange });
                if (!newHeadCount) {
                    console.log('headCount에 제거하지 못했습니다.');
                }
            }
        }
        
        if (findUser != null) {
            socket.to(roomId).emit("bye", socket.id, findUser?.userName);
            // 룸 리스트 내 제거
            roomList[roomId]?.splice(index, 1);
        }
    })
})


export { httpServer, wsServer };