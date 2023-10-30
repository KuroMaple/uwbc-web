import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../interfaces/DraggableTypes';
import IPlayer, { Positions } from '../interfaces/IPlayer';
import Player from './Player/Player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/redux/store';
import { movePlayer } from '../../app/redux/courtSlice';

const Challenge = () => {
  const challengePlayers = useSelector((state: RootState) =>
    state.players.players.filter(
      (player: IPlayer) => player.position === Positions.Challenge,
    ),
  );
  const dispatch = useDispatch();

  //React dnd Recieve player logic
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: any) =>
      dispatch(
        movePlayer({
          newPosition: Positions.Challenge,
          movedPlayerId: item.id,
        }),
      ),
    collect: (monitor) => ({
      // Use is over to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }),
  }));

  return (
    <div
      className="flex w-1/3 flex-col place-items-center bg-yellow-600 p-10"
      ref={drop}
    >
      <h2>Challenge Queue</h2>
      <div className="flex w-full flex-col">
        {challengePlayers.map((player) => {
          return <Player key={player.id} player={player} />;
        })}
      </div>
    </div>
  );
};

export default Challenge;
