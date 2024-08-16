"use client"

import { createClient } from "@/utils/supabase/client";
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ResetPasswordCard({ email }) {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const loginButton = useRef()
  const errorMessage = useRef()

  async function handlePasswordUpdate() {
    setLoading(true)

    if(email == "" || password == "" || confirmPassword == "") {
      errorMessage.current.style.visibility = "visible"
      errorMessage.current.textContent = "Vul alle velden in"
      setLoading(false)
    } else if(password != confirmPassword) {
      errorMessage.current.style.visibility = "visible"
      errorMessage.current.textContent = "De wachtwoorden komen niet overeen"
      setLoading(false)
    } else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      errorMessage.current.style.visibility = "visible"
      errorMessage.current.textContent = "Het wachtwoord moet minimaal 8 karakters lang zijn en minimaal een hoofdletter, een kleine letter, een cijfer en een speciaal karakter bevatten."
      setLoading(false)
    } else {
      const { data, error } = await supabase.auth.updateUser({ password: password })

      if(error?.status == 422) {
        errorMessage.current.style.visibility = "visible"
        errorMessage.current.textContent = "Het wachtwoord is al in gebruik"
        setLoading(false)
      } else if(error) {
        errorMessage.current.style.visibility = "visible"
        errorMessage.current.textContent = "Er is een fout opgetreden"
        setLoading(false)
      } else if(data) {
        router.push("/bestellen")
      }
    }
  }

  return (
    <Card className="w-full md:max-w-100 h-full py-4">
      <CardHeader className="flex flex-col gap-4 md:px-10">
        <Image src="/logo.png" width={100} height={100} />
        <h1 className="text-center text-2xl font-bold">Wachtwoord resetten</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 md:px-10">
        <Input type="email" label="E-mail" value={email} isReadOnly />
        <Input type="password" label="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" label="Wachtwoord bevestigen" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button color="success" className="font-medium text-white" onPress={handlePasswordUpdate} ref={loginButton} isLoading={loading}>Wachtwoord resetten</Button>
        <p className="invisible text-red-500 text-center" ref={errorMessage}>Er is een fout opgetreden</p>
      </CardBody>
    </Card>
  )
}
