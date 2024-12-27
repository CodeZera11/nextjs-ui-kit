import { Metadata } from 'next'
import CTA from '@/components/landing-page/cta'
import Hero from '@/components/landing-page/hero-section'
import Features from '@/components/landing-page/features-section'
import TechStackSection from '@/components/landing-page/stack-section'

export const metadata: Metadata = {
  title: 'nextjs-ui-kit | The Ultimate Next.js 15 Starter Kit',
  description: 'A powerful starter kit featuring Next.js 15, Framer Motion, NextAuth, Tailwind CSS, shadcn/ui, and React Query.',
}

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Hero />
      <Features />
      <TechStackSection />
      <CTA />
    </div>
  )
}

export default LandingPage;