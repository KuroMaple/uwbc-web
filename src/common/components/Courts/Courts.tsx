import React from 'react'
import Court from './Court'

const Courts = () => {
  return (
    <div className="h-full w-full bg-fuchsia-300 p-2">
      <h1 className="font-bold">Courts</h1>
      <div className="grid w-full grid-cols-2 gap-4 h-5/6">
        <Court number="1" />
        <Court number="2" />
        <Court number="3" />
        <Court number="4" />
        <Court number="5" />
        <Court number="6" />
        <Court number="7" />
        <Court number="8" />
      </div>
    </div>
  )
}

export default Courts