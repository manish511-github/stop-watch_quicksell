import React, { useState, useEffect } from 'react';
import './App.css'
const App = () => {
  const initialTime = localStorage.getItem('timerValue') || 300;
  const [time, setTime] = useState(parseInt(initialTime));
  const [isRunning, setRunning] = useState(false);

  const formatTime = (second) => {
    const minutes = Math.floor(second / 60);
    const remainSecond = second % 60;
    return `${String(minutes).padStart(2, '0')}m  ${String(remainSecond).padStart(2, '0')}s`;
  };
  const itt=300;

  const startTimer = () => {
    setRunning(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setTime(parseInt(itt));
    setRunning(false);
  };
 
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === Math.floor(itt/ 2)) {
            
            document.querySelector('.timer').style.color = 'orange';
          }
          if (prevTime === 10) {
        
            document.querySelector('.timer').style.color = 'red';
          }
          if (prevTime === 0) {
            setRunning(false);
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (time === 0) {
      setRunning(false);
    }

    localStorage.setItem('timerValue', time.toString());
    localStorage.setItem('isRunning', isRunning ? 'true' : 'false');

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time, initialTime]);

  useEffect(() => {
    const storedRunning = localStorage.getItem('isRunning');
    if (storedRunning === 'true') {
      setRunning(true);
    }
  }, []);

  return (
    <div className="stopwatch">
      <div className="timer">
        {formatTime(time)}
      </div>
      
      <div className="btn">
        <hr />
        <button className="button1" onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button className="button1" onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button className="button2" onClick={resetTimer} disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
