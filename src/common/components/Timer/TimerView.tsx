import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import timerUp from '../../../assets/timerUp.mp3'

interface Props {
  minutes: number
  seconds: number
}

const TimerView: React.FC<Props> = ({ minutes, seconds }) => {

  const [isZero, setIsZero] = useState(false)
  const [play] = useSound(timerUp)



  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      
      let count = 0

      const flashEffect = () => {
        
        setIsZero(true)
        
        // Flash effect for 500 milliseconds
        setTimeout(() => {
          setIsZero(false)
          count++
          
          if (count === 30) { // 30 flashes
            clearInterval(interval)
          }
        }, 500)
      }
      
      
      const interval = setInterval(flashEffect, 1000) // Repeat every second
  
      return () => {
        play() // play sound effect
        clearInterval(interval)
      }
    }
    
  }, [minutes, seconds])


  return (
    <div style={{
      fontSize: '50px',
      backgroundColor: isZero ? '#F44336' : '',
      height: '15%',
      width: '130px',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.5s ease',
    }}>
      <span>{minutes.toString().padStart(2, '0')}</span>:<span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  )
}

export default TimerView