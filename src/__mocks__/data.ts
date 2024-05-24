import { Positions } from '../common/interfaces/IPlayer'
import { IMember } from '../services/interfaces/IMember'


export const gymState = {
  sessionId: 123,
  benchPlayers: [
    {
      member: 1,
      session: 123,
      position: Positions.Bench,
      isBeingChallenged: false,
      isChallenging: false,
      numRotationsOff: 2,
      isMGO: false,
      memberName: 'Alice',
      memberLevel: 5,
    },
    {
      member: 2,
      session: 123,
      position: Positions.Bench,
      isBeingChallenged: false,
      isChallenging: false,
      numRotationsOff: 1,
      isMGO: false,
      memberName: 'Bob',
      memberLevel: 4,
    },
  ],
  challengePlayers: [
    {
      member: 3,
      session: 123,
      position: Positions.Challenge,
      isBeingChallenged: false,
      isChallenging: true,
      numRotationsOff: 0,
      isMGO: false,
      memberName: 'Charlie',
      memberLevel: 6,
    },
  ],
  court1: {
    challengePlayerId: null,
    players: [
      {
        member: 4,
        session: 123,
        position: Positions.Court1,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'David',
        memberLevel: 7,
      },
      {
        member: 5,
        session: 123,
        position: Positions.Court1,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Eve',
        memberLevel: 5,
      },
    ],
  },
  court2: {
    challengePlayerId: null,
    players: [
      {
        member: 6,
        session: 123,
        position: Positions.Court2,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Frank',
        memberLevel: 8,
      },
      {
        member: 7,
        session: 123,
        position: Positions.Court2,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Grace',
        memberLevel: 4,
      },
    ],
  },
  court3: {
    challengePlayerId: null,
    players: [
      {
        member: 8,
        session: 123,
        position: Positions.Court3,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Hank',
        memberLevel: 5,
      },
      {
        member: 9,
        session: 123,
        position: Positions.Court3,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Ivy',
        memberLevel: 3,
      },
    ],
  },
  court4: {
    challengePlayerId: null,
    players: [
      {
        member: 10,
        session: 123,
        position: Positions.Court4,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Jack',
        memberLevel: 6,
      },
      {
        member: 11,
        session: 123,
        position: Positions.Court4,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Kara',
        memberLevel: 5,
      },
    ],
  },
  court5: {
    challengePlayerId: null,
    players: [
      {
        member: 12,
        session: 123,
        position: Positions.Court5,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Liam',
        memberLevel: 7,
      },
      {
        member: 13,
        session: 123,
        position: Positions.Court5,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Mia',
        memberLevel: 4,
      },
    ],
  },
  court6: {
    challengePlayerId: null,
    players: [
      {
        member: 14,
        session: 123,
        position: Positions.Court6,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Noah',
        memberLevel: 6,
      },
      {
        member: 15,
        session: 123,
        position: Positions.Court6,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Olivia',
        memberLevel: 5,
      },
    ],
  },
  court7: {
    challengePlayerId: null,
    players: [
      {
        member: 16,
        session: 123,
        position: Positions.Court7,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Paul',
        memberLevel: 8,
      },
      {
        member: 17,
        session: 123,
        position: Positions.Court7,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Quinn',
        memberLevel: 6,
      },
    ],
  },
  court8: {
    challengePlayerId: null,
    players: [
      {
        member: 18,
        session: 123,
        position: Positions.Court8,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Rita',
        memberLevel: 7,
      },
      {
        member: 19,
        session: 123,
        position: Positions.Court8,
        isBeingChallenged: false,
        isChallenging: false,
        numRotationsOff: 0,
        isMGO: false,
        memberName: 'Steve',
        memberLevel: 5,
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

