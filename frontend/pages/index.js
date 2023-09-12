import HomeLoggedIn from "@/components/HomeLoggedIn"
import HomeLoggedOut from "@/components/HomeLoggedOut"
import { useLogStateContext } from "@/context/log"
import { useEffect, useState } from "react"

export default function Home() {
  const { isLoggedIn } = useLogStateContext()

  return isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />
}
