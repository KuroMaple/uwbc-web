import React from 'react'
import Player from './Player'

const Challenge = () => {
  return (
    <div className="flex w-1/3 flex-col place-items-center bg-yellow-600 p-10">
      <h2>Challenge Queue</h2>
      <div className='flex flex-col w-full'>
        <Player />
        <Player />
        <Player />
      </div>
    </div>
  )
}

export default Challenge