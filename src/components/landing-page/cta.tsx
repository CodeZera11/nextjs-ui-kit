import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WebConfig } from '@/config';

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Supercharge Your Next.js Development?</h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Get started with nextjs-ui-kit today and build amazing web applications faster than ever.
      </p>
      <Button asChild size="lg">
        <Link href={WebConfig.REPO_LINK}>
          Get Started Now
        </Link>
      </Button>
    </section>
  )
}

export default CTASection;