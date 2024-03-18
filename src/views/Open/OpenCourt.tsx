import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { Box } from '@mui/material'
import { Positions } from '../../common/interfaces/IPlayer'
import { RootState } from '../../app/redux/store'
import { ItemTypes, itemDropType } from '../../app/redux/DndTypes'
import { moveTeamTo } from '../../app/redux/openTournamentSlice'
import Chip from '../../common/components/Chip/Chip'
import { ChipType } from '../../common/components/Chip/types'
import OpenTeam from './OpenTeam'

interface Props {
  courtPosition: Positions
  courtNumber: string
}
const OpenCourt: React.FC<Props> = ({ courtPosition, courtNumber }) => {

  const dispatch = useDispatch()

  const teams = useSelector((state: RootState) =>{
    switch (courtPosition) {
    case Positions.Court1:
      return state.openTournament.court1.players
    case Positions.Court2: {
      return state.openTournament.court2.players
    }
    case Positions.Court3: {
      return state.openTournament.court3.players
    }
    case Positions.Court4: {
      return state.openTournament.court4.players
    }
    case Positions.Court5: {
      return state.openTournament.court5.players
    }
    case Positions.Court6: {
      return state.openTournament.court6.players
    }
    case Positions.Court7: {
      return state.openTournament.court7.players
    }
    case Positions.Court8: {
      return state.openTournament.court8.players
    }
    }
    
  })!

  
  // Limit courts to two teams max
  const isDroppable = (item: itemDropType) => {
    return teams.length < 2
  }

  const removeAllPlayers = () => {
    teams.forEach((team) => {
      dispatch(moveTeamTo({
        source: courtPosition,
        target: Positions.Bench,
        itemId: team.id.toString(),
      }))
    })
  }

  const [{ isOver, canDrop}, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: (item) => isDroppable(item),
    drop: (item: itemDropType) => {
      dispatch(
        moveTeamTo({
          source: item.source,
          target: courtPosition,
          itemId: item.itemId,
        }),
      )
    },
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
      canDrop: !!monitor.canDrop(),
    }),
  }), [teams])

  //Alter court background based on hover
  let backgroundColor = '#d3d3d3'
  if (isOver && canDrop) {
    backgroundColor = '#4CAF50'
  } else if(isOver && !canDrop) {
    backgroundColor = '#F44336'
  }
  return (
    <div className='flex flex-row items-center space-x-7 h-full min-w-court relative pr-3'>
      { teams.length > 0  && // remove all players X button
      <Box sx={{
        position: 'absolute',
        height: '30px',
        width: '30px',
        top: '0px',
        right: '0px',
        zIndex: 3,
        '&:hover': {
          cursor: 'pointer',
        },
        '& > *': {
          fontSize: '20px', // Adjust font size of child chip
        },
      }}
      onClick={removeAllPlayers}
      >
        <Chip variant={ChipType.OC}/> 
      </Box>}
      <div className='flex flex-col items-center'>
        <span>Court</span>
        <span className="text-5xl font-bold">{courtNumber}</span>
      </div>
      
      <div className="justify-items-center items-center rounded-md border border-solid border-black h-5/6 w-full grid grid-cols-2" style={{ backgroundColor }} ref={drop}>
        {teams.map((team) => (
          <OpenTeam key={team.id} team={team} parent={courtPosition}/>
        ))}
      </div>
    </div>
    
  )
}

export default OpenCourt