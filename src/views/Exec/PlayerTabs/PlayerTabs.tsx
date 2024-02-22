import { Box} from '@mui/material'
import { useState, memo } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import MUITabPanel from '@mui/lab/TabPanel'
import TabPanel from '../../../common/components/TabPanel/TabPanel'
import { Positions } from '../../../common/interfaces/IPlayer'
import PlayerTab from './PlayerTab'

const PlayerTabs = () => {
  const [value, setValue] = useState('1')
  


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  
  
  const tabPanelStyle = {
    backgroundColor: '#FAFAF5',
    padding: '0px',
    marginLeft: '0px',
    width: '100%',
    height: '93%',
    overflow: 'auto',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  }

  
  return (
    <Box 
      sx={{
        backgroundColor: '#EAEAEA',
        borderRadius: '25px',
        padding: '10px',
        height: '100%',
        width: '100%',
      }}>
      <TabContext value={value}
      >
        <Box>
          <TabList onChange={handleChange} aria-label="Player"
          >
            <PlayerTab
              setValue={setValue} 
              label="Bench" 
              value="1"
            />
            <PlayerTab
              className='player-drop-space-challenge'
              setValue={setValue}
              label="Challenge" 
              value="2" 
            />
          </TabList>
        </Box>
        <MUITabPanel value="1" sx={tabPanelStyle}>
          <TabPanel variant={Positions.Bench}/>
        </MUITabPanel>
        <MUITabPanel value="2" sx={tabPanelStyle}>
          <TabPanel variant={Positions.Challenge}/>
        </MUITabPanel>
      </TabContext>
    </Box>
  )
}

export default memo(PlayerTabs)