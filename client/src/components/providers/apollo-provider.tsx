'use client'

import { ApolloProvider } from '@apollo/client/react'
import { ReactNode } from 'react'
import { apolloClient } from '@/lib/apollo-client'
import AlertProvider from './alert-provider'
import { UserProvider } from '@/contexts/user-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <AlertProvider>
          {children}
        </AlertProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

