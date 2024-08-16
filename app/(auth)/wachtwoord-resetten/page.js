import ResetPasswordCard from '@/components/Auth/ResetPasswordCard'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if(!data?.user) {
    redirect("/wachtwoord-vergeten")
  }

  return (
    <div className="flex justify-center p-4 md:py-10">
      <ResetPasswordCard email={data.user.email} />
    </div>
  )
}
