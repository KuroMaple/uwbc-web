import { useDispatch } from 'react-redux'
import { Positions } from '../../common/interfaces/IPlayer'
import { useGetGymStateQuery } from '../../services/apis/syncRedux'
import MemberCourt from './MemberCourt'
import { useEffect } from 'react'
import { syncGymState } from '../../app/redux/gymSlice'
import MobileAd from './MobileAd'
import './Member.css'


export const Member = () => {
  const {data: gymState} = useGetGymStateQuery() // Fetches most recent gym state
  // update redux store with current session id
  const dispatch = useDispatch()

  useEffect(() => {
    if(gymState){
      dispatch(syncGymState(gymState))
    }
  }, [gymState])

  return (
    <div
      className='member-view__container'
    >
      <span
        className='text-2xl font-bold'
      >Member View</span>
      <div
        className='flex flex-col space-y-8'>
        <MobileAd />
        <MemberCourt position={Positions.Court1} />
        <MemberCourt position={Positions.Court2} />
        <MemberCourt position={Positions.Court3} />
        <MemberCourt position={Positions.Court4} />
        <MemberCourt position={Positions.Court5} />
        <MemberCourt position={Positions.Court6} />
        <MemberCourt position={Positions.Court7} />
        <MemberCourt position={Positions.Court8} />
      </div>
      
    </div>
  )
}
