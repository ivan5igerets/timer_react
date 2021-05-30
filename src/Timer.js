import { useState, useEffect } from 'react'

function numberFormat(num) {
  if (num < 10) {
    num = '0' + num
  }
  return num
}

function timeFormat(sec) {
  let hour = Math.trunc(sec / 3600)
    sec %= 3600
  let min = Math.trunc(sec / 60)
    sec %= 60

    sec = numberFormat(sec)
    min = numberFormat(min)
    hour = numberFormat(hour)

  return `${hour}:${min}:${sec}`
}

function Timer() {

  const [seconds, setSeconds] = useState(0)
  const [timerStatus, setTimerStatus] = useState('STOP')

  useEffect(() => {
    if (timerStatus === "STOP") {
      return;
    }
    const timer = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timerStatus, seconds])

  const start = () => {
    setTimerStatus('START')
    console.log('start');
  }

  const stop = () => {
    setTimerStatus('STOP')
    console.log('stop');
  }

  const reset = () => {
    setSeconds(0)
  }


  return (
    <div className='timer'>
      <div 
        id="display" 
        className="display"
        style={{
          backgroundColor: timerStatus === "START" ? "#00FA9A" : "#ccc",
          borderRadius: '10px'
        }}
      > 
        {timeFormat(seconds)}
      </div>
      <div className="buttons">
        {timerStatus !== 'START' ? (
          <button onClick={start}>start</button>
          ) : (
          <button onClick={stop}>stop</button>  
        )}
        
        <button id="btnWait" onDoubleClick={stop}>wait</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  )
}

export default Timer