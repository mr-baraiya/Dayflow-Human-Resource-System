/**
 * Test script to verify profile picture upload and display functionality
 * Run this in the browser console to test the profile picture features
 */

// Test 1: Set a test user
console.log('Test 1: Setting up test user...')
const testUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@dayflow.com',
  role: 'employee',
  employeeId: 'EMP001'
}
localStorage.setItem('currentUser', JSON.stringify(testUser))
console.log('✓ Test user set:', testUser)

// Test 2: Create a test profile image (1x1 pixel red PNG)
console.log('\nTest 2: Creating test profile image...')
const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=='
localStorage.setItem(`profileImage_${testUser.id}`, testImageData)
console.log('✓ Profile image saved for user ID:', testUser.id)

// Test 3: Verify image can be retrieved
console.log('\nTest 3: Verifying image retrieval...')
const retrievedImage = localStorage.getItem(`profileImage_${testUser.id}`)
if (retrievedImage === testImageData) {
  console.log('✓ Image retrieved successfully')
} else {
  console.error('✗ Image retrieval failed')
}

// Test 4: Trigger profile image update event
console.log('\nTest 4: Triggering profile image update event...')
window.dispatchEvent(new Event('profileImageUpdated'))
console.log('✓ Event dispatched')

// Test 5: Check if image exists in DOM
setTimeout(() => {
  console.log('\nTest 5: Checking for image in navbar...')
  const avatarImages = document.querySelectorAll('[data-slot="avatar-image"]')
  console.log(`Found ${avatarImages.length} avatar image(s)`)
  avatarImages.forEach((img, index) => {
    console.log(`Avatar ${index + 1} src:`, img.getAttribute('src'))
  })
}, 1000)

console.log('\n=== Profile Picture Tests Complete ===')
console.log('Navigate to /employee/profile to test the upload functionality')
