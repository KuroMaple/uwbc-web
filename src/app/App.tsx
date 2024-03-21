/* eslint-disable react/react-in-jsx-scope */
import Exec from '../views/Exec/Exec'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom' 
import { Member } from '../views/Member/Member'
import ExecMenu from '../views/Exec/ExecMenu/ExecMenu'
import './App.css'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/testsite/live_session/' element={<ExecMenu />} />
          <Route path='/testsite/live_session/exec' element={<Exec />} />
          <Route path='/testsite/live_session/members' element={<Member />}/>
          <Route path='/testsite/live_session/open' element={
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">This page is under construction</h1>
                <p className="text-gray-700">
                  Tournament mode coming soon. Please click&nbsp;
                  <Link to={'/testsite/live_session/'}
                    className='text-blue-500 hover:text-blue-700 cursor-pointer underline'>
                    here
                  </Link> 
                  &nbsp;to return to the main menu
                </p>
              </div>
            </div>
          }/>
        </Routes>

      </Router>
    </>
  )
}

export default App
