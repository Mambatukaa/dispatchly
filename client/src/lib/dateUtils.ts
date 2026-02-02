import dayjs from 'dayjs'

/**
 * Format a date value to a readable date string (MM/DD/YYYY)
 */
export function formatDate(date: string | number | Date | undefined | null): string {
  if (!date) return '-'

  try {
    const parsed = dayjs(date)
    return parsed.isValid() ? parsed.format('MM/DD/YYYY') : '-'
  } catch {
    return '-'
  }
}

/**
 * Format a date value for HTML date input (YYYY-MM-DD format)
 */
export function formatDateForInput(date: string | number | Date | undefined | null): string {
  if (!date) return ''

  try {
    const parsed = dayjs(date)
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
  } catch {
    return ''
  }
}

/**
 * Convert a datetime-local string (YYYY-MM-DDTHH:mm) to ISO string
 */
export function dateTimeLocalToISO(dateTimeLocal: string): string {
  if (!dateTimeLocal) return ''

  try {
    const parsed = dayjs(dateTimeLocal)
    return parsed.isValid() ? parsed.toISOString() : ''
  } catch {
    return ''
  }
}

/**
 * Format an ISO date string for HTML datetime-local input (YYYY-MM-DDTHH:mm format)
 */
export function formatDateForDateTimeInput(date: string | number | Date | undefined | null): string {
  if (!date) return ''

  try {
    const parsed = dayjs(date)
    return parsed.isValid() ? parsed.format('YYYY-MM-DDTHH:mm') : ''
  } catch {
    return ''
  }
}
