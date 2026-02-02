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
 * Preserves the local time as provided (no timezone conversion)
 */
export function dateTimeLocalToISO(dateTimeLocal: string): string {
  if (!dateTimeLocal) return ''

  try {
    // Directly construct ISO string from datetime-local format
    // datetime-local format is already YYYY-MM-DDTHH:mm
    // We just need to add seconds and Z suffix
    const isoString =
      dateTimeLocal.length === 16
        ? `${dateTimeLocal}:00Z`
        : dateTimeLocal.includes(':')
          ? `${dateTimeLocal}:00Z`.replace(/Z.*Z/, 'Z')
          : ''

    return isoString
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

/**
 * Convert a Date object to datetime-local string format (YYYY-MM-DDTHH:mm)
 */
export function dateToDateTimeLocal(date: Date | undefined | null): string {
  if (!date) return ''

  try {
    const parsed = dayjs(date)
    return parsed.isValid() ? parsed.format('YYYY-MM-DDTHH:mm') : ''
  } catch {
    return ''
  }
}

/**
 * Convert a datetime-local string (YYYY-MM-DDTHH:mm) to a Date object
 */
export function dateTimeLocalToDate(dateTimeLocal: string): Date {
  if (!dateTimeLocal) return new Date()

  try {
    // Parse the datetime-local string and convert to Date
    const parsed = dayjs(dateTimeLocal)
    return parsed.isValid() ? parsed.toDate() : new Date()
  } catch {
    return new Date()
  }
}
