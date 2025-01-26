import { Box, Paper, Typography } from '@mui/material'
import IPlayer from '../../interfaces/IPlayer'
import Checkbox from '../Checkbox/Checkbox'
import { setColor, shortenNameToFirst } from '../Player/Player'


type Props = {
  player: IPlayer 
  tagCheckedPlayers: IPlayer[]
  setTagCheckedPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
}

const TagPlayers: React.FC<Props> = ({player, setTagCheckedPlayers, tagCheckedPlayers}) => {
  
  // Adds a player to tagged player list or removes them if already present
  const addPlayerToTaggedList = () => {
    setTagCheckedPlayers(prevState => {
      if (prevState.includes(player)) {
        return prevState.filter(p => p !== player) // Remove the player if already present
      } else {
        return [...prevState, player] // Add the player if not present
      }
    })
  }
  
  return (
    <Box
      sx={
        {
          padding: '3px',
          position: 'relative',
          WebkitUserSelect: 'none', // Prevent text selection
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }
      }
    >

      {/* Chip JSX Below*/}


      {
        <Box sx={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          zIndex: 2,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        >
          <Checkbox checked={tagCheckedPlayers.includes(player)} 
            disabled={tagCheckedPlayers.length >= 4 && !tagCheckedPlayers.includes(player)}
            onChange={addPlayerToTaggedList}
          />
        </Box> 
      }

      {/* Player Tag JSX Below*/}
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          ...setColor(player.level),
          padding: '5px',
        }}>
        <Typography sx={{ fontSize: 11, fontWeight: 'bold', position: 'absolute', }} color="text.secondary" gutterBottom>
        M{player.id}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold', position: 'absolute', left: '5px', bottom: '0px' }} color="text.secondary" gutterBottom>
          {player.numRotationsOff}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <Typography sx={{ fontSize: 15, marginTop: '10px' }} color="text.secondary" gutterBottom>
            {shortenNameToFirst(player.name)}
          </Typography>

        </Box>
      
      </Paper>
    </Box>
  )
}

export default TagPlayers