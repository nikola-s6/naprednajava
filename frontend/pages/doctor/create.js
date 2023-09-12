import CreateDoctorComponent from "@/components/CreateDoctorComponent"
import { useLogStateContext } from "@/context/log"
import OwnerMenu from "@/components/OwnerMenu"

export default function DoctorCreate() {
  const { credentials } = useLogStateContext()

  if (credentials !== "ADMIN") return <h1>You don't have permission!</h1>

  return (
    <>
      <OwnerMenu></OwnerMenu>
      <CreateDoctorComponent></CreateDoctorComponent>
    </>
  )
}
