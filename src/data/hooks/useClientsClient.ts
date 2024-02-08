import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { requirementsClient } from '../clients/requirementsClient'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import { clientsClient } from '../clients/clientsClient'

export function useGetClients() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.CLIENTS],
    queryFn: () => clientsClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export function useGetOneRequirement(id: number) {
  const { isLoading, data } = useQuery({
    queryKey: [`${ApiEndpoints.REQUIREMENTS}-${id}`],
    queryFn: () => requirementsClient.getById({ id })
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreateClientMutation = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  return useMutation({
    mutationFn: clientsClient.create,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Client created successfully'
      })
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
      router.push(PageRoutes.dashboard.admin.CLIENTS)
    }
  })
}
