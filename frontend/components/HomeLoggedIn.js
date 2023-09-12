import Search from "./Search"
import OwnerMenu from "./OwnerMenu"
import Loader from "./Loader"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useLogStateContext } from "@/context/log"

export default function HomeLoggedIn() {
  const router = useRouter()
  const [credentials, setCredentials] = useState()
  const { isLoggedIn, user } = useLogStateContext()

  useEffect(() => {
    if (isLoggedIn && user) {
      setCredentials(user.authorities[0].authority)
    }
  }, [])

  function pageSelector() {
    switch (credentials) {
      case "DOCTOR":
        return <Search></Search>
      case "PATIENT":
        router.push(`patient/${user.jmbg}`)
        break
      case "ADMIN":
        return (
          <div>
            <OwnerMenu></OwnerMenu>
            <Search></Search>
          </div>
        )
      default:
        return <Loader></Loader>
    }
  }

  return pageSelector()
}
