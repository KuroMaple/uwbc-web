import MuiSnackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { setSnackOpen } from '../../../app/redux/appUtilSlice'

const Snackbar = () => {
  const dispatch = useDispatch()
  const snackbar = useSelector((state: RootState) => state.appUtil.snackBar)
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setSnackOpen({
      message: '',
      severity: 'info',
      open: false
    }))
  }
  
  return (
    <MuiSnackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </MuiSnackbar>

  )
}

export default Snackbar