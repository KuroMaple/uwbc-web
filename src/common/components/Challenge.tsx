import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../interfaces/DraggableTypes'
import { useDispatch, useSelector } from 'react-redux'
import { addToChallenge } from '../../app/playersSlice'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import { RootState } from '../../app/store'
import Player from './Player/Player'
import { genPlayer } from './Player/playerGen'


const Challenge = () => {
  //Players that are in Challenge
  const challengePlayers = useSelector((state: RootState) => state.players.players.filter((player: IPlayer) => player.position === 'challenge'))
  
  //Redux updater
  const dispatch = useDispatch()


  
  // Dropping Logic for React DnD
  const [{  item, isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: () => console.log('Item Dropped in challenge'), // Debugging
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem()
    }),
  }), [])


  
  return (
    <div className="flex w-1/3 flex-col place-items-center bg-yellow-600 p-10" 
    ref={drop}>
      <h2>Challenge Queue</h2>
      <div className="flex w-full flex-col">

      </div>  
    </div>
  )
}

export default Challenge
