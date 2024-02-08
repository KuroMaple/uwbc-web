import { IOpenTeam } from '../../common/interfaces/IOpenTeam'
import { Positions } from '../../common/interfaces/IPlayer'

export const fetchSheetData = async () => {
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

    return openPlayers
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}
