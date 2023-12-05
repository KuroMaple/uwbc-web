import MUIChip from '@mui/material/Chip'
import { ChipType } from './types'

interface Props {
  variant: ChipType
}
const Chip: React.FC<Props> = ({ variant }) => {
  if (variant === ChipType.MGO) {
    return (
      <MUIChip label="M" sx={{
        color: 'white',
        backgroundColor: '#0FA958',
        width: '20px',
        height: '20px',
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
        width: '17px',
        height: '17px',
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

  else if (variant === ChipType.CH) {
    return (
      <MUIChip label="CH" sx={{
        color: 'white',
        backgroundColor: '#FF6969',
        width: '30px',
        height: '25px',
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
  else if (variant === ChipType.DEF) {
    return (
      <MUIChip label="DEF" sx={{
        color: 'white',
        backgroundColor: '#3498db',
        width: '30px',
        height: '30px',
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
  else if (variant === ChipType.BR) {
    return (
      <MUIChip label="BR" sx={{
        color: 'white',
        backgroundColor: '#ffb347',
        width: '30px',
        height: '30px',
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