"use client"

import ForgotPasswordCard from "@/components/Auth/ForgotPasswordCard"
import { useState } from "react"

export default function Page() {
   const [sent, setSent] = useState(false)

   return (
      <div className="flex justify-center p-4 md:py-10">
         <ForgotPasswordCard />
      </div>
   )
}