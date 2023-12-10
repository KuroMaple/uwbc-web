import Courts from '../../../common/components/Courts/Courts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { useGetMembersQuery } from '../../../services/apis/members'
import PlayerTabs from '../Tabs'
import MasterControls from './MasterControl'
import { useTimer } from 'react-timer-hook'
import TimerView from '../../../common/components/Timer/TimerView'



const Exec = () => {

  //const {data: getMembers} = useGetMembersQuery()
  //console.log(getMembers)


  // Timer logic

  const time = new Date()
  time.setSeconds(time.getSeconds() + 10) // 13 minutes timer = 780s

  const {
    isRunning,
    seconds,
    minutes,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ 
    expiryTimestamp: time, onExpire: () => console.warn('onExpire called') })

  
  
  return (
    <div className="flex flex-row h-screen p-4">
      
      <DndProvider backend={HTML5Backend}>
        <div className='flex flex-row w-screen'>
          <div className='mb-4 flex-col bg-blue-50'>
            <h1 className="font-semibold text-center">UWBC Exec Tool</h1>
            <PlayerTabs />
          </div>
          <Courts />
        </div>
        
        <div
          className='flex flex-col w-28 h-72 justify-between items-center ml-3'>
          <TimerView minutes={minutes} seconds={seconds} isRunning={isRunning}/>
          <MasterControls TimerActions={{start, pause, resume, restart}}/>
          
        </div>
        
      </DndProvider>
    </div>
  )
}

export default Exec
