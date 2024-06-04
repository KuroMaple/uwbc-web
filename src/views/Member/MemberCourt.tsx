import { useSelector } from 'react-redux'
import { Positions } from '../../common/interfaces/IPlayer'
import { RootState } from '../../app/redux/store'
import { useState } from 'react'
import MemberPlayer from './MemberPlayer'
import './MemberCourt.css'


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

  const [courtNumber] = useState(setNumber)


  const players = useSelector((state: RootState) => {
    switch (position) {
    case Positions.Court1:
      return state.gym.court1.players
    case Positions.Court2:
      return state.gym.court2.players
    case Positions.Court3:
      return state.gym.court3.players
    case Positions.Court4:
      return state.gym.court4.players
    case Positions.Court5:
      return state.gym.court5.players
    case Positions.Court6:
      return state.gym.court6.players
    case Positions.Court7:
      return state.gym.court7.players
    case Positions.Court8:
      return state.gym.court8.players
    default:
      return []
    }
  })

  const isChallengeCourt = useSelector((state: RootState) => {
    switch (position) {
    case Positions.Court1:
      return state.gym.court1.challengePlayerId !== undefined
    case Positions.Court2:
      return state.gym.court2.challengePlayerId !== undefined
    case Positions.Court3: 
      return state.gym.court3.challengePlayerId !== undefined
    case Positions.Court4:
      return state.gym.court4.challengePlayerId !== undefined
    case Positions.Court5:
      return state.gym.court5.challengePlayerId !== undefined
    case Positions.Court6:
      return state.gym.court6.challengePlayerId !== undefined
    case Positions.Court7:
      return state.gym.court7.challengePlayerId !== undefined
    case Positions.Court8:
      return state.gym.court8.challengePlayerId !== undefined
    default:
      return false  
    }
  })


  // Determine if court is a challenge court
  // const isChallengeCourt = () => {
  //   for (let i = 0; i < players.length; i++) { // Potential bug since not doing "react" way
  //     if (players[i].is_challenging) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  return (
    <div
      className='member-court__container'
    >

      <div className='court-number__container'>
        {isChallengeCourt && <span className='text-sm'>Challenge</span>}
        <span>Court</span>
        <span className="text-3xl font-bold">{courtNumber}</span>
      </div>

      <div className="players-container">
        {players.map((player) => (
          <MemberPlayer key={player.id} player={player}/> 
        ))}
      </div>
    </div>
  )
}

export default MemberCourt