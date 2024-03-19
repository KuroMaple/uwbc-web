
// import IPlayer, { Positions } from '../../interfaces/IPlayer'

// NOTE: This is a test file and is not used in the application
// The file is deprecated and is kept for reference purposes only
// Randomly generate a player with a name, id, level, position, and ticks

// const testNames = [
//   'Josh Jones',
//   'Bobby Wu',
//   'Jackie Chan',
//   'Dwayne The Rock Johnson',
//   'Jeff Lai',
// ]

// const generateUniqueId = () => {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   const randomLetter = letters[Math.floor(Math.random() * letters.length)]

//   // Generate a random number between 1 and 99, and pad it with leading zeros if necessary
//   const randomNumber = Math.floor(Math.random() * 99) + 1
//   const paddedNumber = randomNumber.toString().padStart(2, '0')

//   // Combine the random letter and padded number to form the UID
//   const uid = `${randomLetter}${paddedNumber}`

//   return uid
// }

// const myRandom = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// export const genPlayer = (position: Positions) => {
//   const newPlayer: IPlayer = {
//     name: testNames[myRandom(0, 4)],
//     id: generateUniqueId(),
//     level: myRandom(1, 5),
//     position: position,
//     ticks: Math.floor(Math.random() * 100) + 1,
//     isMustGoOn: false,
//     isChallenger: false,
//   }

//   return newPlayer
// }
