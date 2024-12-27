'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Layers, Zap, Lock, Palette, Package, RefreshCw } from 'lucide-react'

const techStack = [
  { name: 'Next.js 15', description: 'The latest version of the React framework' },
  { name: 'Framer Motion', description: 'Powerful animation library for React' },
  { name: 'NextAuth', description: 'Authentication for Next.js applications' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  { name: 'shadcn/ui', description: 'High-quality React components' },
  { name: 'React Query', description: 'Data fetching and state management' },
]

const TechStackSection = () => {

  return (
    <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Powerful Tech Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-content-stretch">
        {techStack.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className='text-white'>{item.name}</CardTitle>
                <CardDescription className="text-gray-400">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default TechStackSection;