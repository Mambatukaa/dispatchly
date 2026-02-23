import { getToken } from '@/utils/auth'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  credentials: 'include',
})

// Auth link to add token to headers
const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      ...operation.getContext().headers,
    },
  })

  return forward(operation)
})

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
