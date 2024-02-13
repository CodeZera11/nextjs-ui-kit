import { Case, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'
import { AppointmentStatusesEnum, AppointmentTypeEnum } from '@/constants/enums'

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
  addCaseAppointment: (data: {
    id: number
    caseId: number
    caseDetails: { appointmentDate: Date; type: AppointmentTypeEnum; note?: string }[]
  }) => {
    return HttpClient.post<any>(`${ApiEndpoints.CASES}/add-case-appointment`, data)
  },
  updateCaseAppointment: (data: { id: number; status: AppointmentStatusesEnum }) => {
    return HttpClient.patch<Case>(`${ApiEndpoints.CASES}/update-appointment-status`, data)
  }
}
