import { useDispatch } from 'react-redux'
import Alert from './Alert'
import { resetAllCourts } from '../../../app/redux/gymSlice'
import Button from '@mui/material/Button'

const ResetCourtAlert = ({
  alertOpen,
  setAlertOpen
}:{
  alertOpen: boolean
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const dispatch = useDispatch()
  return (
    <Alert
      isOpen={alertOpen}
      setIsOpen={setAlertOpen}
      title='Reset All Courts?'
      message='Are you sure you want to reset all courts? This is irreversible.'
    >
      <div
        className='flex justify-between w-full'
      >
        <Button variant="outlined" onClick={() => setAlertOpen(false)}
          sx={{
            color: '#c227ff',
            ':hover': {
              color: '#a61aff',
              borderColor: '#a61aff'
            },
            borderColor: '#c227ff'
          }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => {
          dispatch(resetAllCourts())
          setAlertOpen(false)
        }}
        sx={{bgcolor: '#c227ff', ':hover': {bgcolor: '#a61aff'}}}
        >
          Reset
        </Button>
      </div>
    </Alert>
  )
}

export default ResetCourtAlert