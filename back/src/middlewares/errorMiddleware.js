function errorMiddleware(error, req, res, next) {
    // 터미널에 노란색으로 출력됨.
    console.log('\x1b[33m%s\x1b[0m', error);
    res.status(400).send(`에러가 발생했습니다. ⚠️ ${error.message} ⚠️`);
}

export { errorMiddleware };
