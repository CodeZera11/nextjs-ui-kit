import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import { casesClient } from '../clients/casesClient'

export function useGetCases() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.CASES],
    queryFn: () => casesClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreateCaseMutation = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  return useMutation({
    mutationFn: casesClient.create,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Case created successfully'
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
//     mutationFn: casesClient.addCase,
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

export const useAssignCaseManagerMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: casesClient.assignCaseManager,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Case Manager Assigned Successfully'
      })
      router.push(PageRoutes.dashboard.admin.CLIENTS)
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
    }
  })
}

export const useAddCaseAppointmentMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: casesClient.addCaseAppointment,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Case Appointment Added Successfully'
      })
      router.push(PageRoutes.dashboard.admin.CLIENTS)
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.CLIENTS] })
    }
  })
}
