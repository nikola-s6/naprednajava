import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useLogStateContext } from "@/context/log"

export default function Header() {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn, setJwt, setUser } = useLogStateContext()

  if (router.pathname === "/login") return <></>

  const handleDisconnect = async () => {
    if (localStorage) localStorage.clear()
    setIsLoggedIn(false)
    setJwt("")
    setUser({})
    router.push("/")
  }

  return (
    <div className="sticky top-0 z-50 p-2 border-b-4 border-b-blue-600 flex flex-row items-center bg-blue-400 rounded-b">
      <Link href="/">
        {/* <Image width={170} height={40} alt="logo" src="/logo1.png"></Image> */}
        <h1 className="font-ailerons text-2xl">e-zdravlje</h1>
      </Link>
      <div className="ml-auto py-1 px-1">
        {isLoggedIn ? (
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleDisconnect}
          >
            Log out
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  )
}
