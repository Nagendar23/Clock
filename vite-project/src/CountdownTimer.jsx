import React, { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadline, setDeadline] = useState(""); // State for user input
  const [isActive, setIsActive] = useState(false); // State to track if countdown is active

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    if (time < 0) {
      alert("The countdown has ended!"); // Alert when the countdown ends
      clearInterval(); // Clear the interval
      setIsActive(false); // Stop countdown
      return;
    }
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(getTime, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, deadline]); // Depend on isActive and deadline

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deadline) {
      setIsActive(true); // Start the countdown
    } else {
      alert("Please enter a valid deadline.");
    }
  };

  return (
    <div className='cnt'>
      <h2 id='ct'>Countdown Timer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)} // Update deadline on input change
          required
        />
        <button type="submit">Set Deadline</button>
      </form>
      <div className='timer'>
        <div className='days'>
          <h3 id='days'>{days < 10 ? "0" + days : days}</h3>
          <span>Days</span>
        </div>
        <div className='hours'>
          <h3 id='hours'>{hours < 10 ? "0" + hours : hours}</h3>
          <span>Hours</span>
        </div>
        <div className='minutes'>
          <h3 id='minutes'>{minutes < 10 ? "0" + minutes : minutes}</h3>
          <span>Minutes</span>
        </div>
        <div className='seconds'>
          <h3 id='seconds'>{seconds < 10 ? "0" + seconds : seconds}</h3>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
}
