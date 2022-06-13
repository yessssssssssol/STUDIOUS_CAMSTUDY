import useTimer from '../../utils/hooks/useTimer';
import { formatTime } from '../../utils/utils';

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
    <div className="app">
      <h3>React Stopwatch</h3>
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
  //   const [time, setTime] = useState(0);
  //   const [running, setRunning] = useState(false);

  //   useEffect(() => {
  //     let interval;
  //     if (running) {
  //       interval = setInterval(() => {
  //         setTime((prevTime) => prevTime + 10);
  //       }, 10);
  //     } else {
  //       clearTimeout(interval);
  //     }
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [running]);

  //   return (
  //     <div className="stopwatch">
  //       <div className="numbers">
  //         <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
  //         <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
  //         <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
  //       </div>
  //       <div className="buttons">
  //         <button onClick={() => setRunning(true)}>Start</button>
  //         <button onClick={() => setRunning(false)}>Stop</button>
  //         <button onClick={() => setTime(0)}>Reset</button>
  //       </div>
  //     </div>
  //   );
};

export default StopWatch;
