import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp,onExpire } : any) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: onExpire});


  return (
    <div style={{textAlign: 'center'}}>
      <h1>Auction Timer </h1>
      <p>Timer Left</p>
      <div style={{fontSize: '100px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default MyTimer