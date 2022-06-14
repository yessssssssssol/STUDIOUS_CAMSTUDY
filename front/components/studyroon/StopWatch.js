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
    <div>
      <div className="stopwatch-card">
        <p>{formatTime(timer)}</p>
        <div className="buttons">
          {!isActive && !isPaused ? (
            <button onClick={handleStart}>Start</button>
          ) : isPaused ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handleRestart}>Restart</button>
          )}
          <button onClick={handleReset} disabled={!isActive}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
