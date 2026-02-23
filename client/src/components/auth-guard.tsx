'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getToken } from '@/utils/auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const token = getToken()
    const isAuthPage = pathname === '/login' || pathname === '/register'
    const isProtectedPage = pathname === '/' || pathname.startsWith('/drivers') || pathname.startsWith('/brokers') || pathname.startsWith('/loads') || pathname.startsWith('/settings')

    // If on protected pages and no token, redirect to login
    if (isProtectedPage && !token) {
      router.push('/login')
      return
    }

    // If on auth pages with token, redirect to home
    if (isAuthPage && token) {
      router.push('/')
      return
    }

    setIsChecking(false)
  }, [pathname, router, isMounted])

  // Don't render anything until we've checked auth status
  if (isChecking && isMounted) {
    return null
  }

  return <>{children}</>
}
