"use client"

import { createClient } from "@/utils/supabase/client";
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AnonymousLoginButton from "./AnonymousLoginButton";

export default function LoginCard() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const loginButton = useRef()
  const errorMessage = useRef()

  async function handleLogin() {
    setLoading(true)
    if(email == "" || password == "") {
      errorMessage.current.style.visibility = "visible"
      errorMessage.current.textContent = "Vul alle velden in"
      setLoading(false)
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (error) {
        errorMessage.current.style.visibility = "visible"
        errorMessage.current.textContent = "Onjuiste inloggegevens"
        setLoading(false)
      } else {
        router.push("/bestellen")
      }
    }
  }

  return (
    <Card className="w-full md:max-w-100 h-full py-4">
      <CardHeader className="flex flex-col gap-4 md:px-10">
        <Image src="/logo.png" width={100} height={100} />
        <h1 className="text-center text-2xl font-bold">Inloggen bij Restaria Liba</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 md:px-10">
        <GoogleLoginButton />
        <AnonymousLoginButton errorMessage={errorMessage} />
        <div className="w-full flex flex-row items-center gap-4 my-2">
          <div className="flex-1 bg-zinc-300 h-0.5 rounded"></div>
          <p className="text-center">of login met e-mail</p>
          <div className="flex-1 bg-zinc-300 h-0.5 rounded"></div>
        </div>
        <Input type="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" label="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button color="primary" className="font-medium" onPress={handleLogin} ref={loginButton} isLoading={loading}>Inloggen</Button>
        <p className="invisible text-red-500 text-center" ref={errorMessage}>Er is een fout opgetreden</p>
      </CardBody>
      <CardFooter className="flex flex-col gap-4 md:10px">
        <Link className="text-blue-700 hover:underline" href="/wachtwoord-vergeten">Wachtwoord vergeten?</Link>
        <p className="text-center">Nog geen account? <Link className="text-blue-700 hover:underline" href="/registreren">Registreren</Link></p>
      </CardFooter>
    </Card>
  )
}
