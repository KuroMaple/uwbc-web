import Courts from '../common/components/Courts/Courts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGetMembersQuery } from '../services/apis/members'
import PlayerTabs from './PlayerTabs'


const Member = () => {

  const {data: getMembers} = useGetMembersQuery()

  console.log(getMembers)

  return (
    <div className="m-5 flex h-screen flex-row justify-evenly bg-blue-500">
      <DndProvider backend={HTML5Backend}>
        <PlayerTabs />
        <Courts />
      </DndProvider>
    </div>
  )
}

export default Member
