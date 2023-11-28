import MUIChip from '@mui/material/Chip'

const Chip = () => {
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
  )
}

export default Chip