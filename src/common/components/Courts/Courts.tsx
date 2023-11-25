import { Positions } from '../../interfaces/IPlayer'
import Court from './Court'

const Courts = () => {
  return (
    <div className="h-full w-full bg-fuchsia-300 p-2">
      <h1 className="font-bold">Courts</h1>
      <div className="grid h-5/6 w-full grid-cols-2 gap-4">
        <Court courtNumber='1' courtPosition={Positions.Court1} />
        <Court courtNumber="2" courtPosition={Positions.Court2} />
        <Court courtNumber="3" courtPosition={Positions.Court3} />
        <Court courtNumber="4" courtPosition={Positions.Court4} />
        <Court courtNumber="5" courtPosition={Positions.Court5} />
        <Court courtNumber="6" courtPosition={Positions.Court6} />
        <Court courtNumber="7" courtPosition={Positions.Court7} />
        <Court courtNumber="8" courtPosition={Positions.Court8} />
        
      </div>
    </div>
  )
}

export default Courts
