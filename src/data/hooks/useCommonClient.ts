import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commonClient } from '../clients/commonClient'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function useSendEmailMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: commonClient.sendEmail,
    onSuccess: (response: any) => {
      queryClient.refetchQueries({ queryKey: [`${ApiEndpoints.SEND_EMAIL}`] })
      toast({
        variant: 'default',
        title: 'Email sent successfully!'
      })
      router.refresh()
    }
  })
}
