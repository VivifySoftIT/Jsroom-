const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Room = require('../models/Room');
const Service = require('../models/Service');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jsrooms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const sampleUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@jsrooms.com',
    phone: '+918947382799',
    password: 'admin123',
    role: 'admin',
    loyaltyPoints: 1000
  },
  {
    firstName: 'Staff',
    lastName: 'Member',
    email: 'staff@jsrooms.com',
    phone: '+918947382800',
    password: 'staff123',
    role: 'staff',
    loyaltyPoints: 500
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+918947382801',
    password: 'guest123',
    role: 'guest',
    loyaltyPoints: 250,
    preferences: {
      roomType: 'suite',
      bedType: 'king',
      smokingPreference: 'non-smoking',
      floorPreference: 'high'
    }
  }
];

const sampleRooms = [
  {
    name: 'Presidential Suite',
    roomNumber: 'PS001',
    category: 'presidential',
    description: 'Ultimate luxury with panoramic city views, private jacuzzi, and dedicated butler service.',
    price: 599,
    originalPrice: 699,
    size: '120 m²',
    maxGuests: 4,
    bedConfiguration: '1 King + 1 Queen',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Presidential Suite',
        isPrimary: true
      }
    ],
    amenities: [
      { name: 'Free WiFi', category: 'technology' },
      { name: 'Smart TV', category: 'entertainment' },
      { name: 'Mini Bar', category: 'comfort' },
      { name: 'Room Service', category: 'basic' },
      { name: 'AC', category: 'comfort' },
      { name: 'Coffee Machine', category: 'comfort' }
    ],
    features: ['Private Balcony', 'Jacuzzi', 'Butler Service', 'City View'],
    detailedAmenities: {
      popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
      roomFeatures: ['Charging Points', 'Chair', 'Centre Table'],
      mediaEntertainment: ['TV'],
      bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
      otherFacilities: ['Newspaper']
    },
    floor: 15,
    view: 'city',
    status: 'available',
    popular: true,
    rating: { average: 4.9, count: 127 }
  },
  {
    name: 'Deluxe Suite',
    roomNumber: 'DS001',
    category: 'suite',
    description: 'Spacious suite with beautiful city views and elegant furnishings.',
    price: 299,
    originalPrice: 349,
    size: '65 m²',
    maxGuests: 3,
    bedConfiguration: '1 King',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Deluxe Suite',
        isPrimary: true
      }
    ],
    amenities: [
      { name: 'Free WiFi', category: 'technology' },
      { name: 'Smart TV', category: 'entertainment' },
      { name: 'Mini Fridge', category: 'comfort' },
      { name: 'Room Service', category: 'basic' },
      { name: 'AC', category: 'comfort' },
      { name: 'Coffee Machine', category: 'comfort' }
    ],
    features: ['City View', 'Private Balcony', 'Fireplace', 'Seating Area'],
    detailedAmenities: {
      popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
      roomFeatures: ['Charging Points', 'Chair', 'Centre Table', 'Fireplace'],
      mediaEntertainment: ['TV'],
      bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
      otherFacilities: ['Newspaper']
    },
    floor: 12,
    view: 'city',
    status: 'available',
    popular: false,
    rating: { average: 4.8, count: 89 }
  },
  {
    name: 'Executive Room',
    roomNumber: 'ER001',
    category: 'executive',
    description: 'Perfect for business travelers with executive lounge access and work facilities.',
    price: 199,
    originalPrice: 229,
    size: '45 m²',
    maxGuests: 2,
    bedConfiguration: '1 Queen',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Executive Room',
        isPrimary: true
      }
    ],
    amenities: [
      { name: 'Free WiFi', category: 'technology' },
      { name: 'Smart TV', category: 'entertainment' },
      { name: 'Mini Fridge', category: 'comfort' },
      { name: 'Room Service', category: 'basic' },
      { name: 'AC', category: 'comfort' },
      { name: 'Coffee Machine', category: 'comfort' }
    ],
    features: ['City View', 'Work Desk', 'Executive Lounge Access', 'Premium Bedding'],
    detailedAmenities: {
      popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
      roomFeatures: ['Charging Points', 'Chair', 'Centre Table', 'Work Desk'],
      mediaEntertainment: ['TV'],
      bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
      otherFacilities: ['Newspaper']
    },
    floor: 8,
    view: 'city',
    status: 'available',
    popular: true,
    rating: { average: 4.7, count: 156 }
  }
];

const sampleServices = [
  {
    name: 'Fine Dining Restaurant',
    category: 'dining',
    description: 'Experience culinary excellence with our award-winning chefs and locally sourced ingredients.',
    shortDescription: 'Award-winning cuisine with local ingredients',
    price: 80,
    priceType: 'per-person',
    duration: '1-2 hours',
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      hours: { start: '06:00', end: '23:00' },
      isAvailable24x7: false
    },
    location: '2nd Floor, Main Building',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Fine Dining Restaurant',
        isPrimary: true
      }
    ],
    features: ['Multi-cuisine Menu', 'Wine Pairing', 'Private Dining', 'Chef\'s Special', 'Vegetarian Options', 'Room Service'],
    inclusions: ['Welcome drink', 'Complimentary bread', 'Table service'],
    maxCapacity: 80,
    isActive: true,
    popular: true,
    rating: { average: 4.8, count: 456 }
  },
  {
    name: 'Event & Wedding Planning',
    category: 'events',
    description: 'Create unforgettable memories with our comprehensive event and wedding planning services.',
    shortDescription: 'Full-service event and wedding planning',
    price: 5000,
    priceType: 'custom',
    duration: 'Full Service',
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      hours: { start: '09:00', end: '18:00' },
      isAvailable24x7: false
    },
    location: 'Event Planning Office',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Event Hall',
        isPrimary: true
      }
    ],
    features: ['Wedding Ceremonies', 'Corporate Events', 'Birthday Parties', 'Anniversary Celebrations', 'Catering Services', 'Decoration & Setup'],
    inclusions: ['Event coordination', 'Setup and decoration', 'Catering arrangement'],
    maxCapacity: 200,
    minAdvanceBooking: 30,
    isActive: true,
    popular: true,
    rating: { average: 4.9, count: 87 }
  }
];

// Seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Hash passwords for users
    for (let user of sampleUsers) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert sample data
    const users = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${users.length} users`);

    const rooms = await Room.insertMany(sampleRooms);
    console.log(`🏨 Created ${rooms.length} rooms`);

    const services = await Service.insertMany(sampleServices);
    console.log(`🛎️  Created ${services.length} services`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Admin: admin@jsrooms.com / admin123');
    console.log('Staff: staff@jsrooms.com / staff123');
    console.log('Guest: john@example.com / guest123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run seeding
seedDatabase();