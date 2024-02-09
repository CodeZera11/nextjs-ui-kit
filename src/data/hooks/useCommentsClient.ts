import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentsClient } from '../clients/commentsClient'
import { ApiEndpoints } from '@/constants/api'

export function useCreateCommentMutation(onMessageSentCallback: () => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: commentsClient.create,
    onSuccess: (response: any) => {
      queryClient.refetchQueries({ queryKey: [`${ApiEndpoints.COMMENTS_BY_CASE}`] })
      onMessageSentCallback()
    }
  })
}

export function useGetCommentsByCase(caseId: number) {
  const { isLoading, data } = useQuery({
    queryKey: [`${ApiEndpoints.COMMENTS_BY_CASE}`],
    queryFn: () => commentsClient.getCommentsByCase(caseId),
    refetchInterval: 5000
  })

  return { data: data?.data, isLoading: isLoading }
}
