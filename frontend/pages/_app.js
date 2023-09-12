import Layout from "@/components/Layout"
import { LogState } from "@/context/log"
import "@/styles/globals.css"
import { NotificationProvider } from "web3uikit"

export default function App({ Component, pageProps }) {
  return (
    <LogState>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </LogState>
  )
}
