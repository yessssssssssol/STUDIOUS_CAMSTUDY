import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import { uploadHandler } from '../utils/multer';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import sendMail from '../utils/sendMail';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/user/register', async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        // req (request) 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'id 혹은 email이나 password가 제대로 넘어오지 않았습니다.' });
        }

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post('/user/login', async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ message: 'email이나 password가 제대로 넘어오지 않았습니다.' });
        }

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        return res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get('/userlist', login_required, async function (req, res, next) {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();

        if (!users) {
            return res.status(400).json({ message: '사용자 목록을 가져오지 못했습니다.' });
        }

        return res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.put('/user/:id', login_required, async function (req, res, next) {
    try {
        // URI로부터 사용자 id를 추출함.
        const user_id = req.params.id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { name, email, password, description };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get('/user/:id', login_required, async function (req, res, next) {
    try {
        const user_id = req.params.id;

        if (!user_id) {
            return res.status(400).json({ message: 'id가 제대로 넘어오지 않았습니다.' });
        }

        const currentUserInfo = await userAuthService.getUserInfo({ user_id });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post('/user/img', login_required, uploadHandler.single('img'), async function (req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: '업로드할 이미지가 없습니다' });
        }

        const user_id = req.currentUserId;
        const url = req.file.path;
        const updatedUser = await userAuthService.updateImg({ user_id, url });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        return res.status(200).send({ url: url });
    } catch (error) {
        next(error);
    }
});

// 이메일 인증
userAuthRouter.get('/user/email/:email', rateLimit({ windowMs: 30000, max: 1 }), async function (req, res, next) {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: '이메일이 제대로 넘어오지 않았습니다.' });
        }

        const code = uuidv4().split('-')[0];
        await sendMail(
            email, //
            '[의자왕] 안녕하세요 의자왕 웹 캠스터디입니다.',
            `이메일 인증 코드는 [${code}] 입니다.\n`,
        );

        return res.status(200).send(code);
    } catch (error) {
        next(error);
    }
});

// 임시 비밀번호 발급하기
userAuthRouter.put('/password/init', async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: '이메일이 제대로 넘어오지 않았습니다.' });
        }

        await userAuthService.sendNewpassword({ email });

        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

// 회원 탈퇴하기
userAuthRouter.delete('/user/:id', login_required, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'id가 제대로 넘어오지 않았습니다.' });
        }

        await userAuthService.deleteUser({ id });

        return res.status(200).json({ result: 'success' });
    } catch (error) {
        next(error);
    }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
// userAuthRouter.get('/afterlogin', login_required, function (req, res, next) {
//     res.status(200).send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`);
// });

export { userAuthRouter };
