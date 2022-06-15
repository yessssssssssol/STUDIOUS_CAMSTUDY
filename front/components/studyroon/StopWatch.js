import { useEffect } from 'react';
import useTimer from '../../utils/hooks/useTimer';
import { formatTime } from '../../utils/utils';

// userIsHear가 true일 때 start
// false가 되면 pause
// 아예 창을 나가면 stop하고 reset
// 이 때 멈출 때마다 데이터를 저장한다.
// 저장한 데이터를 백엔드로 넘기기

const StopWatch = () => {
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleRestart,
    handleReset,
  } = useTimer(0);

  return (
    // <div className="mx-10 my-10 flex justify-end">
    <div className="mx-10 my-10 flex justify-around">
      <div>
        <h3 className="font-bold text-2xl dark:text-white">스터디 이름</h3>
      </div>
      <div className="">
        <p className="bg-gray-100 text-gray-800 font-bold text-2xl inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
          {formatTime(timer)}
        </p>
      </div>
      <div className="">
        {!isActive && !isPaused ? (
          <button
            className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleStart}
          >
            시작
          </button>
        ) : isPaused ? (
          <button
            className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handlePause}
          >
            멈춤
          </button>
        ) : (
          <button
            className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleRestart}
          >
            재시작
          </button>
        )}
        <button
          className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleReset}
          disabled={!isActive}
        >
          초기화
        </button>
      </div>
    </div>
    // </div>
  );
};

export default StopWatch;
