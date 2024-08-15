"use client"

import { usePathname } from "next/navigation"

export default function Header() {
   const pathname = usePathname()

   switch (pathname.split("/")[1]) {
      case "bestellen":
         return (
            <header className="sticky top-0 flex items-center gap-2 p-2 border-b bg-white">
               <span className="flex justify-center items-center flex-grow h-10 w-10 text-center text-xl font-medium">Bestellen</span>
            </header>
         )

         case "winkelmand":
            return (
               <header className="sticky top-0 flex items-center gap-2 p-2 border-b bg-white">
                  <span className="flex justify-center items-center flex-grow h-10 w-10 text-center text-xl font-medium">Winkelmand</span>
               </header>
            )

         case "account":
            return (
               <header className="sticky top-0 p-2 border-b bg-white">
                  <div className="container flex items-center gap-2 mx-auto">
                     <div className="h-10 w-10 border-4 rounded-full"></div>
                     <div className="h-10 w-10 border-2 rounded-full"></div>
                     <span className="flex justify-center items-center flex-grow h-10 w-10 text-center text-xl font-medium">Account</span>
                     <div className="h-10 w-10 border-2 rounded-full"></div>
                     <div className="h-10 w-10 border-2 rounded-full"></div>
                  </div>
               </header>
            )

   
      default:
         break;
   }
}
