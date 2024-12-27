import CTASection from '@/components/landing-page/cta'
import HeroSection from '@/components/landing-page/hero-section'
import TechStackSection from '@/components/landing-page/stack-section'
import FeaturesSection from '@/components/landing-page/features-section'

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <CTASection />
    </div>
  )
}

export default LandingPage;