import { PageParams } from '@/constants/types';
import SignUpForm from '@/components/auth/forms/sign-up-form'
import { CardHeader, CardContent, Card } from '@/components/ui/card'

const SignupPage = async ({ searchParams }: PageParams) => {
  const queryParams = await searchParams;

  const email = queryParams?.email as string | undefined;
  const firstName = queryParams?.firstName as string | undefined;
  const lastName = queryParams?.lastName as string | undefined;

  return (
    <section className="auth_page">
      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Sign Up</h1>
          <p className="auth_subhead">Create Account</p>
        </CardHeader>
        <CardContent>
          <SignUpForm
            email={email}
            firstName={firstName}
            lastName={lastName}
          />
        </CardContent>
      </Card>
    </section>
  )
}

export default SignupPage;