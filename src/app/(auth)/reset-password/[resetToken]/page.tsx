import { CardHeader, CardContent, Card } from '@/components/ui/card'
import ResetPasswordForm from '@/components/auth/forms/reset-password-form'

interface Props {
  params: Promise<{ resetToken: string }>
}

const Page = async (props: Props) => {
  const params = await props.params

  return (
    <main className="auth_page">
      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Reset Password</h1>
          <p className="auth_subhead">Reset your password!</p>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm resetToken={params.resetToken} />
        </CardContent>
      </Card>
    </main>
  )
}

export default Page
