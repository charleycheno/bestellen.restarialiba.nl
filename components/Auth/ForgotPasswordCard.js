"use client"

import { createClient } from "@/utils/supabase/client";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ForgotPasswordCard() {
  const supabase = createClient()

  const [email, setEmail] = useState("")

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const resetButton = useRef()
  const errorMessage = useRef()

  async function handlePasswordReset() {
    setLoading(true)
    if(email == "") {
      errorMessage.current.style.visibility = "visible"
      errorMessage.current.textContent = "Vul alle velden in"
      setLoading(false)
    } else {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        errorMessage.current.style.visibility = "visible"
        errorMessage.current.textContent = "Er is een fout opgetreden"
        setLoading(false)
      } else {
        setSent(true)
      }
    }
  }

  return (
    <>
      { sent ?
        <Card className="w-full md:max-w-100 h-full p-4">
          <CardHeader className="flex flex-col gap-4 md:px-10">
            <Image className="text-center" src="/logo.png" width={100} height={100} />
            <h1 className="text-center text-2xl font-bold">E-mail verstuurd</h1>
            <p>Er is een e-mail verstuurd naar het opgegeven e-mailadres met instructies om het wachtwoord te resetten. Deze pagina kan nu worden gesloten.</p>
          </CardHeader>
        </Card>
        :
        <Card className="w-full md:max-w-100 h-full pt-4">
          <CardHeader className="flex flex-col gap-4 md:px-10">
            <Image src="/logo.png" width={100} height={100} />
            <h1 className="text-center text-2xl font-bold">Wachtwoord resetten</h1>
            <p>Er zal een e-mail worden verzonden naar het onderstaande e-mail adres met instructies om het wachtwoord te resetten.</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 md:px-10">
            <Input type="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button color="primary" className="font-medium" onPress={handlePasswordReset} ref={resetButton} isLoading={loading}>Wachtwoord resetten</Button>
            <p className="invisible text-red-500 text-center" ref={errorMessage}>Er is een fout opgetreden</p>
          </CardBody>
        </Card>
      }
    </>
  )
}
