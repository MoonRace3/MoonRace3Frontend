'use client'

import { FC, ReactNode } from 'react'
import { Progress } from '@nextui-org/react'

interface Props {
  label: string
  percentage: number
  children: ReactNode
}

export const CreateRaceConfigStepsComponent: FC<Props> = ({
  label,
  percentage,
  children,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Progress
        label={label}
        size="lg"
        value={percentage}
        maxValue={100}
        showValueLabel={true}
        className="max-w-lg"
      />
      {children}
    </div>
  )
}
