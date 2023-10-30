import Player from '../Player/Player'
import { Positions } from '../../interfaces/IPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'
import { movePlayerTo } from '../../../app/redux/gymSlice'
import { useEffect, useState } from 'react'

interface Props {
  courtNumber: string;
}
const Court: React.FC<Props> = ({ courtNumber }) => {
  const [courtPosition, setCourtPosition] = useState<Positions>()

  useEffect(() => {
    switch (courtNumber) {
    case '1':
      setCourtPosition(Positions.Court1)
      break
      
    default:
      break
    }
  }, [])
  

  const courtPlayers = useSelector((state: RootState) =>{
    switch (courtPosition) {
    case Positions.Court1:
      return state.gym.court1
      break
    }
  })

  const dispatch = useDispatch()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: PlayerDropType) =>
      dispatch(
        movePlayerTo({
          source: item.source,
          target: Positions.Court1,
          movedPlayerId: item.movedPlayerId
        }),
      ),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div className="relative border border-solid border-black p-4" ref={drop}>
      <h2 className="absolute left-0 top-0">Court {courtNumber}</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        {courtPlayers?.map((player) => (
          <Player key={player.id} player={player} parent={courtPosition ?? Positions.Bench}/>
        ))}
      </div>
    </div>
  )
}

export default Court
