import config from '../config/apiConfig';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  // Generic API call method
  async apiCall(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      if (config.ENABLE_LOGGING) {
        console.log(`Making API call to: ${url}`);
      }
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (config.ENABLE_LOGGING) {
        console.log(`API Response status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (config.ENABLE_LOGGING) {
        console.log('API Response data:', data);
      }
      
      return data;
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.error('API call failed:', {
          endpoint,
          error: error.message,
          url: `${API_BASE_URL}${endpoint}`
        });
      }
      throw error;
    }
  }

  // Get room categories
  async getCategories() {
    try {
      if (config.ENABLE_LOGGING) {
        console.log('Attempting to fetch categories from API...');
      }
      
      const response = await this.apiCall(config.ENDPOINTS.CATEGORIES);
      
      if (response && response.success && response.data) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully fetched categories from API:', response.data);
        }
        // Mark data as coming from API
        return {
          data: response.data,
          source: 'api'
        };
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('API call failed, using fallback categories:', error.message);
      }
      // Return fallback categories with source indicator
      return {
        data: config.FALLBACK_CATEGORIES,
        source: 'fallback'
      };
    }
  }

  // Future API methods can be added here
  
  // Get all rooms
  async getRooms() {
    try {
      if (config.ENABLE_LOGGING) {
        console.log('Attempting to fetch rooms from API...');
      }
      const response = await this.apiCall(config.ENDPOINTS.ROOMS);
      if (response && response.success && response.data) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully fetched rooms from API:', response.data);
        }
        return response.data;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('Failed to fetch rooms from API:', error.message);
      }
      throw error;
    }
  }

  // Create a new room
  async createRoom(roomData) {
    try {
      if (config.ENABLE_LOGGING) {
        console.log('Attempting to create room via API...');
      }
      const response = await this.apiCall(config.ENDPOINTS.ROOMS, {
        method: 'POST',
        body: JSON.stringify(roomData)
      });
      if (response && response.success) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully created room via API:', response.data);
        }
        return response.data;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('Failed to create room via API:', error.message);
      }
      throw error;
    }
  }

  // Update an existing room
  async updateRoom(roomId, roomData) {
    try {
      if (config.ENABLE_LOGGING) {
        console.log(`Attempting to update room ${roomId} via API...`);
      }
      const response = await this.apiCall(`${config.ENDPOINTS.ROOMS}/${roomId}`, {
        method: 'PUT',
        body: JSON.stringify(roomData)
      });
      if (response && response.success) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully updated room via API:', response.data);
        }
        return response.data;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('Failed to update room via API:', error.message);
      }
      throw error;
    }
  }

  // Delete a room
  async deleteRoom(roomId) {
    try {
      if (config.ENABLE_LOGGING) {
        console.log(`Attempting to delete room ${roomId} via API...`);
      }
      const response = await this.apiCall(`${config.ENDPOINTS.ROOMS}/${roomId}`, {
        method: 'DELETE'
      });
      if (response && response.success) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully deleted room via API');
        }
        return response.data;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('Failed to delete room via API:', error.message);
      }
      throw error;
    }
  }

  // Get bookings
  async getBookings() {
    try {
      if (config.ENABLE_LOGGING) {
        console.log('Attempting to fetch bookings from API...');
      }
      const response = await this.apiCall(config.ENDPOINTS.BOOKINGS);
      if (response && response.success && response.data) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully fetched bookings from API:', response.data);
        }
        return response.data;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('Failed to fetch bookings from API:', error.message);
      }
      throw error;
    }
  }

  // Create a new booking
  async createBooking(bookingData) {
    try {
      if (config.ENABLE_LOGGING) {
        console.log('Attempting to create booking via API...');
      }
      const response = await this.apiCall(config.ENDPOINTS.BOOKINGS, {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
      if (response && response.success) {
        if (config.ENABLE_LOGGING) {
          console.log('Successfully created booking via API:', response.data);
        }
        return response.data;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      if (config.ENABLE_LOGGING) {
        console.warn('Failed to create booking via API:', error.message);
      }
      throw error;
    }
  }
}

// Create and export the API service instance
const apiServiceInstance = new ApiService();
export default apiServiceInstance;