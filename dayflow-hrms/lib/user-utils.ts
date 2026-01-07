/**
 * Utility functions for managing user data and profile images
 */

export interface CurrentUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'employee'
  employeeId?: string
}

/**
 * Initialize admin user in localStorage if not present
 */
export function initializeAdminUser(): CurrentUser {
  const adminUser: CurrentUser = {
    id: 999, // Special ID for admin
    name: 'Admin User',
    email: 'admin@dayflow.com',
    role: 'admin'
  }
  
  const currentUser = getCurrentUser()
  if (!currentUser || currentUser.role !== 'admin') {
    setCurrentUser(adminUser)
  }
  
  return adminUser
}

/**
 * Get the current logged-in user from localStorage
 */
export function getCurrentUser(): CurrentUser | null {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('currentUser')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

/**
 * Save user to localStorage
 */
export function setCurrentUser(user: CurrentUser): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('currentUser', JSON.stringify(user))
}

/**
 * Get profile image for a specific user
 */
export function getProfileImage(userId: number): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(`profileImage_${userId}`)
}

/**
 * Save profile image for a user
 */
export function setProfileImage(userId: number, imageData: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`profileImage_${userId}`, imageData)
  
  // Trigger custom event to notify other components
  window.dispatchEvent(new Event('profileImageUpdated'))
}

/**
 * Get current user's profile image
 */
export function getCurrentUserProfileImage(): string | null {
  const user = getCurrentUser()
  if (!user) return null
  return getProfileImage(user.id)
}

/**
 * Clear current user session
 */
export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
}
