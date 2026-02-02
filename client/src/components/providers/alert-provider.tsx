'use client'

import React, { useState } from 'react'
import AlertService from '@/utils/alert'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function AlertProvider() {
  const [alerts, setAlerts] = useState<{ id: string; type: 'success' | 'error'; message: string }[]>([])

  React.useEffect(() => {
    AlertService.setCallbacks(
      (message: string) => {
        const id = Date.now().toString()
        setAlerts((prev) => [...prev, { id, type: 'success', message }])
        setTimeout(() => {
          setAlerts((prev) => prev.filter((a) => a.id !== id))
        }, 4000)
      },
      (message: string) => {
        const id = Date.now().toString()
        setAlerts((prev) => [...prev, { id, type: 'error', message }])
        setTimeout(() => {
          setAlerts((prev) => prev.filter((a) => a.id !== id))
        }, 4000)
      }
    )
  }, [])

  const getAlertStyles = (type: 'success' | 'error') => {
    if (type === 'success') {
      return {
        bg: 'bg-white',
        border: 'border-l-4 border-lime-600',
        text: 'text-zinc-900',
        icon: CheckCircleIcon,
        iconColor: 'text-lime-600',
      }
    }
    return {
      bg: 'bg-white',
      border: 'border-l-4 border-red-600',
      text: 'text-zinc-900',
      icon: XCircleIcon,
      iconColor: 'text-red-600',
    }
  }

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 pt-4 pointer-events-none">
      <div className="space-y-3">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.type)
          const IconComponent = styles.icon

          return (
            <div
              key={alert.id}
              className={`${styles.bg} ${styles.border} ${styles.text} rounded-md shadow-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto`}
            >
              <IconComponent className={`${styles.iconColor} w-6 h-6 shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}
                className="shrink-0 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}


