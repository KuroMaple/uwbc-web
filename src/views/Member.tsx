import React from 'react'
import Courts from '../common/components/Courts/Courts'
import Bench from '../common/components/Bench'
import Challenge from '../common/components/Challenge'

const Member = () => {
  return (
    <div className='flex flex-row justify-evenly m-5 bg-blue-500 h-screen'>
        <Courts />
        <Challenge />
        <Bench />

    </div>
  )
}

export default Member