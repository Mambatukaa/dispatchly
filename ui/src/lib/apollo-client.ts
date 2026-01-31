import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  credentials: 'include',
})

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: httpLink,
  cache: new InMemoryCache(),
})
