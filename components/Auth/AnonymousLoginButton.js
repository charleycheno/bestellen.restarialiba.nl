"use client"

import { createClient } from "@/utils/supabase/client"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function AnonymousLoginButton({ errorMessage }) {
  const supabase = createClient()
  const router = useRouter()

  async function handleAnonymousLogin() {
    const { data, error } = await supabase.auth.signInAnonymously()

    if (error) {
      errorMessage.current.style.visibility = "visible"
      errorMessage.current.textContent = "Er is een fout opgetreden"
    } else {
      router.push("/bestellen")
    }
  }

  return (
    <Button variant="bordered" className="font-medium" onPress={handleAnonymousLogin}>Doorgaan zonder account</Button>
  )
}
