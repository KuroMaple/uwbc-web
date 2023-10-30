import { createSlice } from '@reduxjs/toolkit'
import IPlayer from '../../common/interfaces/IPlayer'

interface BenchState {
  players: IPlayer[]
}

const initialState: BenchState = {
  players: [],
}

const benchSlice = createSlice({
  name: 'bench',
  initialState:
})