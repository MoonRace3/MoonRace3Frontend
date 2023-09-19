'use client'

import { FC } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Chip, RadioGroup } from '@nextui-org/react'
import { CustomRadio } from '@/components/ui/CustomRadio'
import { racingCarsOptions } from '../constants'
import { FormDataRace, RacingCar } from '@/types/race'
import Image from 'next/image'
import { useBackButtonListener } from '@/hooks/useBackButtonListener'

interface Props {
  initialData: RacingCar | null
  onNext: () => void
  onPrev: () => void
  handleChangeForm: (field: keyof FormDataRace, value: string | number) => void
}

export const Steps4Car: FC<Props> = ({
  initialData,
  onNext,
  onPrev,
  handleChangeForm,
}) => {
  useBackButtonListener(() => onPrev())

  const validationSchema = yup.object({
    car: yup.string().required('Please choose a car'),
  })

  const formik = useFormik({
    initialValues: {
      car: initialData,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      onNext()
    },
  })

  const { values, touched, errors, handleSubmit, setFieldValue } = formik

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 w-full"
      >
        <RadioGroup
          label={'Variants'}
          orientation={'horizontal'}
          className="w-full items-center"
          value={values?.car?.toString() ?? ''}
        >
          {racingCarsOptions.map((option, idx) => {
            return (
              <CustomRadio
                key={option.name}
                value={option.name.toString()}
                onClick={() => {
                  setFieldValue('car', option.name)
                  handleChangeForm('car', option.name)
                }}
              >
                <div className="flex flex-col justify-center gap-2">
                  <p className="font-medium">{option.name} </p>
                  <Image
                    src={option.imageUrl || ''}
                    alt="race-car"
                    width={100}
                    height={64}
                    className="rounded-lg min-h-unit-16"
                  />
                  <p className="font-medium text-xs text-gray-500">
                    Acceleration:{' '}
                    <span className="font-light text-xs">
                      {option.acceleration}
                    </span>
                  </p>
                  <p className="font-medium text-xs text-gray-500">
                    Speed:{' '}
                    <span className="font-light text-xs">{option.speed}</span>
                  </p>
                </div>
              </CustomRadio>
            )
          })}
        </RadioGroup>
        {touched.car && errors.car && (
          <Chip color="danger" radius={'sm'}>
            {errors.car}
          </Chip>
        )}
        <div className="flex justify-between w-full max-w-lg mt-10">
          <Button color="primary" variant="ghost" size="lg" onClick={onPrev}>
            Prev
          </Button>
          <Button color="primary" variant="ghost" size="lg" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}
