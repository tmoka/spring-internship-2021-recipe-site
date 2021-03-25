import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://watari-spring-internship-2021-recipe-site-7fccuoc8b-tmoka.vercel.app/api/graphql",
  cache: new InMemoryCache(),
})

export default client
