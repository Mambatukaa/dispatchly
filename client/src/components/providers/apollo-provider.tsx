'use client'

import { ApolloProvider } from '@apollo/client/react'
import { ReactNode } from 'react'
import { apolloClient } from '@/lib/apollo-client'
import AlertProvider from './alert-provider'
import { UserProvider } from '@/contexts/user-context'
import { AuthGuard } from '../auth-guard'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <AlertProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AlertProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

