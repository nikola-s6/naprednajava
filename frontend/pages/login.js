import { useLogStateContext } from "@/context/log"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useNotification } from "web3uikit"

export default function Login() {
  const [authenticationId, setId] = useState("")
  const [password, setPassword] = useState("")
  const { isLoggedIn, setIsLoggedIn, setUser, setJwt, setCredentials } = useLogStateContext()

  const router = useRouter()
  const dispatch = useNotification()

  if (isLoggedIn) router.push("/")

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios({
      method: "post",
      url: "http://localhost:8080/api/v1/auth/login",
      data: {
        username: authenticationId,
        password: password,
      },
    })
      .then((response) => {
        setIsLoggedIn(true)
        setUser(response.data.user)
        setJwt(response.data.jwt)
        setCredentials(response.data.user.authorities[0].authority)
        // console.log(response.data.user.authorities[0].authority)
        router.push("/")
      })
      .catch((err) => {
        dispatch({
          type: "error",
          message: "Wrong id password combination",
          title: "Login failed",
          position: "bottomR",
          icon: "bell",
        })
        console.log(err)
      })

    if (document) {
      const form = document.getElementById("form")
      form.reset()
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-8xl font-ailerons mb-5">e-health</div>
        <div className="p-5 bg-blue-400 rounded-md w-[40%]">
          <form onSubmit={handleSubmit} id="form">
            <div className="mb-6">
              <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">
                Your id
              </label>
              <input
                type="text"
                id="id"
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-800 block w-full p-2.5 ring-2 ring-blue-800"
                placeholder="(jmbg)"
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-800 block w-full p-2.5 ring-2 ring-blue-800"
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-row justify-center items-center mt-10">
              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
