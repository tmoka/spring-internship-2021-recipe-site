import "../styles/global.css"
import { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import client from "../api/apollo-client"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
