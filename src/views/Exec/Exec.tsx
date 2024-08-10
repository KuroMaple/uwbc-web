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
import { syncGymState } from '../../app/redux/gymSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddPlayersModal from '../../common/components/AddPlayersModal/AddPlayersModal'
import { RootState } from '../../app/redux/store'
import { useGetGymStateQuery } from '../../services/apis/syncRedux'
import PlayerCounter from '../../common/components/PlayerCounter/PlayerCounter'
import './Exec.css'
import Snackbar from '../../common/components/Snackbar/Snackbar'


const Exec = () => {
  // API Initialization
  const {data: gymState} = useGetGymStateQuery() // Fetches most recent gym state
  

  // update redux store with current session id
  const dispatch = useDispatch()

  useEffect(() => {
    if(gymState){
      dispatch(syncGymState(gymState))
    }
  }, [gymState])

  // Pull modal info from redux
  const modalOpen = useSelector((state: RootState) => state.appUtil.modalOpen)

  // Tutorial logic
  const [stepsEnabled, setStepsEnabled] = useState(false) // Set to true when need tutorial
  const [currentStep] = useState(0) // Remove?
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
      {modalOpen && <AddPlayersModal />}
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={currentStep}
        onExit={() => onExit()}
      />
      
      <DndProvider backend={HTML5Backend}>
        <div className='flex flex-row w-main-content'>
          <div className='mb-4 flex-col '>
            <PlayerTabs />
          </div>
          <Courts />
        </div>
        
        <div
          className='flex flex-col justify-between items-center ml-3 w-48'>
          <div
            className='flex flex-row w-full justify-end'
          >
            <MasterControls start={start} pause={pause} restart={restart} isRunning={isRunning} />
          </div>
          <div className='util-container'>
            <PlayerCounter />
            <TimerView minutes={minutes} seconds={seconds} />
          </div>
          
        </div>
      </DndProvider>
      <Snackbar />

    </div>
  )
}

export default Exec
