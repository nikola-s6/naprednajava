import { useEffect, useState } from "react"
import { Modal, Typography, useNotification } from "web3uikit"
import axios from "axios"
import { useLogStateContext } from "@/context/log"

export default function AdminOptions({ patient, reloader }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const [lastName, setLastName] = useState(patient.lastName)
  const [email, setEmail] = useState(patient.email)
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber)
  const [residentialAddress, setResidentialAddress] = useState(patient.residentialAddress)

  const { jwt } = useLogStateContext()

  const dispatch = useNotification()

  useEffect(() => {
    if (patient.authorities[0].authority === "ADMIN") setIsAdmin(true)
  }, [patient])

  const toggleModal = function () {
    setModalOpen(!modalOpen)
  }

  const grantAdminCredentials = async function () {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/auth/patient/${patient.jmbg}/grant`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    }

    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: "success",
          message: "Admin role successfuly granted",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })
        setIsAdmin(true)
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Granting admin role failed",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
      })
  }
  const revokeAdminCredentials = async function () {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/auth/patient/${patient.jmbg}/revoke`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    }

    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: "success",
          message: "Admin role successfuly revoked",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })
        setIsAdmin(false)
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Revoking admin role failed",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
      })
  }
  const handleSubmit = async function (e) {
    e.preventDefault()

    let data = JSON.stringify({
      jmbg: patient.jmbg,
      firstName: patient.firstName,
      lastName: lastName,
      email: email,
      gender: patient.gender,
      phoneNumber: phoneNumber,
      residentialAddress: residentialAddress,
    })

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/patient",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      data: data,
    }

    axios
      .request(config)
      .then((response) => {
        reloader(3)
        dispatch({
          type: "success",
          message: "Patient is successfully updated",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })
        e.target.reset()
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Patient updating failed",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
      })
    toggleModal()
  }

  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-10 mt-10">
        {isAdmin ? (
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={revokeAdminCredentials}
          >
            Revoke admin credentials
          </button>
        ) : (
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={grantAdminCredentials}
          >
            Grant admin credentials
          </button>
        )}

        <button
          onClick={toggleModal}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Update patient info
        </button>
        <div className="absolute top-0 left-0">
          <Modal
            cancelText="close"
            id="regular"
            isVisible={modalOpen}
            okText="Update"
            onCancel={function noRefCheck() {
              toggleModal()
            }}
            onCloseButtonPressed={function noRefCheck() {
              toggleModal()
            }}
            onOk={function noRefCheck() {
              let btn = document.getElementById("btnsbmt")
              btn.click()
            }}
            title={
              <div style={{ display: "flex", gap: 10 }}>
                <Typography color="#68738D" variant="h3">
                  Update patient
                </Typography>
              </div>
            }
          >
            <div
              style={{
                padding: "20px 0 20px 0",
              }}
            >
              <form className="text-black" onSubmit={handleSubmit} id="form">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_address"
                    id="floating_address"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                    value={patient.jmbg}
                    disabled
                  />
                  <label
                    htmlFor="floating_address"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    JMBG
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      disabled
                      value={patient.firstName}
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_last_name"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                      value={patient.lastName}
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last name
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={patient.email}
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="tel"
                      //   pattern="^\+(381){1}[0-9]{3,14}$"
                      name="floating_phone"
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={patient.phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value)
                      }}
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_residential_address"
                      id="floating_residential_address"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={(e) => {
                        setResidentialAddress(e.target.value)
                      }}
                      value={patient.residentialAddress}
                      required
                    />
                    <label
                      htmlFor="floating_residential_address"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Residential address
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <label
                      htmlFor="gend"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Select gender
                    </label>
                    <select
                      id="gend"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={patient.gender}
                      disabled
                    >
                      <option value="MALE" key="MALE">
                        Male
                      </option>
                      <option value="FEMALE" key="FEMALE">
                        Female
                      </option>
                    </select>
                  </div>
                </div>
                <button type="submit" id="btnsbmt" className="hidden">
                  hidden submit
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}
