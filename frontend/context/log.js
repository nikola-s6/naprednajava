import { createContext, useContext, useState } from "react"

const Context = createContext()

export function LogState({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [jwt, setJwt] = useState("")
  const [credentials, setCredentials] = useState("")
  return (
    <Context.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, jwt, setJwt, credentials, setCredentials }}
    >
      {children}
    </Context.Provider>
  )
}

export function useLogStateContext() {
  return useContext(Context)
}
