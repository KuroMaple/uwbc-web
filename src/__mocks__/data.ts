import { Positions } from '../common/interfaces/IPlayer'
import { IMember } from '../services/interfaces/IMember'


export const gymState = {
  sessionId: 123,
  benchPlayers: [
    {
      id: 1,
      sessionID: 123,
      position: Positions.Bench,
      isBeingChallenged: false,
      isChallenging: false,
      numRotationsOff: 2,
      isMGO: false,
      name: 'Alice',
      level: 5,
      ticks: 0,
    },
    {
      id: 2,
      sessionID: 123,
      position: Positions.Bench,
      isBeingChallenged: false,
      isChallenging: false,
      numRotationsOff: 1,
      isMGO: false,
      name: 'Bob',
      level: 4,
      ticks: 0,
    },
  ],
  challengePlayers: [
    {
      id: 3,
      sessionID: 123,
      position: Positions.Challenge,
      isBeingChallenged: false,
      isChallenging: true,
      numRotationsOff: 0,
      isMGO: false,
      name: 'Charlie',
      level: 6,
      ticks: 1,
    },
  ],
  court1: {
    challengePlayerId: null,
    players: [
      {
        id: 4,
        sessionID: 123,
        position: Positions.Court1,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'David',
        level: 7,
        ticks: 0,
      },
      {
        id: 5,
        sessionID: 123,
        position: Positions.Court1,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Eve',
        level: 5,
        ticks: 0,
      },
    ],
  },
  court2: {
    challengePlayerId: null,
    players: [
      {
        id: 6,
        sessionID: 123,
        position: Positions.Court2,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Frank',
        level: 8,
        ticks: 0,
      },
      {
        id: 7,
        sessionID: 123,
        position: Positions.Court2,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Grace',
        level: 4,
        ticks: 0,
      },
    ],
  },
  court3: {
    challengePlayerId: null,
    players: [
      {
        id: 8,
        sessionID: 123,
        position: Positions.Court3,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Hank',
        level: 5,
        ticks: 0,
      },
      {
        id: 9,
        sessionID: 123,
        position: Positions.Court3,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Ivy',
        level: 3,
        ticks: 0,
      },
    ],
  },
  court4: {
    challengePlayerId: null,
    players: [
      {
        id: 10,
        sessionID: 123,
        position: Positions.Court4,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Jack',
        level: 6,
        ticks: 0,
      },
      {
        id: 11,
        sessionID: 123,
        position: Positions.Court4,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Kara',
        level: 5,
        ticks: 0,
      },
    ],
  },
  court5: {
    challengePlayerId: null,
    players: [
      {
        id: 12,
        sessionID: 123,
        position: Positions.Court5,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Liam',
        level: 7,
        ticks: 0,
      },
      {
        id: 13,
        sessionID: 123,
        position: Positions.Court5,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Mia',
        level: 4,
        ticks: 0,
      },
    ],
  },
  court6: {
    challengePlayerId: null,
    players: [
      {
        id: 14,
        sessionID: 123,
        position: Positions.Court6,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Noah',
        level: 6,
        ticks: 0,
      },
      {
        id: 15,
        sessionID: 123,
        position: Positions.Court6,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Olivia',
        level: 5,
        ticks: 0,
      },
    ],
  },
  court7: {
    challengePlayerId: null,
    players: [
      {
        id: 16,
        sessionID: 123,
        position: Positions.Court7,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Paul',
        level: 8,
        ticks: 0,
      },
      {
        id: 17,
        sessionID: 123,
        position: Positions.Court7,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Quinn',
        level: 6,
        ticks: 0,
      },
    ],
  },
  court8: {
    challengePlayerId: null,
    players: [
      {
        id: 18,
        sessionID: 123,
        position: Positions.Court8,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Rita',
        level: 7,
        ticks: 0,
      },
      {
        id: 19,
        sessionID: 123,
        position: Positions.Court8,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        name: 'Steve',
        level: 5,
        ticks: 0,
      },
    ],
  },
}



export const memberList: IMember[] = [
  {
    level: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com'
  },
  {
    level: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com'
  },
  {
    level: 3,
    first_name: 'Robert',
    last_name: 'Brown',
    email: 'robert.brown@example.com'
  },
  {
    level: 4,
    first_name: 'Emily',
    last_name: 'Davis',
    email: 'emily.davis@example.com'
  },
  {
    level: 5,
    first_name: 'Michael',
    last_name: 'Miller',
    email: 'michael.miller@example.com'
  },
  {
    level: 6,
    first_name: 'Jessica',
    last_name: 'Wilson',
    email: 'jessica.wilson@example.com'
  },
  {
    level: 7,
    first_name: 'David',
    last_name: 'Moore',
    email: 'david.moore@example.com'
  },
  {
    level: 8,
    first_name: 'Sarah',
    last_name: 'Taylor',
    email: 'sarah.taylor@example.com'
  },
  {
    level: 9,
    first_name: 'Daniel',
    last_name: 'Anderson',
    email: 'daniel.anderson@example.com'
  },
  {
    level: 10,
    first_name: 'Laura',
    last_name: 'Thomas',
    email: 'laura.thomas@example.com'
  }
]

