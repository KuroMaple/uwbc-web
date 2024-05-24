import { useNavigate } from 'react-router-dom'
import { useCreateSessionMutation } from '../../../services/apis/session'
import ISession from '../../../services/interfaces/ISession'
import { setSessionId } from '../../../app/redux/gymSlice'
import { useDispatch } from 'react-redux'
import './ExecMenu.css'
import bgImage from '../../../../public/menuBackground.png'
import ICreateSessionResponse from '../../../services/interfaces/ICreateSessionResponse'


const ExecMenu = () => {
  const navigate = useNavigate()
  const requestData: Partial<ISession> = {
    term: 1, // Hardcoded for Winter 24
  }
  const [createSesionPost] = useCreateSessionMutation()

  const dispatch = useDispatch()

  /****** createSession() *******
  Will create a session for today and redirect to exec view of current session.
    If session for today already exists, will redirect to exec view of current session without creating a new session.
  ************************************/
  const createSession =  async () => {
    const payload = await createSesionPost(requestData)
    const responseData = payload as { data: ICreateSessionResponse } // Asserting that payload is always of type ICreateSessionResponse
    const sessionId = responseData.data.sessionId

    dispatch(setSessionId(sessionId)) // Setting the session id in the redux store
    console.log('Session created with id:', sessionId) //debugging
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