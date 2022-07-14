import { useState, useRef } from 'react';

/** 타이머 기능 hook
 *
 * @hook
 * @params {number} initialState - 타이머 초기 숫자, 해당 숫자대로 타이머가 시작된다.
 * @return Prologue
 */

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  // 타이머를 시작하는
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  //타이머를 멈추는
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  // 타이머 재시작
  const handleRestart = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  // 타이머 리셋
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const getActiveTime = () => {
    return timer;
  };

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleRestart,
    handleReset,
    getActiveTime,
  };
};

export default useTimer;
