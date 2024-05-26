import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import  { Positions } from '../../interfaces/IPlayer'
import Player from '../Player/Player'
import Controls from '../TabPanelControls/Controls'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { movePlayerTo } from '../../../app/redux/gymSlice'

interface Props {
  variant: Positions
}
const TabPanel: React.FC<Props> = ({ variant }) => {
  //States
  const [filterByMGO, setFilterByMGO] = useState(false)

  const players = useSelector((state: RootState) =>
    variant === Positions.Challenge ? state.gym.challengePlayers : state.gym.benchPlayers
  )

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: itemDropType) =>
      movePlayerTo({
        itemId: item.itemId,
        source: item.source,
        target: variant,
      }),
      
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div id='bench-players-tab' ref={drop} className="flex flex-col items-center justify-center h-full" >
      {variant === Positions.Bench && <Controls parent={variant} filterByMGO={filterByMGO} setFilterByMGO={setFilterByMGO}/>} {/* Only show controls for bench */}
      <div className='h-TAB-PANEL-RATIO justify-center items-center'>
        {filterByMGO && variant === Positions.Bench ? (
          players.filter((player) => player.isMGO).map((player) => (
            <Player key={player.id} player={player}/>
          ))
        ) : (
          players.map((player) => (
            <Player key={player.id} player={player}/>
          ))
        )}
        
      </div>
    </div>
  )
}

export default TabPanel
