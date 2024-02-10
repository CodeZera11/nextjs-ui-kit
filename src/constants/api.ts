export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || 'http://localhost:4000/api/v1'

export const ApiEndpoints = {
  CLIENTS: API_ROOT + '/clients',
  CASES: API_ROOT + '/cases',
  SIGNIN: API_ROOT + '/auth/sign-in',
  SIGNUP: API_ROOT + '/auth/sign-up',
  USER: API_ROOT + '/auth/user',
  COMMENTS: API_ROOT + '/comments',
  COMMENTS_BY_CASE: API_ROOT + '/comments/all-by-case',
  SEND_EMAIL: API_ROOT + '/common/send-email',
  FORGOT_PASSWORD: API_ROOT + '/auth/forgot-password',
  RESET_PASSWORD: API_ROOT + '/auth/reset-password'
}

export const MAX_NUMBER = 999999999
