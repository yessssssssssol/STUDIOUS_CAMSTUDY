import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { aiAtom, readyAtom } from '../../core/atoms/aiState';
import useTimer from '../../utils/hooks/useTimer';
import { formatTime } from '../../utils/utils';
import { useRouter } from 'next/router';

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

  const initialMinute = 0;
  const initialSeconds = 10;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [getReady, setGetReady] = useRecoilState(readyAtom);
  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);

  const router = useRouter();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setGetReady(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (getReady === true && userIsHear === true) {
      handleRestart();
      console.log('userIsHear가 true');
    } else if (getReady === true && userIsHear === false) {
      handlePause();
      console.log('userIsHear가 false');
    }
  }, [getReady, userIsHear]);

  useEffect(() => {
    if (getReady === true) {
      handleStart();
      console.log('getReady가 true');
    }
  }, []);

  return (
    <div>
      <div>
        <div className="mx-10 my-10 flex justify-around">
          <div>
            <h3 className="font-bold text-2xl dark:text-white">스터디 이름</h3>
          </div>
          <div>
            <p className="bg-gray-100 text-gray-800 font-bold text-2xl inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
              {formatTime(timer)}
            </p>
          </div>
          <div>
            <button
              className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => router.back()}
            >
              나가기
            </button>
          </div>
          {/* <div>
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
          </div> */}
        </div>
      </div>
      <div>
        {minutes === 0 && seconds === 0 ? null : (
          <div className="justify-center items-center text-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <img
                className="rounded-t-lg"
                src="/sampleImg.jpg"
                alt="증명사진"
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  10초 뒤에 타이머가 시작됩니다.
                  <br /> 웹캠에 사진과 같이 눈, 코, 입이 잘 보이게 설정해주세요.
                </p>
                <svg
                  role="status"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopWatch;
