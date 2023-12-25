import { Positions } from '../../common/interfaces/IPlayer'
import MemberCourt from './MemberCourt'


export const Member = () => {
  return (
    <div
      className='flex flex-col max-w-sm items-center border border-black p-4 rounded-lg h-full m-4'
    >
      <span
        className='text-2xl font-bold'
      >Member View</span>
      <div
        className='flex flex-col space-y-8'>
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
