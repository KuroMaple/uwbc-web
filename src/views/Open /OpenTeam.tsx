import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { Positions } from '../../common/interfaces/IPlayer'
import { IOpenTeam } from '../../common/interfaces/IOpenTeam'
import { ItemTypes, itemDropType } from '../../app/redux/DndTypes'
import { moveTeamTo } from '../../app/redux/openTournamentSlice'
import Chip from '../../common/components/Chip/Chip'
import { ChipType } from '../../common/components/Chip/types'



interface Props {
  team: IOpenTeam
  parent: Positions
}

const OpenTeam: React.FC<Props> = ({ team, parent }) => {
  
  const [partnerOne, setPartnerOne] = useState(team.partnerOne)
  const [partnerTwo, setPartnerTwo] = useState(team.partnerTwo)
  const [position, setPosition] = useState<Positions>(parent)


  // Local Properties
  const [onCourt, setOnCourt] = useState(false)

  

  // Redux connection
  const dispatch = useDispatch()
  
  useEffect(() => {
    setPartnerOne(team.partnerOne)
    setPartnerTwo(team.partnerTwo)
    setPosition(team.position)
    setOnCourt(parent !== Positions.Bench)
  }, [team])
  
  // React Drag n Drop Logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { itemId: team.id.toString(), source: parent } as itemDropType, // So that when a player is dropped, we can send both the source and target to reducer
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // !! converts the result to a boolean
    }),
  }))

  // Shortens the name to first name and first letter of last name if name is too long
  const shortenNameToFirst = (name: string) => {
    if (name.length < 10) {
      return name
    }
    const nameArr = name.split(' ')
    return nameArr[0] + ' ' + nameArr[1][0] + '.'
  }

  // Removes team from court and places them in bench
  const removeFromCourt = () => {
    dispatch(
      moveTeamTo({
        source: position,
        target: Positions.Bench,
        itemId: team.id.toString(),
      })
    )
  }
  
  // to remove player from vision when dragging
  if(isDragging){
    return <Box 
      sx={{
        width: '100%',
        padding: '0px',
        margin: '0px',
      }}
      ref={drag}/>
  }

  return (
    <Box
      ref={drag}
      sx={
        {
          minWidth: '120px',
          height: '60px',
          padding: '3px',
          position: 'relative',
        }
      }
    >

      {/* Chip JSX Below*/}
      
      {onCourt &&
      <Box sx={{
        position: 'absolute',
        height: '17px',
        width: '17px',
        top: '0px',
        right: '0px',
        zIndex: 3,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        removeFromCourt()
      }}
      >
        <Chip variant={ChipType.OC}/> 
      </Box>}


      {/* Team Tag JSX Below*/}
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '5px',
        }}>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold', position: 'absolute', }} color="text.secondary" gutterBottom>
          {team.id}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <Typography sx={{ fontSize: 15, marginTop: '10px' }} color="text.secondary" gutterBottom>
            {shortenNameToFirst(partnerOne)} and {shortenNameToFirst(partnerTwo)}
          </Typography>

        </Box>
        
      </Paper>
    </Box>
  )
}

export default OpenTeam
