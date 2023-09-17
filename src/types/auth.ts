import { SiweMessage } from 'siwe'

export interface LoginRequest {
  message: SiweMessage
  signature: string
}

export interface LoginResponse {
  token: string
}

export interface User {
  address: string
  activeGame: Game
}

export interface Game {
  wslink: string
}
