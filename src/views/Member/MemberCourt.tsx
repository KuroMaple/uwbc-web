import { useSelector } from 'react-redux'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import { RootState } from '../../app/redux/store'
import { useEffect, useState } from 'react'
import MemberPlayer from './MemberPlayer'
// import { useGetPlayersBySessionPositionQuery } from '../../services/apis/players'
import { useGetCurrentSessionQuery } from '../../services/apis/session'


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

  const {data: session} = useGetCurrentSessionQuery()
  const [courtNumber] = useState(setNumber)

  // const {data: playersData} = useGetPlayersBySessionPositionQuery({ // Replace with redux
  //   session: session?.sessionId ?? 0,
  //   position: position,
  // })
  const [players, setPlayers] = useState<IPlayer[]>([])
  console.log(playersData)
  useEffect(() => {
    setPlayers(playersData?.players ?? [])
  }, [playersData])
  

  // Determine if court is a challenge court
  const isChallengeCourt = () => {
    for (let i = 0; i < players.length; i++) { // Potential bug since not doing "react" way
      if (players[i].is_challenging) {
        return true
      }
    }
    return false
  }

  return (
    <div
      className='flex flex-col items-center'
    >

      <div className='flex flex-col items-center'>
        {isChallengeCourt() && <span className='text-sm'>Challenge</span>}
        <span>Court</span>
        <span className="text-3xl font-bold">{courtNumber}</span>
      </div>

      <div className="justify-items-center items-center rounded-md border border-solid border-black h-5/6 w-full grid grid-cols-2">
        {players.map((player) => (
          <MemberPlayer key={player.member} player={player} isDefender={isChallengeCourt()}/> /* isDefender is set to true for challenge court, 
                                                                                                    since there is explict check for challenger player chips
                                                                                                     when setting defender chips*/
        ))}
      </div>
    </div>
  )
}

export default MemberCourt