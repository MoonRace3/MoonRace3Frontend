'use client'

import { useEffect, useState } from 'react'
import { RaceConfigStepValues } from './constants'
import { FormDataRace } from '@/types/race'
import { CreateRaceConfigStepsComponent } from './CreateRaceConfigSteps.component'
import { Steps1Nickname } from './steps/Steps1Nickname'
import { Steps2PriceTicket } from './steps/Steps2PriceTicket'
import { Steps3Distance } from './steps/Steps3Distance'
import { Steps4Car } from './steps/Steps4Car'
import { Steps5Asset } from '@/app/race/components/CreateRaceConfigSteps/steps/Steps5Asset'
import { getPercentageProcessRace } from '@/app/race/components/CreateRaceConfigSteps/utils'

export const CreateRaceConfigStepsContainer = () => {
  const [step, setStep] = useState(RaceConfigStepValues.Nickname)
  const [form, setForm] = useState<Partial<FormDataRace>>({})
  const [percentage, setPercentage] = useState(0)

  const handleChangeForm = (
    field: keyof FormDataRace,
    value: string | number
  ) => {
    setForm((prevState) => {
      if (!prevState) {
        return { [field]: value } as Partial<FormDataRace>
      }
      return { ...prevState, [field]: value }
    })
  }
  console.log('form', form)
  useEffect(() => {
    const percentage = getPercentageProcessRace(form)
    setPercentage(percentage)
  }, [form])

  return (
    <CreateRaceConfigStepsComponent label={step} percentage={percentage}>
      <>
        {step === RaceConfigStepValues.Nickname && (
          <Steps1Nickname
            initialData={form?.nickname || ''}
            onNext={() => setStep(RaceConfigStepValues.Ticket)}
            handleChangeForm={handleChangeForm}
          />
        )}
        {step === RaceConfigStepValues.Ticket && (
          <Steps2PriceTicket
            initialData={form?.price || null}
            onNext={() => setStep(RaceConfigStepValues.Distance)}
            onPrev={() => setStep(RaceConfigStepValues.Nickname)}
            handleChangeForm={handleChangeForm}
          />
        )}
        {step === RaceConfigStepValues.Distance && (
          <Steps3Distance
            initialData={form?.distance || null}
            onNext={() => setStep(RaceConfigStepValues.Car)}
            onPrev={() => setStep(RaceConfigStepValues.Ticket)}
            handleChangeForm={handleChangeForm}
          />
        )}
        {step === RaceConfigStepValues.Car && (
          <Steps4Car
            initialData={form?.car || null}
            onNext={() => setStep(RaceConfigStepValues.Asset)}
            onPrev={() => setStep(RaceConfigStepValues.Distance)}
            handleChangeForm={handleChangeForm}
          />
        )}
        {step === RaceConfigStepValues.Asset && (
          <Steps5Asset
            initialData={form?.from || null}
            onNext={() => {
              console.log('submit')
            }}
            onPrev={() => setStep(RaceConfigStepValues.Car)}
            isLoading={false}
            handleChangeForm={handleChangeForm}
          />
        )}
      </>
    </CreateRaceConfigStepsComponent>
  )
}
