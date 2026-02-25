'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@/contexts/user-context'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useUser()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || isLoading) return

    const isAuthPage = pathname === '/login' || pathname === '/register'

    // If user is null and not on auth page, redirect to login
    if (!user && !isAuthPage) {
      router.push('/login')
      return
    }

    // If user exists and on auth pages, redirect to home
    if (user && isAuthPage) {
      router.push('/')
      return
    }
  }, [pathname, router, isMounted, user, isLoading])

  // Don't render anything while checking auth or loading user
  if (!isMounted || (isLoading && !user)) {
    return null
  }

  return <>{children}</>
}
