'use client'

import { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Chip, Select, SelectItem } from '@nextui-org/react'
import { assetOptions } from '../constants'
import { Tokens } from '@/constants/tokens'
import Image from 'next/image'
import { FormDataRace } from '@/types/race'
import { useBackButtonListener } from '@/hooks/useBackButtonListener'

interface Props {
  initialData: Tokens | null
  onNext: () => void
  onPrev: () => void
  isLoading: boolean
  handleChangeForm: (field: keyof FormDataRace, value: string | number) => void
}

export const Steps5Asset: FC<Props> = ({
  initialData,
  onNext,
  onPrev,
  isLoading,
  handleChangeForm,
}) => {
  useBackButtonListener(() => onPrev())

  const validationSchema = yup.object({
    from: yup.string().required('Please choose a asset'),
    to: yup.string().required('Please choose a asset'),
  })

  const formik = useFormik({
    initialValues: {
      from: initialData || '',
      to: Tokens.USDT,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      onNext()
    },
  })

  useEffect(() => {
    handleChangeForm('to', Tokens.USDT)
  }, [])

  const { values, touched, errors, handleSubmit, setFieldValue } = formik

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 w-full"
      >
        <div className="flex items-center justify-center gap-4 w-full">
          <Select
            selectedKeys={!!values.from ? new Set([values.from]) : new Set([])}
            onChange={(value) => {
              setFieldValue('from', value.target.value)
              handleChangeForm('from', value.target.value)
            }}
            items={assetOptions}
            label="Selected to"
            isDisabled={isLoading}
            className="max-w-xs"
            variant="bordered"
            classNames={{
              label: 'group-data-[filled=true]:-translate-y-5',
              trigger: 'min-h-unit-16',
              listboxWrapper: 'max-h-[400px]',
            }}
            listboxProps={{
              itemClasses: {
                base: [
                  'rounded-md',
                  'text-default-500',
                  'transition-opacity',
                  'data-[hover=true]:text-foreground',
                  'data-[hover=true]:bg-default-100',
                  'dark:data-[hover=true]:bg-default-50',
                  'data-[selectable=true]:focus:bg-default-50',
                  'data-[pressed=true]:opacity-70',
                  'data-[focus-visible=true]:ring-default-500',
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: 'p-0 border-small border-divider bg-background',
                arrow: 'bg-default-200',
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div
                  key={item?.data?.value}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={item?.data?.imageUrl || ''}
                    alt={item?.data?.value || ''}
                    width={16}
                    height={16}
                  />
                  <span>{item?.data?.value}</span>
                </div>
              ))
            }}
          >
            {(token) => (
              <SelectItem
                key={token.value}
                textValue={token.value}
                value={token.value}
                defaultValue={token.value}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={token?.imageUrl || ''}
                    alt={token?.value || ''}
                    width={16}
                    height={16}
                  />
                  <span>{token?.value}</span>
                </div>
              </SelectItem>
            )}
          </Select>
          <div className="flex items-center gap-2">
            /{' '}
            <Image
              src={'/tokens/usdt.svg'}
              alt={values.to}
              width={16}
              height={16}
            />
            <span>{values.to}</span>
          </div>
        </div>
        {touched.from && errors.from && (
          <Chip color="danger" radius={'sm'}>
            {errors.from}
          </Chip>
        )}
        <div className="flex justify-between w-full max-w-lg mt-10">
          <Button
            color="primary"
            variant="ghost"
            size="lg"
            onClick={onPrev}
            isDisabled={isLoading}
          >
            Prev
          </Button>
          <Button
            color="success"
            variant="bordered"
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
