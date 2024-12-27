'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Layers, Zap, Lock, Palette, Package, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Next.js 15',
    description: 'Leverage the latest features of Next.js for optimal performance and developer experience.'
  },
  {
    icon: Zap,
    title: 'Framer Motion',
    description: 'Create stunning animations with ease using Framer Motion.'
  },
  {
    icon: Lock,
    title: 'NextAuth',
    description: 'Implement secure, customizable authentication with NextAuth.'
  },
  {
    icon: Palette,
    title: 'Tailwind CSS',
    description: 'Rapidly build custom user interfaces with the utility-first CSS framework.'
  },
  {
    icon: Package,
    title: 'shadcn/ui',
    description: 'Beautiful, accessible, and customizable UI components built with Radix UI and Tailwind CSS.'
  },
  {
    icon: RefreshCw,
    title: 'React Query',
    description: 'Fetch, cache, and update data in your React applications without touching any global state.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Powerful Features</h2>
      <div className="grid grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700  h-full">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className='text-white'>{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

