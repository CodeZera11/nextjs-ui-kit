import { CardHeader, CardContent, Card } from '@/components/ui/card'
import SignInForm from '@/components/auth/forms/sign-in-form'
import { PageParams } from '@/constants/types'

const Page = async ({ searchParams }: PageParams) => {
  const queryParams = await searchParams;

  const prefillEmail = queryParams?.email as string | undefined;

  return (
    <section className="auth_page">
      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Sign In</h1>
          <p className="auth_subhead">Welcome</p>
        </CardHeader>
        <CardContent>
          <SignInForm prefillEmail={prefillEmail} />
        </CardContent>
      </Card>
    </section>
  )
}

export default Page
