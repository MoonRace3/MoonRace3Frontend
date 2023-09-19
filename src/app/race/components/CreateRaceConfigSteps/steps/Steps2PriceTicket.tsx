'use client'

import { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Chip, RadioGroup } from '@nextui-org/react'
import { CustomRadio } from '@/components/ui/CustomRadio'
import { priceOptions } from '@/app/race/components/CreateRaceConfigSteps/constants'
import { formatterUSD } from '@/utils/formatValue'
import { FormDataRace } from '@/types/race'
import { useBackButtonListener } from '@/hooks/useBackButtonListener'

interface Props {
  initialData: number | null
  onNext: () => void
  onPrev: () => void
  handleChangeForm: (field: keyof FormDataRace, value: string | number) => void
}

export const Steps2PriceTicket: FC<Props> = ({
  initialData,
  onNext,
  onPrev,
  handleChangeForm,
}) => {
  useBackButtonListener(() => onPrev())

  const validationSchema = yup.object({
    price: yup.number().required('Please choose a ticket price'),
  })

  const formik = useFormik({
    initialValues: {
      price: initialData,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
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
          value={values?.price?.toString() ?? ''}
        >
          {priceOptions.map((option, idx) => {
            return (
              <CustomRadio
                key={option}
                value={option.toString()}
                onClick={() => {
                  setFieldValue('price', option)
                  handleChangeForm('price', option)
                }}
              >
                <div className="flex flex-col items-center justify-center gap-0">
                  {formatterUSD.format(option)}
                </div>
              </CustomRadio>
            )
          })}
        </RadioGroup>
        {touched.price && errors.price && (
          <Chip color="danger" radius={'sm'}>
            {errors.price}
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
