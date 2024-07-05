import { BasicIntro } from '@/components/BasicIntro'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <main className='overflow-hidden'>
      <Hero />
      <BasicIntro />
    </main>
  )
}
