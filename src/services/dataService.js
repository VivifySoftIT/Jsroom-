// Central Data Management Service for JS ROOMS
// Handles all data operations with localStorage fallback

class DataService {
  constructor() {
    this.initializeData();
  }

  // Initialize default data if not exists
  initializeData() {
    if (!localStorage.getItem('jsrooms_rooms')) {
      const defaultRooms = [
        {
          id: 1,
          roomNumber: '101',
          category: 'Single',
          categoryId: 1,
          description: 'Comfortable single room with modern amenities and city views.',
          price: 299,
          originalPrice: 349,
          size: '25 m²',
          maxGuests: 1,
          bedConfiguration: '1 Single Bed',
          floor: 1,
          view: 'City View',
          status: 'available',
          acType: 'ac',
          popular: true,
          rating: { average: 4.7, count: 89 },
          images: [{
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Single AC Room',
            isPrimary: true
          }],
          amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
          lastCleaned: '2024-01-22',
          lastMaintenance: '2024-01-15',
          createdAt: '2023-06-15',
          updatedAt: '2024-01-20'
        },
        {
          id: 2,
          roomNumber: '102',
          category: 'Single',
          categoryId: 1,
          description: 'Comfortable single room with ceiling fan and basic amenities.',
          price: 199,
          originalPrice: 249,
          size: '25 m²',
          maxGuests: 1,
          bedConfiguration: '1 Single Bed',
          floor: 1,
          view: 'City View',
          status: 'available',
          acType: 'non-ac',
          popular: false,
          rating: { average: 4.5, count: 67 },
          images: [{
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Single Non-AC Room',
            isPrimary: true
          }],
          amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'Fan', 'Coffee Machine'],
          lastCleaned: '2024-01-21',
          lastMaintenance: '2024-01-10',
          createdAt: '2023-06-15',
          updatedAt: '2024-01-18'
        },
        {
          id: 3,
          roomNumber: '201',
          category: 'Double',
          categoryId: 2,
          description: 'Spacious double room with modern amenities and comfortable seating area.',
          price: 499,
          originalPrice: 549,
          size: '35 m²',
          maxGuests: 2,
          bedConfiguration: '1 Double Bed',
          floor: 2,
          view: 'City View',
          status: 'available',
          acType: 'ac',
          popular: true,
          rating: { average: 4.8, count: 124 },
          images: [{
            url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Double AC Room',
            isPrimary: true
          }],
          amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
          lastCleaned: '2024-01-21',
          lastMaintenance: '2024-01-10',
          createdAt: '2023-06-15',
          updatedAt: '2024-01-18'
        }
      ];
      
      localStorage.setItem('jsrooms_rooms', JSON.stringify(defaultRooms));
    }

    if (!localStorage.getItem('jsrooms_bookings')) {
      const sampleBookings = [
        {
          id: 1737708007905,
          bookingNumber: 'JSR834323',
          guestName: 'Subrata Manna',
          guestEmail: 'harishm.dev01@gmail.com',
          guestPhone: '+917908007905',
          guestAddress: 'Kooran House, Koratty South P.O,, tamil nadu, IN',
          roomName: 'Single Non-AC Room',
          roomNumber: '102',
          checkIn: '2026-01-30',
          checkOut: '2026-02-06',
          nights: 7,
          guests: 2,
          amount: 1610.16,
          paymentMethod: 'Bank Transfer',
          paymentStatus: 'pending',
          specialRequests: 'None',
          createdAt: '2026-01-24',
          status: 'confirmed',
          bookingSource: 'Website'
        }
      ];
      localStorage.setItem('jsrooms_bookings', JSON.stringify(sampleBookings));
    }

    if (!localStorage.getItem('jsrooms_categories')) {
      const categories = [
        { categoryId: 1, categoryName: 'Single' },
        { categoryId: 2, categoryName: 'Double' },
        { categoryId: 3, categoryName: 'Triple' }
      ];
      localStorage.setItem('jsrooms_categories', JSON.stringify(categories));
    }
  }
  // Room Management
  getRooms() {
    return JSON.parse(localStorage.getItem('jsrooms_rooms') || '[]');
  }

  addRoom(room) {
    const rooms = this.getRooms();
    const newRoom = {
      ...room,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    rooms.push(newRoom);
    localStorage.setItem('jsrooms_rooms', JSON.stringify(rooms));
    return newRoom;
  }

  updateRoom(roomId, updatedRoom) {
    const rooms = this.getRooms();
    const index = rooms.findIndex(room => room.id === roomId);
    if (index !== -1) {
      rooms[index] = {
        ...updatedRoom,
        id: roomId,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem('jsrooms_rooms', JSON.stringify(rooms));
      return rooms[index];
    }
    return null;
  }

  deleteRoom(roomId) {
    const rooms = this.getRooms();
    const filteredRooms = rooms.filter(room => room.id !== roomId);
    localStorage.setItem('jsrooms_rooms', JSON.stringify(filteredRooms));
    return true;
  }

  // Booking Management
  getBookings() {
    return JSON.parse(localStorage.getItem('jsrooms_bookings') || '[]');
  }

  addBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      ...booking,
      id: Date.now(),
      bookingNumber: 'JSR' + String(Date.now()).slice(-6),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };
    bookings.push(newBooking);
    localStorage.setItem('jsrooms_bookings', JSON.stringify(bookings));
    return newBooking;
  }

  updateBooking(bookingId, updatedBooking) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(booking => booking.id === bookingId);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updatedBooking };
      localStorage.setItem('jsrooms_bookings', JSON.stringify(bookings));
      return bookings[index];
    }
    return null;
  }

  deleteBooking(bookingId) {
    const bookings = this.getBookings();
    const filteredBookings = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem('jsrooms_bookings', JSON.stringify(filteredBookings));
    return true;
  }

  // Categories Management
  getCategories() {
    return JSON.parse(localStorage.getItem('jsrooms_categories') || '[]');
  }

  // Dashboard Statistics
  getDashboardStats() {
    const rooms = this.getRooms();
    const bookings = this.getBookings();
    
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(room => room.status === 'available').length;
    const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
    const totalBookings = bookings.length;
    
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);
    
    const todayBookings = bookings.filter(booking => booking.createdAt === today).length;
    const monthlyBookings = bookings.filter(booking => booking.createdAt.startsWith(thisMonth)).length;
    
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
    const monthlyRevenue = bookings
      .filter(booking => booking.createdAt.startsWith(thisMonth))
      .reduce((sum, booking) => sum + (booking.amount || 0), 0);

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      totalBookings,
      todayBookings,
      monthlyBookings,
      totalRevenue,
      monthlyRevenue
    };
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem('jsrooms_rooms');
    localStorage.removeItem('jsrooms_bookings');
    localStorage.removeItem('jsrooms_categories');
    this.initializeData();
  }
}

// Create singleton instance
const dataService = new DataService();
export default dataService;