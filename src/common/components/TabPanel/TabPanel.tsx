import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import Player from '../Player/Player'
import Controls from '../TabPanelControls/Controls'
import { useEffect, useState } from 'react'
import { useChangePlayerPositionMutation, useGetPlayersBySessionPositionQuery } from '../../../services/apis/players'
import { useGetCurrentSessionQuery } from '../../../services/apis/session'

interface Props {
  variant: Positions
}
const TabPanel: React.FC<Props> = ({ variant }) => {
  //States
  const [filterByMGO, setFilterByMGO] = useState(false)

  const { data: session } = useGetCurrentSessionQuery()

  const[playersState, setPlayersState] = useState<IPlayer[]>([])

  const {
    data: players,
  } = useGetPlayersBySessionPositionQuery({ // Get players via redux here instead of query
    session: session?.sessionId ?? 0,
    position: variant,
  })

  useEffect(() => {
    setPlayersState(players?.players ?? [])
  }, [players])
  

  const [movePlayer] = useChangePlayerPositionMutation()


  // TODO: Convert to API call
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: itemDropType) =>
      movePlayer({
        member: item.itemId,
        session: item.session,
        position: variant,
      }),
      
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div id='bench-players-tab' className="flex flex-col items-center justify-center h-full" ref={drop}>
      {variant === Positions.Bench && <Controls parent={variant} filterByMGO={filterByMGO} setFilterByMGO={setFilterByMGO}/>} {/* Only show controls for bench */}
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
