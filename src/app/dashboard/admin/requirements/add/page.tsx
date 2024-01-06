'use client'

import React from 'react'
import RequirementsForm from '../_form/requirement-form'
import { useCreateRequirementMutation } from '@/data/hooks/useRequirementsClient'

const Page = () => {
  const { isPending: isLoading, mutate: createRequirement } = useCreateRequirementMutation()

  return <RequirementsForm isLoading={isLoading} mutate={createRequirement} />
}

export default Page
