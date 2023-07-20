import React, { useState,useRef } from "react";


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState({hours:0,minutes:0,seconds:0});
  const [counter, setCounter] = useState(0);

  const sec = useRef(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputSeconds = Number(e.target.value);
    if (!isNaN(inputSeconds) && e.target.value != "-") {
      setSeconds(() => inputSeconds);
    }
  };

const calcTime = (s: number) => {
  let hours = Math.trunc((s / 60) / 60)
  if (hours < 10) {
  }
  let minutes = Math.trunc((s % (60 * 60)) / 60);
  let secs = Math.trunc(s % 60);

  return {
    hours,
    minutes,
    seconds: secs
  }
}

const resetTimer = () => {
  if (counter) {
    clearInterval(counter);
    setCounter(0);
  }

  setTimer({hours: 0, minutes: 0, seconds: 0});
}

const startTimer=()=>{
    resetTimer();
    if(seconds){
       sec.current = seconds;
       setTimer(calcTime(seconds));
       setCounter(setInterval(() => {countDown()}, 1000));
       setSeconds(0)
    }
}

const countDown = () => {
  if (sec.current == 0) {
    clearInterval(counter);
  } else {
    setTimer(calcTime(sec.current - 1));
    sec.current--;
  }
}

  return (
    <>
      <input
        onChange={handleInput}
        value={seconds || ""}
        placeholder="Seconds"
        type="text"
      />

      <button disabled={!seconds} onClick={startTimer}>Start</button>

      <br />
      <br />

      <span>{timer.hours<10 && 0}{timer.hours}:{timer.minutes<10 && 0}{timer.minutes}:{timer.seconds<10 && 0}{timer.seconds}</span>
    </>
  );
};

export default Timer;
