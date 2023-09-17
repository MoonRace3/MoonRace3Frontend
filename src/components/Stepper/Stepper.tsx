'use client'

import React from 'react'

type StepProps = {
  label: string
  isActive: boolean
  isCompleted: boolean
}

const Step: React.FC<StepProps> = ({ label, isActive, isCompleted }) => (
  <div className="flex items-center">
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full ${
        isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
      }`}
    >
      {isCompleted ? '✓' : label}
    </div>
    <div className="flex-1 h-1 bg-gray-200 ml-2"></div>
  </div>
)

type StepperProps = {
  steps: string[]
  activeStep: number
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="flex">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            label={step}
            isActive={index === activeStep}
            isCompleted={index < activeStep}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stepper
