import MUITab from '@mui/material/Tab'



const TabTagModal = ({ ...props}) => {



  return <MUITab {...props}  
    sx={{
      '&.Mui-selected': {
        backgroundColor: 'white',
        color: 'black',
      },
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
      textTransform: 'none',
    }}
  />
}

export default TabTagModal
