import dayjs from 'dayjs';

const d = dayjs('2022-03-02 14:14:33');
console.log(d.format());

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

        const studyTimeStr = this.toStringTime(studyTimeNum);

        return { startTimeNum, endTimeNum, studyTimeNum, studyTimeStr };
    }

    static getCurrentDate(time = undefined) {
        const now = dayjs(time);
        let date = now.format('YYYY-MM-DD');
        if (now.get('hour') < 5) {
            date = now.add(-1, 'day').format().slice(0, 10);
            return date;
        }
        return date;
    }

    static toMilliseconds(studyTimeADay) {
        //HH:MM:SS
        //시 * 60 * 60 * 1000
        //분 * 60 * 1000
        //초 * 1000
        const studyTimeADayNum = Number(studyTimeADay.slice(0, 2)) + 60 * 60 * 1000 + (Number(studyTimeADay.slice(3, 5)) + 60 * 1000) + (Number(studyTimeADay.slice(6)) + 1000);
        return studyTimeADayNum;
    }

    static toStringTime(studyTimeNum) {
        // 공부한 시간 보기 HH:MM:SS
        // const div1000remainder = studyTimeNum % 1000;
        const div1000quotient = parseInt(studyTimeNum / 1000);
        const div60remainderS = div1000quotient % 60;
        const div60quotientS = parseInt(div1000quotient / 60);
        const div60remainderM = div60quotientS % 60;
        const div60quotientM = parseInt(div60quotientS / 60);
        const div12remainderH = div60quotientM % 12;
        // const div12quotientH = parseInt(div60quotientM / 12);
        const ss = div60remainderS < 10 ? '0' + div60remainderS : div60remainderS;
        const mm = div60remainderM < 10 ? '0' + div60remainderM : div60remainderM;
        const hh = div12remainderH < 10 ? '0' + div12remainderH : div12remainderH;

        const studyTimeStr = `${hh}:${mm}:${ss} `;

        return studyTimeStr;
    }

    // static getCurrentDate() {
    //     var date = new Date();
    //     var year = date.getFullYear();
    //     var month = date.getMonth();
    //     var today = date.getDate();
    //     var hours = date.getHours();
    //     var minutes = date.getMinutes();
    //     var seconds = date.getSeconds();
    //     var milliseconds = date.getMilliseconds();
    //     return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
    // }
}

export { ChangeDate };
