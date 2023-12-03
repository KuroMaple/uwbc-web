import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import Player from '../Player/Player'
import { movePlayerTo } from '../../../app/redux/gymSlice'
import Controls from '../PanelControls/Controls'

interface Props {
  variant: Positions
}
const TabPanel: React.FC<Props> = ({ variant }) => {
  const dispatch = useDispatch()
  const players = useSelector((state: RootState) => {
    switch (variant) {
    case Positions.Challenge:
      return state.gym.challengePlayers

    // To prevent compiler from thinking players will be undefined
    default:
      return state.gym.benchPlayers
    }

    
  })

 
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: PlayerDropType) =>
      dispatch(
        movePlayerTo({
          source: item.source,
          target: variant, 
          movedPlayerId: item.movedPlayerId
        }),
      ),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div className="flex flex-col items-center justify-center h-full" ref={drop}>
      <Controls parent={variant}/>
      <div className='h-TAB-PANEL-RATIO justify-center items-center'>
        {players.map((player: IPlayer) => (
          <Player key={player.id} player={player} parent={variant}/>
        ))}
      </div>
    </div>
  )
}

export default TabPanel
