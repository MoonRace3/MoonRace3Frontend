'use client'

import { FC } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Input } from '@nextui-org/react'
import { FormDataRace } from '@/types/race'

interface Props {
  initialData: string
  onNext: () => void
  handleChangeForm: (field: keyof FormDataRace, value: string | number) => void
}

export const Steps1Nickname: FC<Props> = ({
  initialData,
  onNext,
  handleChangeForm,
}) => {
  const validationSchema = yup.object({
    nickname: yup.string().min(2).max(50).required('Nickname is required'),
  })

  const formik = useFormik({
    initialValues: {
      nickname: initialData,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      onNext()
    },
  })

  const { values, handleChange, touched, errors, handleSubmit } = formik

  return (
    <div className="flex flex-col items-center w-full max-w-sm mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full"
      >
        <Input
          size="lg"
          type="text"
          label="Nickname"
          id="nickname"
          name="nickname"
          variant="faded"
          value={values.nickname}
          onChange={(e) => {
            handleChangeForm('nickname', e.target.value)
            handleChange(e)
          }}
          color={
            touched.nickname && Boolean(errors.nickname) ? 'danger' : 'default'
          }
          errorMessage={touched.nickname && errors.nickname}
        />
        <Button color="primary" variant="ghost" size="lg" type="submit">
          Next
        </Button>
      </form>
    </div>
  )
}
