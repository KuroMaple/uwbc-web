import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import  IPlayer, { Positions } from '../../interfaces/IPlayer'
import Player from '../Player/Player'
import Controls from '../TabPanelControls/Controls'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { removeFromCourt, selectChallengePlayers } from '../../../app/redux/gymSlice'

interface Props {
  variant: Positions
}
const TabPanel: React.FC<Props> = ({ variant }) => {
  //States
  const [filterByMGO, setFilterByMGO] = useState(false)
  const dispatch = useDispatch()
  const players = useSelector((state: RootState) =>{
    if(variant === Positions.Bench){
      return state.gym.benchPlayers
    }
    else {
      return selectChallengePlayers(state) // Memoized selector
    }

  }
  //(variant === Positions.Challenge) ? state.gym.benchPlayers.filter(player => player.isChallenging) : state.gym.benchPlayers
  )
  const handleDrop = (item: itemDropType) => {
    /*
    Only court to Bench moves are possible. If a player is droppped onto the challenge tab, 
     the user should get a snackbar message saying that the player cannot be moved to the challenge tab, 
     and the player should not be moved.
    */

    // Court to Bench Move
    if(variant === Positions.Bench){
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
    else {
      console.log('Invalid Drop from Court Action Error: will have snackbar for this in future')
    }
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
      {variant === Positions.Bench && <Controls parent={variant} filterByMGO={filterByMGO} setFilterByMGO={setFilterByMGO}/>} {/* Only show controls for bench */}
      <div className='h-TAB-PANEL-RATIO justify-center items-center'>
        {filterByMGO && variant === Positions.Bench ? (
          players.filter((player: IPlayer) => player.isMGO).map((player) => (
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
