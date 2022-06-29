import { randomColor } from '../common/UseData';

export default function TimeBox({ timeData, index, timeGoal }) {
  const title = ['오늘 공부 시간', '이번주 공부 시간', '전체 공부 시간'];
  return (
    <div class="flex-col box-border h-44 p-8 space-y-3 border-2 border-amber-400 shadow-xl rounded-xl">
      <div className="text-xl font-semibold text-gray-400 capitalize text-center">
        {title[index]}
      </div>
      <div className="text-gray-500 text-5xl font-semibold text-center">
        {timeData}
      </div>
      {index === 0 ? (
        timeGoal === '아직 목표 공부시간을 설정하지 않았습니다.' ? (
          <span className="block text-amber-400  text-center text-lg mt-[5px]">
            목표 공부 시간:00:00:00
          </span>
        ) : (
          <span className="block text-amber-400 text-center text-lg mt-[5px]">
            목표 공부 시간 {timeGoal}
          </span>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
