// API Configuration
const config = {
  // Base URL for the API - TEMPORARILY USING LOCAL API FOR TESTING
  API_BASE_URL: 'https://localhost:7001/api', // Change this to your local API port
  
  // API Endpoints
  ENDPOINTS: {
    CATEGORIES: '/rooms/GetActiveCategories',
    ROOMS: '/rooms',
    BOOKINGS: '/bookings',
    USERS: '/users'
  },
  
  // Request timeout in milliseconds
  REQUEST_TIMEOUT: 10000,
  
  // Enable/disable API logging
  ENABLE_LOGGING: true,
  
  // Fallback data when API is not available
  FALLBACK_CATEGORIES: [
    { categoryId: 1, categoryName: 'Single' },
    { categoryId: 2, categoryName: 'Double' },
    { categoryId: 3, categoryName: 'Triple' }
  ]
};

export default config;