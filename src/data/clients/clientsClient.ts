import { Clients, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface CreateClientInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: Date
  supervisionTier?: string
  supervisionLevel?: string
  attorneyName?: string
  attorneyEmail?: string
  attorneyPhone?: string
  charge?: string
  chargeDescription?: string
  docketNumber?: string
  address?: string
  courtAddress?: string
  communitySpaceAddress?: string
  caseManagerSchedule?: string
}

export const clientsClient = {
  ...crudFactory<Clients, QueryOptions, CreateClientInput>(ApiEndpoints.CLIENTS)
}
