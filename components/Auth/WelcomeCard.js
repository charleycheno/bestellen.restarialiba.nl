"use client"

import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AnonymousLoginButton from "./AnonymousLoginButton";

export default function WelcomeCard() {
  const router = useRouter()
  const errorMessage = useRef()

  return (
    <Card className="w-full md:max-w-100 h-full py-4">
      <CardHeader className="flex flex-col gap-4 md:px-10">
        <Image src="/logo.png" width={100} height={100} />
        <h1 className="text-center text-2xl font-bold">Welkom bij Restaria Liba</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 md:px-10">
        <GoogleLoginButton />
        <AnonymousLoginButton errorMessage={errorMessage} />
        <Button color="primary" className="font-medium" onPress={() => router.push("/inloggen")}>Inloggen</Button>
        <div className="w-full flex flex-row items-center gap-4 my-2">
          <div className="flex-1 bg-zinc-300 h-0.5 rounded"></div>
          <p className="text-center">of maak een account aan</p>
          <div className="flex-1 bg-zinc-300 h-0.5 rounded"></div>
        </div>
        <Button color="success" className="font-medium text-white" onPress={() => router.push("/registreren")}>Registreren</Button>
        <p className="invisible text-red-500 text-center" ref={errorMessage}>Er is een fout opgetreden</p>
      </CardBody>
      <CardFooter className="flex flex-col gap-4 md:10px">
        <Link className="text-blue-700 hover:underline" href="/wachtwoord-vergeten">Wachtwoord vergeten?</Link>
      </CardFooter>
    </Card>
  )
}
