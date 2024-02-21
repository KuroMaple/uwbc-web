/* eslint-disable react/react-in-jsx-scope */
import Exec from '../views/Exec/Exec'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom' 
import { Member } from '../views/Member/Member'
import Open from '../views/Open /Open'
import MainMenu from '../views/MainMenu/MainMenu'
import ExecMenu from '../views/Exec/ExecMenu'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/exec-menu' element={<ExecMenu />} />
        <Route path='/exec' element={<Exec />} />
        <Route path='/members' element={<Member />}/>
        <Route path='/open' element={<Open />}/>
      </Routes>

    </Router>
  )
}

export default App
