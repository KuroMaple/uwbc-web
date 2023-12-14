import Courts from '../../../common/components/Courts/Courts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { useGetMembersQuery } from '../../../services/apis/members'
import PlayerTabs from '../Tabs'
import MasterControls from './MasterControl'
import { useTimer } from 'react-timer-hook'
import TimerView from '../../../common/components/Timer/TimerView'



const Exec = () => {
  // API logic
  //const {data: getMembers} = useGetMembersQuery()
  //console.log(getMembers)


  // Timer logic
  const time = new Date()
  time.setSeconds(time.getSeconds() + 780) // 13 minutes timer = 780s

  const {
    seconds,
    minutes,
    start,
    pause,
    restart,
    isRunning
  } = useTimer({ 
    expiryTimestamp: time, onExpire: () => console.warn('Court Change!') })

  
  
  return (
    <div className="flex flex-row h-screen p-2">
      
      <DndProvider backend={HTML5Backend}>
        <div className='flex flex-row w-main-content'>
          <div className='mb-4 flex-col '>
            <h1 className="font-semibold text-center">UWBC Exec Tool</h1>
            <PlayerTabs />
          </div>
          <Courts />
        </div>
        
        <div
          className='flex flex-col justify-between items-center ml-3 w-48'>
          <MasterControls start={start} pause={pause} restart={restart} isRunning={isRunning} />
          <TimerView minutes={minutes} seconds={seconds} />
        </div>
        
      </DndProvider>
    </div>
  )
}

export default Exec
