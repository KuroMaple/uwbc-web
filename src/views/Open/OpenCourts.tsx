import { Positions } from '../../common/interfaces/IPlayer'
import OpenCourt from './OpenCourt'
import { memo } from 'react'

const OpenCourts = () => {
  return (
    <div className="grid grid-cols-2 w-full justify-items-end">
      <OpenCourt courtNumber="4" courtPosition={Positions.Court4} />
      <OpenCourt courtNumber="8" courtPosition={Positions.Court8} />
      <OpenCourt courtNumber="3" courtPosition={Positions.Court3} />
      <OpenCourt courtNumber="7" courtPosition={Positions.Court7} />
      <OpenCourt courtNumber="2" courtPosition={Positions.Court2} />
      <OpenCourt courtNumber="6" courtPosition={Positions.Court6} />
      <OpenCourt courtNumber='1' courtPosition={Positions.Court1} />
      <OpenCourt courtNumber="5" courtPosition={Positions.Court5} />
    </div>
  )
}

export default memo(OpenCourts)
