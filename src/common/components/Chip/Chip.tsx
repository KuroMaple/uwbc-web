import MUIChip from '@mui/material/Chip'
import { ChipType } from './types'

interface Props {
  variant: ChipType
  challengePosition?: number
}
const Chip: React.FC<Props> = ({ variant, challengePosition }) => {
  if (variant === ChipType.MGO) {
    return (
      <MUIChip label="M" sx={{
        color: 'white',
        backgroundColor: '#0FA958',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        '& .MuiChip-label': {
          padding: 0,  // Remove padding for the label
        },
      }}/>
    )}
  else if (variant === ChipType.OC) {
    return (
      <MUIChip label="x" sx={{
        color: 'white',
        backgroundColor: '#808080',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'top',
        paddingBottom: '2px',
        '& .MuiChip-label': {
          padding: 0,  // Remove padding for the label
        },
        transition: 'transform 0.1s ease-in-out', // Add a transition for smooth effect
        '&:hover': {
          transform: 'scale(1.2)', // Enlarge the button on hover
        },
      }}/>
    )
  }

  else if (variant === ChipType.CH) {
    const label = (challengePosition ? 'C' + challengePosition : 'CH')
    return (
      <MUIChip label={label} sx={{
        color: 'white',
        backgroundColor: '#FF6969',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'top',
        paddingBottom: '0px',
        '& .MuiChip-label': {
          padding: 0,  // Remove padding for the label
        },
      }}/>
    )
  }
  else if (variant === ChipType.DEF) {
    return (
      <MUIChip label="DEF" sx={{
        color: 'white',
        backgroundColor: '#3498db',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        '& .MuiChip-label': {
          padding: 0,  // Remove padding for the label
        },
      }}/>
    )
  }
  // variant === ChipType.BR
  else {
    return (
      <MUIChip label="BR" sx={{
        color: 'white',
        backgroundColor: '#ffb347',
        width: '100%', // parent height width should be 30px
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'top',
        paddingBottom: '2px',
        '& .MuiChip-label': {
          padding: 0,  // Remove padding for the label
        },
      }}/>
    )
  }
}

export default Chip