import { UserRoleEnum } from './enums'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}
export interface QueryOptions {
  language: string
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export interface SuccessResponse<T> {
  data: T
  message: string
  statusCode: number
}

export interface Client {
  id: number
  firstName: string
  lastName: string
  email: string
  clientCases: Case[]
  phoneNumber: string
  dateOfBirth: string
  supervisionTier: string
  supervisionLevel: string
  attorneyName: string
  attorneyEmail: string
  attorneyPhone: string
  charge: string
  chargeDescription: string
  docketNumber: string
  role: UserRoleEnum
  createdAt: string
  updatedAt: string
}

export interface Case {
  id: number
  type?: string
  charge?: string
  note?: string
  chargeDescription?: string
  docketNumber?: string
  caseManagerId?: number
  appointments?: Appointment[]
  createdAt: string
  updatedAt: string
  comments: { message: string; userId: number }[]
}

export interface Appointment {
  id: number
  date: string
  note?: string
  status?: string
}

export type TOption = {
  label: string
  value: string
}

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: UserRoleEnum
  phoneNumber: string
  forcePasswordChange: boolean
  createdAt: string
  updatedAt: string
}
