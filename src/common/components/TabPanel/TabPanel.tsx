import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import Player from '../Player/Player'
import { movePlayerTo } from '../../../app/redux/gymSlice'
import Controls from '../TabPanelControls/Controls'
import { useEffect, useState } from 'react'
import { useGetPlayersBySessionPositionQuery } from '../../../services/apis/players'

interface Props {
  variant: Positions
}
const TabPanel: React.FC<Props> = ({ variant }) => {
  //States
  const [filterByMGO, setFilterByMGO] = useState(false)
  const session = useSelector((state: RootState) => state.gym.sessionId)
  const[playersState, setPlayersState] = useState<IPlayer[]>([])
  const {
    data: players,
  } = useGetPlayersBySessionPositionQuery({
    session: session,
    position: variant,
  })

  useEffect(() => {
    setPlayersState(players?.players ?? [])
  }, [players])
  

  const dispatch = useDispatch()


 
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: itemDropType) =>
      dispatch(
        movePlayerTo({
          source: item.source,
          target: variant, 
          itemId: item.itemId
        }),
      ),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div id='bench-players-tab' className="flex flex-col items-center justify-center h-full" ref={drop}>
      <Controls parent={variant} filterByMGO={filterByMGO} setFilterByMGO={setFilterByMGO}/>
      <div className='h-TAB-PANEL-RATIO justify-center items-center'>
        {filterByMGO && variant === Positions.Bench ? (
          playersState.filter((player) => player.is_MGO).map((player) => (
            <Player key={player.member} player={player} parent={variant}/>
          ))
        ) : (
          playersState.map((player) => (
            <Player key={player.member} player={player} parent={variant}/>
          ))
        )}
        
      </div>
    </div>
  )
}

export default TabPanel
