'use client'

import { Features } from '@/config'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Powerful Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Features.map((feature, index) => (
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

export default FeaturesSection;