import React from 'react'
import MUITab from '@mui/material/Tab'
import { TabProps } from '@mui/material'
import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import { Positions } from '../../../common/interfaces/IPlayer'
import { useChangePlayerPositionMutation } from '../../../services/apis/players'


interface PlayerTabProps extends TabProps {
  setValue: React.Dispatch<React.SetStateAction<string>>
}


const PlayerTab: React.FC<PlayerTabProps> = ({setValue, ...props}) => {

  const [movePlayer] = useChangePlayerPositionMutation()

  // Drag and Drop logic
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: itemDropType,) => handleDrop(item),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }))


  // TODO: Convert to API call
  const handleDrop = (item: itemDropType) => {
    if (item.source === Positions.Bench) {
      movePlayer({
        member: item.itemId,
        session: item.session,
        position: Positions.Challenge, 
      })
      setValue('2')
 
    }
    else { // Challenge to Bench Move
      movePlayer({
        member: item.itemId,
        session: item.session,
        position: Positions.Bench, 
      })
      setValue('1')
    }
  }
  return <MUITab ref={drop} {...props}  
    sx={{
      '&.Mui-selected': {
        backgroundColor: 'white',
        color: 'black',
      },
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
      textTransform: 'none',
      ...(isOver && {
        backgroundColor: '#0FA958'}),
    }}
  />
}

export default PlayerTab
