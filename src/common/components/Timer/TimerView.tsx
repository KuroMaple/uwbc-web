import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSnackOpen } from '../../../app/redux/appUtilSlice'

interface Props {
  minutes: number
  seconds: number
}

const TimerView: React.FC<Props> = ({ minutes, seconds }) => {

  const [isZero, setIsZero] = useState(false)
  const dispatch  = useDispatch()
  


  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      dispatch(
        setSnackOpen({
          message: 'Time is up! Court Change!',
          severity: 'warning',
          open: true
        })
      )
      let count = 0

      const flashEffect = () => {
        
        setIsZero(true)
        
        // Flash effect for 500 milliseconds
        setTimeout(() => {
          setIsZero(false)
          count++
          
          if (count === 50) { // 30 flashes
            clearInterval(interval)
          }
        }, 500)
      }
      
      
      const interval = setInterval(flashEffect, 1000) // Repeat every second
  
      return () => {
        clearInterval(interval)
      }
    }
    
  }, [minutes, seconds])


  return (
    <div
      className='timer-view' 
      style={{
        fontSize: '50px',
        backgroundColor: isZero ? '#F44336' : '',
        height: '100%',
        width: '100%',
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