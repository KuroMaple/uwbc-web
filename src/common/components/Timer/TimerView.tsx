import { useEffect, useState } from 'react'


interface Props {
  minutes: number
  seconds: number
  isRunning: boolean
}

const TimerView: React.FC<Props> = ({ minutes, seconds, isRunning }) => {

  const [zero, setZero] = useState(false)

  //Alter court background based on time left
  // let backgroundColor = 'steelblue'
  // if (minutes < 13 && minutes > 3) {
  //   backgroundColor = '#4CAF50'
  // }
  // else if (minutes <= 3 ) {
  //   backgroundColor = '#FFEB3B'
  // }

  // if(!zero) {
  //   backgroundColor = '#F44336'
  // }


  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setZero(true)

      // Flash effect for 1 second
      const timeout = setTimeout(() => {
        setZero(false)
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [minutes, seconds])
  return (
    <div style={{
      fontSize: '50px',
      backgroundColor: zero ? 'red' : 'steelblue',
      height: '15%',
      width: '130px',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px',
      transition: 'background-color 0.5s ease',
    }}>
      <span>{minutes.toString().padStart(2, '0')}</span>:<span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  )
}

export default TimerView