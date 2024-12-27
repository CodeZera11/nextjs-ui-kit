import { PageParams } from '@/constants/types'
import { CardHeader, CardContent, Card } from '@/components/ui/card'
import ForgotPasswordForm from '@/components/auth/forms/forgot-password-form'

const ForgotPasswordPage = async ({ searchParams }: PageParams) => {
  const queryParams = await searchParams;
  const prefillEmail = queryParams?.email as string | undefined;

  return (
    <section className="auth_page">
      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Reset Password</h1>
          <p className="auth_subhead">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm
            prefillEmail={prefillEmail}
          />
        </CardContent>
      </Card>
    </section>
  )
}

export default ForgotPasswordPage;