'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authClient } from '../clients/authClient'
import { toast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { ApiEndpoints } from '@/constants/api'
import { UserRoleEnum } from '@/constants/enums'

export function useSignUp() {
  const router = useRouter()
  return useMutation({
    mutationFn: authClient.signUp,
    onSuccess: (response: any) => {
      const { data } = response
      toast({
        variant: 'default',
        title: 'Account created successfully'
      })

      const { jwtToken, user } = data

      const { firstName, lastName, email, role, phoneNumber, forcePasswordChange } = user

      localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, jwtToken)
      const newUser = JSON.stringify({ firstName, lastName, email, role, phoneNumber, forcePasswordChange })
      localStorage.setItem(LocalStorageKeys.USER, newUser)

      if (role === UserRoleEnum.CASE_MANAGER || role === UserRoleEnum.SUPER_ADMIN) {
        router.push(PageRoutes.dashboard.admin.CLIENTS)
      }
    },
    onError: (error: any) => {
      console.log({ toastError: error })
      toast({
        variant: 'destructive',
        title: error.message,
        description: error.message
      })
    }
  })
}

export function useSignIn() {
  const router = useRouter()
  return useMutation({
    mutationFn: authClient.signIn,
    onSuccess: (response: any) => {
      const { data } = response
      toast({
        variant: 'default',
        title: 'Signed in successfully'
      })
      const { jwtToken, user } = data
      const { firstName, lastName, email, role, id, forcePasswordChange } = user
      localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, jwtToken)
      const newUser = JSON.stringify({ firstName, lastName, email, role, id, forcePasswordChange })
      localStorage.setItem(LocalStorageKeys.USER, newUser)
      if (role === UserRoleEnum.CLIENT) {
        router.push(PageRoutes.dashboard.CASES)
      } else {
        router.push(PageRoutes.dashboard.admin.CLIENTS)
      }
    }
  })
}

export function useGetUserDetails() {
  const pathName = usePathname()
  const router = useRouter()
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.USER],
    queryFn: () => authClient.getUserDetails(),
    throwOnError: (error: any) => {
      if (error?.response?.status === 401) {
        if (pathName.includes('dashboard')) {
          localStorage.removeItem(LocalStorageKeys.USER)
          localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
          toast({
            variant: 'destructive',
            title: 'Session expired'
          })
          router.push(PageRoutes.SIGNIN)
        }
      }
      return false
    }
  })

  return {
    data: data?.data ?? {
      firstName: 'John',
      lastName: 'Wick',
      role: UserRoleEnum.CLIENT,
      email: 'johnwick@gmail.com',
      id: 1
    },
    loading: isLoading
  }
}

export function useGetUserRole() {
  const { data } = useQuery({
    queryKey: [ApiEndpoints.USER],
    queryFn: () => authClient.getUserDetails(),
    refetchInterval: 300000
  })

  return data?.data?.role ?? UserRoleEnum.CLIENT
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authClient.forgotPassword,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Please check your email or spam box to get the password reset link'
      })
    }
  })
}

export function useResetPassword() {
  const router = useRouter()
  return useMutation({
    mutationFn: authClient.resetPassword,
    onSuccess: (response: any) => {
      toast({
        variant: 'default',
        title: 'Password changed successfully!'
      })
      router.push(PageRoutes.SIGNIN)
    }
  })
}
