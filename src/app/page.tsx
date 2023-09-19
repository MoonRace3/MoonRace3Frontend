import Header from '@/components/Header/Header'
import { TopBlock } from '@/app/components/TopBlock'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <TopBlock />
    </main>
  )
}
