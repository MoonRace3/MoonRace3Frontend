import { FormDataRace } from '@/types/race'

export const getPercentageProcessRace = (
  form: Partial<FormDataRace> = {}
): number => {
  let percentage = 0

  if (form?.nickname && form?.nickname.length > 1) {
    percentage += 20
  }

  if (!!form?.price) {
    percentage += 20
  }

  if (!!form?.distance) {
    percentage += 20
  }

  if (!!form?.car) {
    percentage += 20
  }

  if (!!form?.from) {
    percentage += 20
  }

  return percentage
}
