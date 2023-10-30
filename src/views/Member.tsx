import Courts from '../common/components/Courts/Courts'
import Bench from '../common/components/Bench'
import Challenge from '../common/components/Challenge'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Member = () => {
  return (
    <div className="m-5 flex h-screen flex-row justify-evenly bg-blue-500">
      <DndProvider backend={HTML5Backend}>
        {/* <Courts />
        <Challenge /> */}
        <Bench />
      </DndProvider>
    </div>
  )
}

export default Member
