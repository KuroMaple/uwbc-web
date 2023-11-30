import Courts from '../common/components/Courts/Courts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGetMembersQuery } from '../services/apis/members'
import PlayerTabs from './Tabs/Tabs'


const Member = () => {

  const {data: getMembers} = useGetMembersQuery()

  console.log(getMembers)

  return (
    <div className="flex flex-row justify-evenly h-screen overflow-hidden bg-cyan-400 p-4">
      
      <DndProvider backend={HTML5Backend}>
        <div className='mb-4'>
          <h1 className="font-semibold">UWBC Exec Tool</h1>
          <PlayerTabs />
        </div>
        <Courts />
      </DndProvider>
    </div>
  )
}

export default Member
