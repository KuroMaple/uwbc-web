/* eslint-disable react/react-in-jsx-scope */
import Exec from '../views/Exec/Exec'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom' 
import { Member } from '../views/Member/Member'
import Open from '../views/Open /Open'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          /*<div>   
            <nav>
              <ul>
                <li>
                  <Link to="/exec">Exec View</Link>
                </li>
                <li>
                  <Link to="/members">Member View</Link>
                </li>
                <li>
                  <Link to="/open">Open Tournament Expansion</Link>
                </li>
              </ul>
            </nav>
        </div>*/ <Exec />} />
        <Route path='/exec' element={<Exec />} />
        <Route path='/members' element={<Member />}/>
        <Route path='/open' element={<Open />}/>
      </Routes>

    </Router>
  )
}

export default App
