import React from 'react'
import Courts from '../common/components/Courts/Courts'
import Bench from '../common/components/Bench'
import Challenge from '../common/components/Challenge'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Member = () => {
  return (
    <div className='flex flex-row justify-evenly m-5 bg-blue-500 h-screen'>
      <DndProvider backend={HTML5Backend}>
        <Courts />
        <Challenge />
        <Bench />
      </DndProvider>

    </div>
  )
}

export default Member