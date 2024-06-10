import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'

export default function Alert() {
  const alert = useSelector((state: RootState) => state.appUtil.alert)

  const handleClose = () => {
    alert.actions[0].onClick()
  }
  return (

    <Dialog
      open={alert.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {alert.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alert.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {alert.actions.map((action, index) => (
          <Button key={index} onClick={action.onClick} autoFocus>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  )
}