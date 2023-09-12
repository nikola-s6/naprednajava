import { useState, useEffect } from "react"
import Loader from "./Loader"
import AddPatientRecordModal from "./AddPatientRecordModal"
import PatientRecords from "./PatientRecords"
import axios from "axios"
import { useLogStateContext } from "@/context/log"
import AdminOptions from "./AdminOptions"

export default function PatientData({ patient, reloader }) {
  const [reports, setReports] = useState([])

  const [loaded, setLoaded] = useState(false)
  const { credentials, jwt } = useLogStateContext()
  console.log(credentials)

  const fetchRecords = async function () {
    if (patient !== undefined) {
      axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/record/patient/${patient.jmbg}`,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      })
        .then((response) => {
          console.log(response.data)
          setReports(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      setLoaded(true)
    }
  }
  useEffect(() => {
    fetchRecords()
  }, [patient])

  if (patient === undefined) {
    return (
      <div className="mt-40 flex flex-col justify-center items-center">
        <h1 className="text-3xl px-auto">Patient does not exist</h1>
      </div>
    )
  } else {
    return (
      <>
        {/* TABLE WITH PATIENT DATA */}
        <div className="flex flex-col justify-center mx-[15vw] mt-20">
          <h1 className="text-xl mb-4">Patient data:</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
              <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-500 border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    JMBG
                  </th>
                  <td className="px-6 py-4">{patient.jmbg}</td>
                </tr>
                <tr className="bg-blue-500 border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    First name
                  </th>
                  <td className="px-6 py-4">{patient.firstName}</td>
                </tr>
                <tr className="bg-blue-500 border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    Last name
                  </th>
                  <td className="px-6 py-4">{patient.lastName}</td>
                </tr>
                <tr className="bg-blue-500 border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    Gender
                  </th>
                  <td className="px-6 py-4">{patient.gender == 0 ? "Male" : "Female"}</td>
                </tr>
                <tr className="bg-blue-500 border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    Email
                  </th>
                  <td className="px-6 py-4">{patient.email}</td>
                </tr>
                <tr className="bg-blue-500 border-blue-40">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    Phone number
                  </th>
                  <td className="px-6 py-4">{patient.phoneNumber}</td>
                </tr>
                <tr className="bg-blue-500 border-blue-40">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    Residential address
                  </th>
                  <td className="px-6 py-4">{patient.residentialAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {credentials === "ADMIN" ? (
          <AdminOptions patient={patient} reloader={reloader}></AdminOptions>
        ) : (
          <></>
        )}
        {credentials === "DOCTOR" ? (
          <AddPatientRecordModal
            patient={patient}
            reloadRecords={fetchRecords}
          ></AddPatientRecordModal>
        ) : (
          <></>
        )}
        {loaded ? <PatientRecords records={reports}></PatientRecords> : <Loader></Loader>}
      </>
    )
  }
}
