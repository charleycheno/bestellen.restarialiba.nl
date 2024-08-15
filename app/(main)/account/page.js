import supabase from "@/utils/supabase/server"
import Link from "next/link"

export default function Page() {
  return (
    <div className="container flex flex-col items-center text-center gap-4 mx-auto p-4">
      <p>Maak een account aan of log in</p>
      <Link href="/uitloggen">Uitloggen</Link>
    </div>
  )
}
