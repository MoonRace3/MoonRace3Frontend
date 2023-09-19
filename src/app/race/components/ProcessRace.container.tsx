'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@nextui-org/skeleton'
// import { WaitingRaceComponent } from './WaitingRace.component'
import { CreateRaceConfigStepsContainer } from './CreateRaceConfigSteps/CreateRaceConfigSteps.container'

export const ProcessRaceContainer = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <Skeleton className="rounded-lg w-full h-unit-7xl" />
  }

  return (
    <>
      <CreateRaceConfigStepsContainer />
    </>
  )
}
