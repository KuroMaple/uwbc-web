import { useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import AddPlayersModal from '../AddPlayersModal/AddPlayersModal'
import TagModal from '../TagModal/TagModal'

const ModalMapper = () => {
  const modalID = useSelector((state: RootState) => state.appUtil.modalMapId)

  if (modalID === 'TagPlayers') {
    return (
      <TagModal />
    )
  }
  else if(modalID === 'AddPlayers'){
    return (
      <AddPlayersModal />
    )
  }
  else {
    // Default empty element
    return
  }
}

export default ModalMapper
