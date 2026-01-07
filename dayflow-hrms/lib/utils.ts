import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date consistently across server and client to avoid hydration errors
 * @param dateString - ISO date string or Date object
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  
  // Use consistent formatting to avoid hydration mismatches
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
