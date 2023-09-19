'use client'

import { FC } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Chip, RadioGroup } from '@nextui-org/react'
import { CustomRadio } from '@/components/ui/CustomRadio'
import { distanceOptions } from '../constants'
import { FormDataRace } from '@/types/race'
import { useBackButtonListener } from '@/hooks/useBackButtonListener'

interface Props {
  initialData: number | null
  onNext: () => void
  onPrev: () => void
  handleChangeForm: (field: keyof FormDataRace, value: string | number) => void
}

export const Steps3Distance: FC<Props> = ({
  initialData,
  onNext,
  onPrev,
  handleChangeForm,
}) => {
  useBackButtonListener(() => onPrev())

  const validationSchema = yup.object({
    distance: yup.number().required('Please choose a distance'),
  })

  const formik = useFormik({
    initialValues: {
      distance: initialData,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      onNext()
    },
  })

  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik

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
          value={values?.distance?.toString() ?? ''}
        >
          {distanceOptions.map((option, idx) => {
            return (
              <CustomRadio
                key={option.distance}
                value={option.distance.toString()}
                onClick={() => {
                  setFieldValue('distance', option.distance)
                  handleChangeForm('distance', option.distance)
                }}
              >
                <div className="flex flex-col justify-center gap-0">
                  <p className="font-medium">
                    {option.distance}{' '}
                    <span className="font-light text-xs">meters</span>
                  </p>
                  <p className="font-medium text-xs text-gray-500">
                    {option.time}{' '}
                    <span className="font-light text-xs">(minutes)</span>
                  </p>
                </div>
              </CustomRadio>
            )
          })}
        </RadioGroup>
        {touched.distance && errors.distance && (
          <Chip color="danger" radius={'sm'}>
            {errors.distance}
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
