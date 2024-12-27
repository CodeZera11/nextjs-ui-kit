import Link from 'next/link'
import AnimatedLogo from './animated-logo'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { PageRoutes } from '@/constants/page-routes'
import { WebConfig } from '@/config'

const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen text-center">
      <AnimatedLogo />
      <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
        The Ultimate Next.js 15 Starter Kit
      </h1>
      <p className="mt-4 text-xl sm:text-2xl text-gray-300 max-w-3xl">
        Jumpstart your Next.js projects with a powerful combination of cutting-edge technologies
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href={PageRoutes.SIGNIN}>
            Let's Explore
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={WebConfig.REPO_LINK} target='_blank' rel='no_follow'>
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> View on GitHub
          </Link>
        </Button>
      </div>
    </section>
  )
}


export default Hero;