import Courts from '../../common/components/Courts/Courts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { useGetMembersQuery } from '../../services/apis/members'
import PlayerTabs from './PlayerTabs/PlayerTabs'
import MasterControls from './MasterControl'
import { useTimer } from 'react-timer-hook'
import TimerView from '../../common/components/Timer/TimerView'
import { useEffect, useState } from 'react'
import { Steps } from 'intro.js-react'
import 'intro.js/introjs.css'
import { useGetCurrentSessionQuery } from '../../services/apis/session'
import { setModalOpen, setSessionId } from '../../app/redux/gymSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/redux/store'
import SearchModal from '../../common/components/SearchModal/SearchModal'



const Exec = () => {
  // API logic
  const {data: currentSession} = useGetCurrentSessionQuery()

  // update redux store with current session id
  const dispatch = useDispatch()
  useEffect(() => {
    if (currentSession) {
      dispatch(setSessionId(currentSession.sessionId ?? -1))
    }
  }, [currentSession])


  // Tutorial logic
  const [stepsEnabled, setStepsEnabled] = useState(false) // Set to true when need tutorial
  const [currentStep, setCurrentStep] = useState(0)
  const [renderCount, setRenderCount] = useState(0)
  const steps = [ 
    {
      element: '#add-player',
      intro: 'Click here to add a player to the bench',
    },
    {
      element: '#bench-players-tab',
      intro: 'Players on the bench are displayed here',
    },
    {
      element: '.player-drop-space-challenge',
      intro: 'Players can be drag and dropped to the challenge tab',
    },
    {
      element: '#player-drop-space-court-1',
      intro: 'Players can also be drag and dropped to the courts',
    },
    {
      element: '.timer-controls',
      intro: 'Use these buttons to control the timer',
      highlightClass: '.timer-view',
    },
    {
      element: '.reset-courts',
      intro: 'Click here to move all players off the courts',
    },
    {
      element: '.does-not-exist',
      intro: 'Thats it for now! Click anywhere to exit the tutorial',
    }
    // {
    //   element: '#filter-by-mgo',
    //   intro: 'Click here to filter by Must-Go-On status'

    // },

  ]

  // To exit the tutorial
  const onExit = () => {
    setStepsEnabled(false)
  }



  // To offset initial renderings that mess up steps enabled value
  useEffect(() => {
    if (renderCount < 1) {
      setStepsEnabled(false)
      setRenderCount(renderCount + 1)
    }
  }, [stepsEnabled])



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
    expiryTimestamp: time, onExpire: () => console.warn('Court Change!'), autoStart: false })

  
  
  return (
    <div className="flex flex-row h-screen p-2">
      <SearchModal />
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={currentStep}
        onExit={() => onExit()}
      />
      
      <DndProvider backend={HTML5Backend}>
        <div className='flex flex-row w-main-content'>
          <div className='mb-4 flex-col '>
            <h1 className="font-semibold text-center">UWBC Exec Tool</h1>
            <PlayerTabs />
          </div>
          {/* <Courts /> */}
        </div>
        
        <div
          className='flex flex-col justify-between items-center ml-3 w-48'>
          <div
            className='flex flex-row w-full justify-end'
          >
            {/* <MasterControls start={start} pause={pause} restart={restart} isRunning={isRunning} /> */}
          </div>
          
          {/* <TimerView minutes={minutes} seconds={seconds} /> */}
        </div>
        
      </DndProvider>
    </div>
  )
}

export default Exec
