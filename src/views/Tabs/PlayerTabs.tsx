import { Box, Tab } from '@mui/material'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Bench from '../../common/components/Bench'
import Challenge from '../../common/components/Challenge'

const PlayerTabs = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const tabPanelStyle = {
    backgroundColor: '#FAFAF5',
    padding: '0px',
    width: '100%',
    height: '332px',
    overflow: 'auto',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  }

  const tabStyle = {
    '&.Mui-selected': {
      backgroundColor: 'white',
      color: 'black',
    },
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    textTransform: 'none',
  }

  
  return (
    <Box 
      sx={{
        backgroundColor: '#EAEAEA',
        borderRadius: '25px',
        padding: '10px',
        height: '400px',
      }}>
      <TabContext value={value}
      >
        <Box>
          <TabList onChange={handleChange} aria-label="Player"
          >
            <Tab label="Bench" value="1"
              sx={tabStyle}/>
            <Tab label="Challenge" value="2" 
              sx={tabStyle}/>
          </TabList>
        </Box>
        <TabPanel value="1" sx={tabPanelStyle}>
          <Bench />
        </TabPanel>
        <TabPanel value="2" sx={tabPanelStyle}>
          <Challenge />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default PlayerTabs