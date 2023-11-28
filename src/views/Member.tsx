import Courts from '../common/components/Courts/Courts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGetMembersQuery } from '../services/apis/members'
import PlayerTabs from './Tabs/PlayerTabs'


const Member = () => {

  const {data: getMembers} = useGetMembersQuery()

  console.log(getMembers)

  return (
    <div className="m-5 flex h-screen flex-row justify-evenly">
      
      <DndProvider backend={HTML5Backend}>
        <div>
          <h1 className="font-semibold">UWBC Exec Tool</h1>
          <PlayerTabs />
        </div>
        <Courts />
      </DndProvider>
    </div>
  )
}

export default Member
