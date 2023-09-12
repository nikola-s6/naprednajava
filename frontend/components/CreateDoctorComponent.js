import { specialties } from "@/util/specialties"
import { useState } from "react"
import { useNotification } from "web3uikit"
import axios from "axios"
import { useLogStateContext } from "@/context/log"

export default function CreateDoctorComponent() {
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [residentialAddress, setResidentialAddress] = useState("")
  const [gender, setGender] = useState(0) //default value from selector
  const [specialty, setSpecialty] = useState(0)
  const [isCreating, setIsCreating] = useState(false)

  const { jwt } = useLogStateContext()

  const dispatch = useNotification()

  const handleSubmit = async function (e) {
    e.preventDefault()

    let data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      phoneNumber: phoneNumber,
      residentialAddress: residentialAddress,
      password: password,
      specialization: specialty,
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/auth/register/doctor",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      data: data,
    }

    setIsCreating(true)

    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: "success",
          message: "Doctor is successfully created",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })

        setIsCreating(false)
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Transaction reverted",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
        setIsCreating(false)
      })

    if (document) {
      const form = document.getElementById("form")
      form.reset()
    }
  }
  return (
    <>
      <div className="bg-white rounded-lg p-5 my-10 w-[80vw] mx-auto">
        <h1 className="mb-5 border-double border-b-4 border-black text-xl mb-8">
          Create a doctor:
        </h1>
        <form className="text-black" onSubmit={handleSubmit} id="form">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
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
                pattern="^\+(381){1}[0-9]{3,14}$"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue="+381"
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
                onChange={(e) => setGender(parseInt(e.target.value))}
              >
                <option value="0" key="g0">
                  Male
                </option>
                <option value="1" key="g1">
                  Female
                </option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="spec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select doctor specialty
              </label>
              <select
                id="spec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setSpecialty(parseInt(e.target.value))}
              >
                {specialties.map((spec, ind) => (
                  <option value={ind} key={ind}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="floating_address"
              id="floating_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
            />
            <label
              htmlFor="floating_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={isCreating}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
