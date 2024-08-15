"use client"

import { createClient } from "@/utils/supabase/client";
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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

   async function handleGoogleLogin() {
      await supabase.auth.signInWithOAuth({
         provider: "google",
         options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/callback`
         }
      })
   }

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
      <Card className="w-full md:max-w-100 h-full py-4">
         <CardHeader className="flex flex-col gap-4 md:px-10">
            <Image src="/logo.png" width={100} height={100} />
            <h1 className="text-center text-2xl font-bold">Inloggen bij Restaria Liba</h1>
         </CardHeader>
         <CardBody className="flex flex-col gap-4 md:px-10">
            <Button color="primary" className="font-medium" onPress={handleGoogleLogin}>
               <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Inloggen met Google<div></div>
            </Button>
            <Button variant="bordered" className="font-medium" onPress={handleAnonymousLogin}>Doorgaan zonder account</Button>
            <div className="w-full flex flex-row items-center gap-4 my-2">
               <div className="flex-1 bg-zinc-300 h-0.5 rounded"></div>
               <p className="text-center">of login met e-mail:</p>
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