import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { authClient } from '../clients/authClient'
import { User } from '@/constants/types'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'

export function useSignUp() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authClient.signUp,
    onSuccess: (response: any) => {
      const { statusCode, data } = response

      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Account created successfully'
        })

        const { jwtToken, user } = data

        const { firstName, lastName, email, role } = user

        localStorage.setItem('AUTH_TOKEN', jwtToken)
        const newUser = JSON.stringify({ firstName, lastName, email, role })
        localStorage.setItem('user', newUser)

        router.push(PageRoutes.dashboard.MORTGAGES)
      }

      // queryClient.invalidateQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}
export function useSignIn(user: User) {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.SIGNIN],
    queryFn: () => authClient.signIn(user)
  })

  return { data: data?.data, loading: isLoading }
}
