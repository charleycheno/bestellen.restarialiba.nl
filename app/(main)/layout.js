import Header from "@/components/Main/Header"
import NavBar from "@/components/Main/NavBar"
import { createClient } from "../../utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Layout({ children }) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if(error || !data?.user) {
    redirect("/")
  }

  return (
    <div className="flex flex-col min-h-dvh w-full overflow-x-clip">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <NavBar />
    </div>
  )
}
