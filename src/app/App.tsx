/* eslint-disable react/react-in-jsx-scope */
import Exec from '../views/Exec/Exec'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom' 
import { Member } from '../views/Member/Member'
import Open from '../views/Open/Open'
import ExecMenu from '../views/Exec/ExecMenu/ExecMenu'
import './App.css'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ExecMenu />} />
          <Route path='/exec' element={<Exec />} />
          <Route path='/members' element={<Member />}/>
          <Route path='/open' element={<Open />}/>
        </Routes>

      </Router>
    </>
  )
}

export default App
