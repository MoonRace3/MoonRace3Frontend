import { addMinutes, format } from 'date-fns'
import { ethString } from '@/types/general'

export const toFixedSafe = (value: number, count?: number): number | string => {
  try {
    return Number((value + Number.EPSILON).toFixed(count || 6)).toString()
  } catch (e) {
    return value
  }
}

export const toFloorSafe = (
  value: number | string | undefined | null
): number | string => {
  if (value === undefined || value === null) return ''

  try {
    return Number(Math.floor(Number(value) * 100) / 100).toString()
  } catch (e) {
    return value
  }
}

export function formatValue(
  value: number | string | undefined,
  decimals = 0,
  count?: number
) {
  if (value === undefined) return ''

  try {
    const parts = (+toFixedSafe(Number(value) / Math.pow(10, decimals), count))
      .toString()
      .split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  } catch (e) {
    return value
  }
}

export const formatValueWithToFixed = (
  value: number | string | undefined,
  count = 2
): string | number => {
  if (value === 0) {
    return value
  }

  if (!value) return ''

  let transformedValue = value

  if (typeof value === 'string') {
    transformedValue = Number(value)
  }

  try {
    const parts = toFixedSafe(transformedValue as number, count)
      .toString()
      .split('.')

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  } catch (e) {
    return value
  }
}

export function formatDate(
  dateProp?: string | Date | number,
  formatDate = 'MM/dd/yyyy'
) {
  if (!dateProp) {
    return ''
  }

  const date = new Date(dateProp)
  return format(addMinutes(date, date.getTimezoneOffset()), formatDate)
}

export function formatDateTime(date: number | Date | undefined): Date {
  if (typeof date === 'undefined') {
    return new Date(0)
  }

  if (typeof date === 'number') {
    return new Date(Number(date + '000'))
  }

  return date
}

export function toNumberSafe(
  value: number | string | undefined | null
): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const transformedValue = Number(value)
    if (isNaN(transformedValue)) {
      return 0
    }

    return transformedValue
  }

  return 0
}

export function formatNumberToDateFormat(value: number) {
  if (value === 0) {
    return '00'
  }

  if (value < 10) {
    return `0${value}`
  }

  return value
}

export const toTitleCase = (input: string): string => {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .split(/[^a-zA-Z0-9]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const formatterUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const uuidToBytes23 = (
  input: string,
  searchValue = '-',
  replaceValue = ''
): ethString =>
  `0x00000000000000000000000000000000${input.replaceAll(
    searchValue,
    replaceValue
  )}`

export const convertToBaseUnit = (
  input: string | number,
  decimals = 18
): number => {
  const value = typeof input === 'number' ? input : Number(input)

  return value * 10 ** decimals
}

export const convertFromBaseUnit = (
  input: string | number,
  decimals = 18
): number => {
  const value = typeof input === 'number' ? input : Number(input)

  return value / 10 ** decimals
}
