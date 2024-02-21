import { Link } from 'react-router-dom'

const MainMenu = () => {
  return (
    <div className='flex justify-center bg-blue-100 py-4'>   
      <nav>
        <ul className="flex flex-col" >
          <li>
            <Link to="/exec-menu" className="text-blue-600 hover:text-blue-800" >Exec Menu</Link>
          </li>
          <li>
            <Link to="/members" className="text-blue-600 hover:text-blue-800" >Member View</Link>
          </li>
          <li>
            <Link to="/open" className="text-blue-600 hover:text-blue-800" >Open Tournament Expansion</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MainMenu