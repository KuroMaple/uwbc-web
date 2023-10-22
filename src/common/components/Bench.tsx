import React from 'react'
import Player from './Player/Player'

const Bench = () => {
  return (
    <div className="flex w-1/3 flex-col place-items-center p-10">
      <h1>Bench</h1>
      <Player />
      <Player />
      <Player />
    </div>
  )
}

export default Bench
