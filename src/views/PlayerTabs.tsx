import { Box, Tab } from '@mui/material'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Bench from '../common/components/Bench'
import Challenge from '../common/components/Challenge'

const PlayerTabs = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  
  return (
    <Box sx={{ width: '100%', typography: 'body1', background: 'white' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Bench" value="1" />
            <Tab label="Challenge" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Bench />
        </TabPanel>
        <TabPanel value="2">
          <Challenge />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default PlayerTabs