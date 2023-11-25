import { Positions } from '../../interfaces/IPlayer'
import Court from './Court'

const Courts = () => {
  return (
    <div className="bg-fuchsia-300 grid grid-cols-2">
      <Court courtNumber='1' courtPosition={Positions.Court1} />
      <Court courtNumber="2" courtPosition={Positions.Court2} />
      <Court courtNumber="3" courtPosition={Positions.Court3} />
      <Court courtNumber="4" courtPosition={Positions.Court4} />
      <Court courtNumber="5" courtPosition={Positions.Court5} />
      <Court courtNumber="6" courtPosition={Positions.Court6} />
      <Court courtNumber="7" courtPosition={Positions.Court7} />
      <Court courtNumber="8" courtPosition={Positions.Court8} />
    </div>
  )
}

export default Courts
