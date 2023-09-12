import OwnerMenu from "@/components/OwnerMenu"
import { useLogStateContext } from "@/context/log"
import { useState } from "react"
import axios from "axios"
import { Modal, Typography, useNotification } from "web3uikit"
import EmployModal from "@/components/EmployModal"

export default function Employments() {
  const { isLoggedIn, jwt } = useLogStateContext()
  const [doctorId, setDoctorId] = useState()
  const [doctor, setDoctor] = useState()
  const [employments, setEmployments] = useState([])
  const dispatch = useNotification()

  if (!isLoggedIn) return <h1>You don't have permission!</h1>

  const getEmployments = async function () {
    console.log("desilo se")
    let config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/employment/doctor/${doctorId}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    }

    axios
      .request(config1)
      .then((response) => {
        setEmployments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleFind = async function (e) {
    e.preventDefault()
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/doctor/${doctorId}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    }

    axios
      .request(config)
      .then(async (response) => {
        setDoctor(response.data)
        getEmployments()
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Doctor does not exist",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
      })
  }

  const handleDelete = async function (e) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/employment/${e.target.value}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    }

    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: "success",
          message: "Doctors employment successfuly deleted",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })
        getEmployments()
      })
      .catch((error) => {
        dispatch({
          type: "error",
          message: "Employment not deleted",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
      })
  }
  return (
    <>
      <OwnerMenu></OwnerMenu>
      <div className="flex flex-col pt-[10vh] items-center">
        <form className="w-[45vw]" onSubmit={handleFind}>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-black bg-black rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-balck dark:focus:border-blue-500"
              placeholder="Search doctor by id:"
              onChange={(e) => {
                setDoctorId(e.target.value)
              }}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-400 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center mx-20 mt-20">
        <h1 className="text-xl">
          {doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : "Doctor does not exist"}
        </h1>
        <table className="text-center w-[80%]">
          <thead className="bg-gray-800 flex text-white w-full rounded-t-md">
            <tr className="flex w-full mb-4">
              <th className="p-2 w-1/3">Hospital:</th>
              <th className="p-2 w-1/3">Since:</th>
              <th className="p-2 w-1/3"></th>
            </tr>
          </thead>
          <tbody
            className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full bg-gray-400"
            style={{ height: "auto", maxHeight: "40vh" }}
          >
            {employments.map((emp) => (
              <tr className="flex w-full mb-4">
                <td className="p-2 w-1/3">{emp.hospital.name}</td>
                <td className="p-2 w-1/3">{emp.date.split("T")[0]}</td>
                <td className="p-2 w-1/3">
                  <button
                    value={emp.id}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmployModal doctor={doctor} reload={getEmployments}></EmployModal>
      </div>
    </>
  )
}
