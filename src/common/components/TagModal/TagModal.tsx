import Typography from '@mui/material/Typography/Typography'
import Modal from '../Modal/Modal'

import './TagModal.css'
import TabsTagModal from './TagModalTabs/TabsTagModal'

const TagModal = () => {
  
  
  return (
    <Modal
      
    >
      <div className='tag-players-container '> 
        <TabsTagModal />
        <div 
        >
          <button
            className=' bg-indigo-600 text-white p-2 rounded-md w-24'
            onClick={() => console.log('button clicked')} // UPDATE
            disabled={false} // UPDATE
          >
            Tag
          </button>
          <button
            className='bg-red-600 text-white p-2 rounded-md w-24'
            onClick={() => console.log('button clicked')} // UPDATE
            disabled={false} // UPDATE
          >
            close
          </button>
        </div>
        

      </div>
    </Modal>
  )
}

export default TagModal