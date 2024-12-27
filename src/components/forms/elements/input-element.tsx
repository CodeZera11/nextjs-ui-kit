"use client"

import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Eye, EyeClosed, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label?: string
  description?: string
  placeholder?: string
  type?: string
  className?: string
  isDisabled?: boolean
  inputClassName?: string
}

const InputElement = ({ name, label, description, placeholder, isDisabled = false, className, type = "text", inputClassName }: Props) => {
  const { control } = useFormContext()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                type={type === 'password' && isPasswordVisible ? 'text' : type}
                placeholder={placeholder}
                disabled={isDisabled}
                className={cn('', inputClassName)}
              />
              {type === 'password' && (
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 h-fit w-fit"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ?
                    <EyeOff className="w-5 h-5" /> :
                    <Eye className="w-5 h-5" />
                  }
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputElement
