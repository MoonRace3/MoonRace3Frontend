'use client'

import { Progress } from '@nextui-org/react'

export const WaitingRaceComponent = () => {
  return (
    <div className="flex flex-col items-center ">
      <h2 className="font-bold mb-4">Waiting for other players...</h2>
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>
  )
}
