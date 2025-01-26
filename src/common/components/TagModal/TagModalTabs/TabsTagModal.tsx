import { Box, SxProps, Theme} from '@mui/material'
import { useState, memo } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import MUITabPanel from '@mui/lab/TabPanel'
import TabTagModal from './TabTagModal'
import TabPanelTagModal from './TabPanelTagModal'

const TabsTagModal = () => {
  const [value,setValue] = useState('1')
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const tabListStyles: SxProps<Theme> = {
    color: 'yellow',
    '& .MuiTab-root': {
      fontSize: '16px',
      width: '50%',
    },
    borderColor: 'darkgray',
    '& .MuiTabs-indicator': {
      backgroundColor: 'fuchsia',
    },
  }
  
  
  const tabPanelStyle = {
    backgroundColor: '#FAFAF5',
    padding: '0px',
    marginLeft: '0px',
    width: '100%',
    height: '85%',
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
          <TabList 
            onChange={handleChange} 
            aria-label="Player Tabs"
            sx={tabListStyles}
          >
            <TabTagModal
              label='Tag Players'
              value='1'
            />
            <TabTagModal 
              label='Untag Players'
              value='2'
            />
          </TabList>
        </Box>
        <MUITabPanel value="1" sx={tabPanelStyle}>
          <TabPanelTagModal />
        </MUITabPanel>
        <MUITabPanel value="2" sx={tabPanelStyle}>
          <div>
            Untag Panel should be here
          </div>
        </MUITabPanel>
      </TabContext>
    </Box>
  )
}

export default memo(TabsTagModal)