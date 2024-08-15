"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")))
  }, [])

  return (
    <div className="container flex flex-col items-center text-center gap-4 mx-auto p-4">
      {cart == null || cart.length == 0 ? <span>De winkelmand is leeg</span> :
        cart.map((item) => {
          return <span>{item.quantity}x {item.id}</span>
        })
      }
    </div>
  )
}
