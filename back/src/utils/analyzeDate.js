import { ChangeDate } from './changeDate';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

class analyzeDate {
    // 목표 공부 퍼센트와 총 공부량을 더하는 로직
    static avgAndSum(getSheets) {
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

    //이번주 공부시간
    static weekPeriod(getSheets) {
        const curDate = ChangeDate.getCurrentDate();
        dayjs.locale('ko');
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

    // 최근 30일 전 공부 평균
    static monthAvgStudyTime(getSheets) {
        const curDate = ChangeDate.getCurrentDate();
        const now = dayjs(curDate);
        const before30 = now.subtract(29, 'day').format('YYYY-MM-DD');

        // 최근 30일 시트만 가져오기
        const monthSheets = getSheets.filter((sheet) => {
            const date = dayjs(sheet.date);
            if (date.isBetween(before30, undefined, undefined, '[]')) {
                return true;
            } else {
                return false;
            }
        });

        // 가입한지 30일이 채 안된 경우 30일 시트가 없음
        // 때문에 유저 시트가 없는 경우 임의로 채워서 배열 반환하기
        let avgStyTimeAr = [];
        for (let i = 29; i > -1; i--) {
            const before = now.subtract(i, 'day').format('YYYY-MM-DD');
            // 만약 특정 날짜(before)에 해당하는 sheet가 있으면 해당 시트를 avgStyTimeAr에 push
            let flag = false;
            monthSheets.map((sheet) => {
                if (sheet.date === before) {
                    flag = true;
                    avgStyTimeAr.push(sheet);
                }
            });

            if (flag === false) avgStyTimeAr.push({ date: before, studyTimeADay: ' ' });
        }

        let totalDateIn30 = 0;
        avgStyTimeAr.map((sheet) => {
            if (sheet.studyTimeADay !== ' ') {
                totalDateIn30 += 1;
            }
        });

        const attendanceRate = Number(((totalDateIn30 / 30) * 100).toFixed(2));

        return attendanceRate;
    }
}

export { analyzeDate };
