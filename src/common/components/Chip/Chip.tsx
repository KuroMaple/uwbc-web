import MUIChip from '@mui/material/Chip'

interface Props {
  variant: 'MGO' | 'On Court'
}
const Chip: React.FC<Props> = ({ variant }) => {
  if (variant === 'MGO') {
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
  else if (variant === 'On Court') {
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
}

export default Chip