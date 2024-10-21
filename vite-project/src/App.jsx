import React from 'react'
import StopWatch from './StopWatch'
import CurrentTime from './CurrentTime'
import CountdownTimer from './CountdownTimer';
import  './index.css';

export default function () {
  return (
    <div>
      <CurrentTime/>
      <StopWatch/>
      <CountdownTimer/>
    </div>
  )
}
