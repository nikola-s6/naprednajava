import OwnerMenu from "@/components/OwnerMenu"
import CreatePatientComponent from "@/components/CreatePatientComponent"
import { useLogStateContext } from "@/context/log"

export default function PatientCreate() {
  const { credentials } = useLogStateContext()
  if (credentials !== "ADMIN") return <h1>You don't have permission!</h1>

  return (
    <>
      <OwnerMenu></OwnerMenu>
      <CreatePatientComponent></CreatePatientComponent>
    </>
  )
}
