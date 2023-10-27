import React from 'react'
import Court from './Court'

const Courts = () => {
  return (
    <div className="h-full w-full bg-fuchsia-300 p-2">
      <h1 className="font-bold">Courts</h1>
      <div className="grid w-full grid-cols-2 gap-4 h-5/6">
        <Court courtNumber="1" />
        {/* <Court courtNumber="2" />
        <Court courtNumber="3" />
        <Court courtNumber="4" />
        <Court courtNumber="5" />
        <Court courtNumber="6" />
        <Court courtNumber="7" />
        <Court courtNumber="8" /> */}
      </div>
    </div>
  )
}

export default Courts