class ChangeDate {
    static findDate(startTime, endTime) {
        // YYYY-MM-DD HH:mm:ss
        // 0123456789012345678

        // console.log(typeof startTime, typeof endTime);
        // console.log('슬라이스', startTime.slice(0, 4));

        const convertStartTime = new Date(`${startTime.slice(0, 4)}/${startTime.slice(5, 7)}/${startTime.slice(8, 10)}/${startTime.slice(11, 13)}:${startTime.slice(14, 16)}:${startTime.slice(17)}`);
        const convertEndTime = new Date(`${endTime.slice(0, 4)}/${endTime.slice(5, 7)}/${endTime.slice(8, 10)}/${endTime.slice(11, 13)}:${endTime.slice(14, 16)}:${endTime.slice(17)}`);

        // console.log(convertStartTime, convertEndTime);

        const startTimeNum = convertStartTime.getTime();
        const endTimeNum = convertEndTime.getTime();
        const studyTimeNum = endTimeNum - startTimeNum;
        // console.log(startTimeNum, endTimeNum);

        // 공부한 시간 보기 HH:MM:SS
        // const div1000remainder = studyTimeNum % 1000;
        const div1000quotient = parseInt(studyTimeNum / 1000);
        const div60remainderS = div1000quotient % 60;
        const div60quotientS = parseInt(div1000quotient / 60);
        const div60remainderM = div60quotientS % 60;
        const div60quotientM = parseInt(div60quotientS / 60);
        const div12remainderH = div60quotientM % 12;
        // const div12quotientH = parseInt(div60quotientM / 12);

        const studyTimeStr = `${div12remainderH}:${div60remainderM}:${div60remainderS} `;

        return { startTimeNum, endTimeNum, studyTimeNum, studyTimeStr };
    }
}

export { ChangeDate };
