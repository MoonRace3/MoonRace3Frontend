import { CarData, DistanceData, RacingCar } from '@/types/race'
import { Tokens } from '@/constants/tokens'

export enum RaceConfigStepValues {
  Nickname = 'Nickname',
  Ticket = 'Ticket',
  Distance = 'Distance',
  Car = 'Car',
  Asset = 'Asset',
}

export const priceOptions = [1, 5, 10, 50, 100]

export const distanceOptions: Array<DistanceData> = [
  {
    distance: 500,
    time: 2,
  },
  {
    distance: 1500,
    time: 4,
  },
  {
    distance: 3000,
    time: 7,
  },
]

export const racingCarsOptions: Array<CarData> = [
  {
    name: RacingCar.StreetCar,
    acceleration: 1,
    speed: 100,
    imageUrl: '/cars/street.png',
  },
  {
    name: RacingCar.SuperCar,
    acceleration: 1.5,
    speed: 200,
    imageUrl: '/cars/super.png',
  },
  {
    name: RacingCar.HyperCar,
    acceleration: 2,
    speed: 250,
    imageUrl: '/cars/hyper.png',
  },
]

export const assetOptions = [
  {
    label: Tokens.BTC,
    value: Tokens.BTC,
    imageUrl: '/tokens/btc.svg',
  },
  {
    label: Tokens.ETH,
    value: Tokens.ETH,
    imageUrl: '/tokens/eth.svg',
  },
  {
    label: Tokens.MATIC,
    value: Tokens.MATIC,
    imageUrl: '/tokens/matic.svg',
  },
  {
    label: Tokens.DOGE,
    value: Tokens.DOGE,
    imageUrl: '/tokens/doge.svg',
  },
  {
    label: Tokens.XRP,
    value: Tokens.XRP,
    imageUrl: '/tokens/xrp.svg',
  },
]
