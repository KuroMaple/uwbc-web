import { useDispatch, useSelector } from 'react-redux'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import { RootState } from '../../app/redux/store'
import Player from './Player/Player'
import { genPlayer } from './Player/playerGen'
import { createPlayer, movePlayerTo } from '../../app/redux/gymSlice'
import { useDrop } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../app/redux/DndTypes'

const Bench = () => {
  const dispatch = useDispatch()
  const benchPlayers = useSelector((state: RootState) => state.gym.benchPlayers)

 
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: PlayerDropType) =>
      dispatch(
        movePlayerTo({
          source: item.source,
          target: Positions.Bench,
          movedPlayerId: item.movedPlayerId
        }),
      ),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div className="flex w-1/3 flex-col place-items-center p-10" ref={drop}>
      <h1>Bench</h1>
      <button
        className="border border-solid border-black p-4"
        onClick={() => {
          dispatch(createPlayer(genPlayer(Positions.Bench)))
        }}
      >
        Add Player
      </button>
      <div>
        {benchPlayers.map((player: IPlayer) => (
          <Player key={player.id} player={player} parent={Positions.Bench}/>
        ))}
      </div>
    </div>
  )
}

export default Bench
