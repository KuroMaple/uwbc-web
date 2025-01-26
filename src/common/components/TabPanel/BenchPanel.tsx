import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import  IPlayer, { Positions } from '../../interfaces/IPlayer'
import Player from '../Player/Player'
import Controls from '../TabPanelControls/Controls'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { removeFromCourt } from '../../../app/redux/gymSlice'

const BenchPanel = () => {
  //States
  const [filterByMGO, setFilterByMGO] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const dispatch = useDispatch()
  const players = useSelector((state: RootState) => state.gym.benchPlayers)

  const handleDrop = (item: itemDropType) => {
    dispatch(
      removeFromCourt(
        {
          itemId: item.itemId,
          source: item.source,
          target: Positions.Bench
        }
      )
    )
  }

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: itemDropType) => handleDrop(item),
      
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))

  return (
    <div id='bench-players-tab' ref={drop} className="flex flex-col items-center justify-center h-full" >
      <Controls filterByMGO={filterByMGO} setFilterByMGO={setFilterByMGO} setDeleteMode={setDeleteMode} 
        deleteMode={deleteMode} />

      <div className='h-TAB-PANEL-RATIO justify-center items-center'>
        {filterByMGO ? (
          players.filter((player: IPlayer) => player.isMGO).map((player) => (
            <Player key={player.id} player={player} 
              isFromChallengePanel={false} deleteMode={deleteMode} />
          ))
        ) : (
          players.map((player) => (
            <Player key={player.id} player={player} isFromChallengePanel={false} 
              deleteMode={deleteMode} />
          ))
        )}
        
      </div>
    </div>
  )
}

export default BenchPanel
