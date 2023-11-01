import { useDispatch } from 'react-redux';
import IPlayer, { Positions } from '../../interfaces/IPlayer';
import { addPlayer } from '../../../app/redux/courtSlice';

const testNames = [
  'Josh Jones',
  'Bobby Wu',
  'Jackie Chan',
  'Dwayne the Rock Johnson',
  'Jeff Lai',
];

const generateUniqueId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];

  // Generate a random number between 1 and 99, and pad it with leading zeros if necessary
  const randomNumber = Math.floor(Math.random() * 99) + 1;
  const paddedNumber = randomNumber.toString().padStart(2, '0');

  // Combine the random letter and padded number to form the UID
  const uid = `${randomLetter}${paddedNumber}`;

  return uid;
};

const myRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const genPlayer = (position: Positions) => {
  const newPlayer: IPlayer = {
    name: testNames[myRandom(0, 4)],
    id: generateUniqueId(),
    level: myRandom(1, 5),
    position: position,
  };

  return newPlayer;
};
