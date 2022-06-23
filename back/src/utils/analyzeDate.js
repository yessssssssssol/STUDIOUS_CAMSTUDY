import { ChangeDate } from './changeDate';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

class analyzeDate {
    static avgAndSum(getSheets) {
        // 목표 공부 퍼센트와 총 공부량을 더하는 로직
        let init = { rate: 0, time: 0 };
        const sum = getSheets.reduce((acc, cur) => {
            if (cur.studyTimeADay === ' ') {
                return {
                    rate: acc.rate + cur.achievementRate,
                    time: acc.time,
                };
            }

            const milliSeconds = ChangeDate.toMilliseconds(cur.studyTimeADay);
            return {
                rate: acc.rate + cur.achievementRate,
                time: acc.time + milliSeconds,
            };
        }, init);

        sum.rate = Number((sum.rate / getSheets.length).toFixed(2));
        sum.time = ChangeDate.toStringTime(sum.time);

        return sum;
    }

    static weekPeriod(getSheets) {
        //이번주 공부시간
        const curDate = ChangeDate.getCurrentDate();
        const now = dayjs(curDate);
        const thisSunday = now.set('day', 0).format('YYYY-MM-DD');
        const thisSaturday = now.set('day', 6).format('YYYY-MM-DD');

        const weekSheets = getSheets.filter((sheet) => {
            const date = dayjs(sheet.date);
            if (date.isBetween(thisSunday, thisSaturday, undefined, '[]')) {
                return true;
            }
            return false;
        });

        return weekSheets;
    }

    // static monthAvgStudyTime(getSheet) {
    //     // 최근 30일 전 공부 평균
    //     const curDate = ChangeDate.getCurrentDate();
    //     const now = dayjs(curDate);
    //     const thisSunday = now.set('day', 0).format('YYYY-MM-DD');
    //     const thisSaturday = now.set('day', 6).format('YYYY-MM-DD');

    //     return;
    // }
}

export { analyzeDate };
