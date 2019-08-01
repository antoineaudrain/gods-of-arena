import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// HTTP connection to the API
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache,
  defaultOptions
})

export default apolloClient