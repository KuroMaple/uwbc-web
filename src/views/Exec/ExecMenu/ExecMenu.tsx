import { Link, useNavigate } from 'react-router-dom'
import { useCreateSessionMutation } from '../../../services/apis/session'
import ISession from '../../../services/interfaces/ISession'
import { setSessionId } from '../../../app/redux/gymSlice'
import { useDispatch } from 'react-redux'
import './ExecMenu.css'
import bgImage from '../../../assets/menuBackground.png'

const ExecMenu = () => {
  const navigate = useNavigate()
  const requestData: Partial<ISession> = {
    term: 1,
  }
  const [createSesionPost, result] = useCreateSessionMutation()

  const dispatch = useDispatch()
  //Will create a session for today and redirect to exec view of current session
  //    If session for today already exists, will redirect to exec view of current session without creating a new session
  const createSession =  async () => {
    const payload = await createSesionPost(requestData)
    console.log('session Id: ', payload.data?.sessionId)
    dispatch(setSessionId(payload.data?.sessionId))// Setting Session id in redux
    navigate('/exec')
  }

  const toMemberView = () => {
    navigate('/members')
  }
  const toTournamentMode = () => {
    navigate('/open')
  }
  return (
    <div className='container'>
      <img 
        className='container__bg-image'
        src={bgImage}
      />   
      <div className='menu' >
        <button className='menu__item' onClick={createSession}>
          Start Session
        </button>
        <button className='menu__item' onClick={toMemberView}>
          Member view
        </button>
        <button className='menu__item' onClick={toTournamentMode}>
          Tournament Mode
        </button>
      </div>
    </div>
  )
}

export default ExecMenu