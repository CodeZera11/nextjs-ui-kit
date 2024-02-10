import { Case, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'

export interface CreateCaseInput {
  id: number
  type?: string
  charge?: string
  chargeDescription?: string
  docketNumber?: string
}

export const casesClient = {
  ...crudFactory<Case, QueryOptions, CreateCaseInput>(ApiEndpoints.CASES),
  assignCaseManager: (data: { id: number; caseId: number; caseManagerId: number }) => {
    return HttpClient.post<any>(`${ApiEndpoints.CASES}/assign-case-manager`, data)
  },
  addCaseAppointment: (data: { id: number; caseId: number; date: Date; note?: string }) => {
    return HttpClient.post<any>(`${ApiEndpoints.CASES}/add-case-appointment`, data)
  }
}
