import { useEffect} from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Positions } from '../../common/interfaces/IPlayer'
import { IOpenTeam } from '../../common/interfaces/IOpenTeam'
import OpenTeam from './OpenTeam'
import OpenCourts from './OpenCourts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/redux/store'
import { createInitialTeams } from '../../app/redux/openTournamentSlice'


const Open = () => {
  const benchPlayers = useSelector((state: RootState) => state.openTournament.benchPlayers)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        // Replace with your published Google Sheets URL
        const sheetsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRB8WV7pUy5WVRoRvRA3OQv0emJsDZ1xp19mbl0MqbO6aLAAyIwxPwvd3LiDUD8uiVoJeKUh0rR2XP/pub?output=csv'
    
        const response = await fetch(sheetsUrl)
    
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }
    
        const csvData = await response.text()
    
        // Parse CSV data into an array of arrays
        const parsedData = csvData
          .split('\n')
          .map(row => row.split(','))
    
        // Assuming the first column is player one and the second column is player two
        const openPlayers = parsedData.map((row, index )=> {
          const team: IOpenTeam = {
            id: index + 1,
            partnerOne: row[0],
            partnerTwo: row[1],
            position: Positions.Bench,
          }
          return team
        })
        
        dispatch(
          createInitialTeams(openPlayers)
        )
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }
    fetchSheetData()
  }, [])



  return (
    <div className="flex flex-row h-screen p-2">
      
      <DndProvider backend={HTML5Backend}>
        <div className='flex flex-row w-main-content'>
          <div className='mb-4 flex-col '>
            <h1 className="font-semibold text-center">UWBC Open Tool</h1>
            {benchPlayers.map((team, index) => (
              <OpenTeam key={index} team={team} parent={Positions.Bench} />
            ))}
          </div>
          <OpenCourts />
        </div>      
      </DndProvider>
    </div>
  )
}

export default Open