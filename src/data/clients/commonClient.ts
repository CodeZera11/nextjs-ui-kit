import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'

export const commonClient = {
  sendEmail: (emailDetails: { emailFrom: string; emailTo: string; subject: string; message: string }) => {
    return HttpClient.post(ApiEndpoints.SEND_EMAIL, emailDetails)
  }
}
