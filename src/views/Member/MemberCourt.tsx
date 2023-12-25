import { useSelector } from 'react-redux'
import { Positions } from '../../common/interfaces/IPlayer'
import { RootState } from '../../app/redux/store'
import { useState } from 'react'
import MemberPlayer from './MemberPlayer'


interface Props {
  position: Positions
}

const MemberCourt: React.FC <Props> = ({ position }) => {

  const setNumber = () => {
    switch (position) {
    case Positions.Court1:
      return '1'
    case Positions.Court2:
      return '2'
    case Positions.Court3:
      return '3'
    case Positions.Court4:
      return '4'
    case Positions.Court5:
      return '5'
    case Positions.Court6:
      return '6'
    case Positions.Court7:
      return '7'
    case Positions.Court8:
      return '8'
    default:
      return '0' // Set a default value if courtPosition is not handled
    }
  }

  const [courtNumber, setCourtNumber] = useState(setNumber)

  const players = [
    {
      id: 'A1',
      name: 'Player 1',
      level: 1,
      ticks: 0,
      position: position,
      isMustGoOn: false,
      isChallenger: false,
    },
    {
      id: 'B2',
      name: 'Player 2',
      level: 2,
      ticks: 0,
      position: position,
      isMustGoOn: false,
      isChallenger: false,
    },
    {
      id: 'C3',
      name: 'Player 3',
      level: 3,
      ticks: 0,
      position: position,
      isMustGoOn: false,
      isChallenger: false,
    },
    {
      id: 'D4',
      name: 'Player 4',
      level: 4,
      ticks: 0,
      position: position,
      isMustGoOn: false,
      isChallenger: false,
    },
  ]


  // Pulling from redux store
  const isChallengeCourt = useSelector((state: RootState) => {
    switch (position) {
    case Positions.Court1:
      return state.gym.court1.isChallenge
    case Positions.Court2:
      return state.gym.court2.isChallenge
    case Positions.Court3:
      return state.gym.court3.isChallenge
    case Positions.Court4:
      return state.gym.court4.isChallenge
    case Positions.Court5:
      return state.gym.court5.isChallenge
    case Positions.Court6:
      return state.gym.court6.isChallenge
    case Positions.Court7:
      return state.gym.court7.isChallenge
    case Positions.Court8:
      return state.gym.court8.isChallenge
    default:
      return false // Set a default value if courtPosition is not handled
    }
  })

  return (
    <div
      className=''
    >

      <div className='flex flex-col items-center'>
        {isChallengeCourt && <span className='text-sm'>Challenge</span>}
        <span>Court</span>
        <span className="text-3xl font-bold">{courtNumber}</span>
      </div>

      <div className="justify-items-center items-center rounded-md border border-solid border-black h-5/6 w-full grid grid-cols-2">
        {players.map((player) => (
          <MemberPlayer key={player.id} player={player} isDefender={isChallengeCourt}/> /* isDefender is set to true for challenge court, 
                                                                                                    since there is explict check for challenger player chips
                                                                                                     when setting defender chips*/
        ))}
      </div>
    </div>
  )
}

export default MemberCourt