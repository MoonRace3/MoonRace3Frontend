import Header from '@/components/Header/Header'
import { ProcessRaceContainer } from './components/ProcessRace.container'

export default function Race() {
  return (
    <main className="flex min-h-screen flex-col items-center text-">
      <Header />
      <div className="container max-w-screen-md mt-16 flex justify-center">
        <ProcessRaceContainer />
      </div>
    </main>
  )
}
