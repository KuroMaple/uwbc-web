import { Link, useNavigate } from 'react-router-dom'
import { useCreateSessionMutation } from '../../services/apis/session'
import ISession from '../../services/interfaces/ISession'
import { setSessionId } from '../../app/redux/gymSlice'
import { useDispatch } from 'react-redux'

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
  return (
    <div className='flex justify-center bg-blue-100 py-4'>   
      <nav>
        <ul className="flex flex-col" >
          <li>
            <button onClick={createSession} className="text-blue-600 hover:text-blue-800" >Start Session</button>
          </li>
          <li>
            <Link to="/members" className="text-blue-600 hover:text-blue-800" >Member view for todays session</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default ExecMenu