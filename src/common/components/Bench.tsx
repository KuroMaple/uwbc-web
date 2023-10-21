import React from 'react'
import Player from './Player';

const Bench = () => {
  return (
    <div className="flex w-1/3 flex-col place-items-center">
      <h1>Bench</h1>
      <Player />
      <Player />
      <Player />
    </div>
  );
}

export default Bench