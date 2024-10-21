import React, { useState, useEffect } from 'react';


export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lastLapTime, setLastLapTime] = useState(0); // Track time of the last lap

  const getH = ms => Math.floor((ms / 10) % 100);
  const getS = ms => Math.floor((ms / 1000) % 60);
  const getM = ms => Math.floor((ms / 1000 / 60) % 60);

  const formatTime = ms => `${getM(ms).toString().padStart(2, '0')}:${getS(ms).toString().padStart(2, '0')}:${getH(ms).toString().padStart(2, '0')}`;

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);  // Increment by 10ms each time
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleLap = () => {
    const lapTime = time - lastLapTime;  // Calculate the lap time as the difference
    setLaps([...laps, lapTime]);
    setLastLapTime(time);  // Update the last lap time to the current time
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    setLastLapTime(0);  // Reset the last lap time
  };

  return (
    <>
    
    <div className='container'>
      <div className="display">{formatTime(time)}</div>
      <div className="buttons">
        {!isRunning && !time && <button id='btn-start' onClick={() => setIsRunning(true)}>Start</button>}
        {!isRunning && time > 0 && <button id='btn-resume' onClick={() => setIsRunning(true)}>Resume</button>}
        {isRunning && <button id='btn-lap' onClick={handleLap}>Lap</button>}
        {isRunning && <button  id='btn-stop' onClick={() => setIsRunning(false)}>Stop</button>}
        {!isRunning && time > 0 && <button id='btn-reset' onClick={handleReset}>Reset</button>}
      </div>

      <div className="laps">
        {laps.map((lap, i) => (
          <div key={i}>Lap {i + 1}: {formatTime(lap)}</div>
        ))}
      </div>
    </div>
    </>
  );
}
