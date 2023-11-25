import { useDrop } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../app/redux/DndTypes'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import Player from './Player/Player'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/redux/store'
import { movePlayerTo } from '../../app/redux/gymSlice'

const Challenge = () => {
  const challengePlayers = useSelector((state: RootState) => state.gym.challengePlayers)

  const dispatch = useDispatch()

  //React dnd Recieve player logic
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: PlayerDropType) =>
      dispatch(
        movePlayerTo({
          source: item.source,
          target: Positions.Challenge,
          movedPlayerId: item.movedPlayerId
        }),
      ),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div
      className="flex flex-col place-items-center bg-yellow-600 p-10 w-full h-full"
      ref={drop}
    >
      {challengePlayers.map((player: IPlayer) => {
        return <Player key={player.id} player={player} parent={Positions.Challenge}/>
      })}
    </div>
  )
}

export default Challenge
