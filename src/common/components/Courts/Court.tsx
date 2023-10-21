import React from 'react'
import Player from '../Player'
interface Props {
    number: string
}
const Court: React.FC<Props> = ({ number }) => {
  return (
    <div className="relative border border-solid border-black p-4">
      <h2 className="absolute left-0 top-0">Court {number}</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        <Player />
        <Player />
        <Player />
        <Player />
      </div>
    </div>
  )
}

export default Court