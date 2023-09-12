import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PatientData from "@/components/PatientData"
import OwnerMenu from "@/components/OwnerMenu"
import axios from "axios"
import { useLogStateContext } from "@/context/log"

export default function Patient() {
  const [patient, setPatient] = useState()
  const [jmbg, setJmbg] = useState()
  const [counter, setCounter] = useState(0)

  const { user, credentials, jwt } = useLogStateContext()

  const router = useRouter()
  const { id } = router.query

  if (!user) return <h1>You don't have permission</h1>

  useEffect(() => {
    async function fetchUser() {
      if (user.jmbg === id) {
        setPatient(user)
      }
      axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/patient/${jmbg}`,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      }).then((response) => {
        setPatient(response.data)
      })
    }
    if (jmbg) {
      fetchUser()
    }
  }, [jmbg, counter])

  useEffect(() => {
    if (router.isReady) {
      setJmbg(id)
    }
  }, [router.isReady])

  function getMenu() {
    if (credentials == "ADMIN") {
      return <OwnerMenu></OwnerMenu>
    } else {
      return <></>
    }
  }

  return (
    <div>
      {getMenu()}
      <PatientData patient={patient} reloader={setCounter}></PatientData>
    </div>
  )
}
