'use client'

import { ApolloProvider } from '@apollo/client/react'
import { ReactNode } from 'react'
import { apolloClient } from '@/lib/apollo-client'
import AlertProvider from './alert-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AlertProvider />
      {children}
    </ApolloProvider>
  )
}

