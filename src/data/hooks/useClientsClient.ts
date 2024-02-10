import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
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

export function useGetCaseManagers() {
  const { isLoading, data } = useQuery({
    queryKey: [`${ApiEndpoints.CLIENTS}/case-managers`],
    queryFn: () => clientsClient.getCaseManagers()
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

export const useDeleteClientMutation = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  return useMutation({
    mutationFn: clientsClient.delete,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Client deleted successfully'
      })
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
      router.push(PageRoutes.dashboard.admin.CLIENTS)
    }
  })
}

// export const useAddCaseMutation = () => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: clientsClient.addCase,
//     onSuccess: (data: any) => {
//       toast({
//         variant: 'default',
//         title: 'Case Added Successfully'
//       })
//     },
//     onSettled: () => {
//       queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
//     }
//   })
// }

// export const useAssignCaseManagerMutation = () => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: clientsClient.assignCaseManager,
//     onSuccess: (data: any) => {
//       toast({
//         variant: 'default',
//         title: 'Case Added Successfully'
//       })
//     },
//     onSettled: () => {
//       queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
//     }
//   })
// }

// export const useAddCaseAppointmentMutation = () => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: clientsClient.addCaseAppointment,
//     onSuccess: (data: any) => {
//       toast({
//         variant: 'default',
//         title: 'Case Added Successfully'
//       })
//     },
//     onSettled: () => {
//       queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
//     }
//   })
// }
