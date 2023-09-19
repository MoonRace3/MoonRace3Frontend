import { Tokens } from '@/constants/tokens'

export interface FormDataRace {
  nickname: string
  price: number
  distance: number
  car: RacingCar
  from: Tokens
  to: Tokens
}

export interface DistanceData {
  distance: number
  time: number
}

export interface CarData {
  name: RacingCar
  acceleration: number
  speed: number
  imageUrl?: string
}

export enum RacingCar {
  StreetCar = 'StreetCar',
  SuperCar = 'SuperCar',
  HyperCar = 'HyperCar',
}
