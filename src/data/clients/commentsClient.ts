import { QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'
import { UserRoleEnum } from '@/constants/enums'

export interface CreateCommentInput {
  caseId: number
  message?: string
}

export interface Comment extends CreateCommentInput {
  userId: number
  role: UserRoleEnum
  user: User
}

export const commentsClient = {
  ...crudFactory<CreateCommentInput[], QueryOptions, CreateCommentInput>(ApiEndpoints.COMMENTS),
  getCommentsByCase: (caseId: number) => {
    return HttpClient.get<Comment[]>(`${ApiEndpoints.COMMENTS_BY_CASE}/${caseId}`)
  }
}
