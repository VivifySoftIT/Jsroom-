// Default Rooms Data - Hard-coded rooms for the website
export const defaultRooms = [
  {
    id: 1,
    name: 'Single AC Room',
    category: 'single',
    roomNumber: 'S101',
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80', 
        alt: 'Single AC Room',
        isPrimary: true 
      }
    ],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    beds: '1 Single Bed',
    rating: 4.5,
    reviews: 23,
    amenities: ['Free WiFi', 'AC', 'Smart TV', 'Mini Fridge', 'Room Service'],
    guests: 2,
    size: '25 m²',
    description: 'Comfortable single room with modern amenities and city views.',
    price: 299, // This can be edited through the website
    originalPrice: 349,
    popular: false,
    acType: 'ac',
    view: 'City View',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Double AC Room',
    category: 'double',
    roomNumber: 'D201',
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80', 
        alt: 'Double AC Room',
        isPrimary: true 
      }
    ],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    beds: '1 Double Bed',
    rating: 4.7,
    reviews: 45,
    amenities: ['Free WiFi', 'AC', 'Smart TV', 'Mini Fridge', 'Room Service', 'Balcony'],
    guests: 3,
    size: '35 m²',
    description: 'Spacious double room perfect for couples with beautiful city views.',
    price: 499, // This can be edited through the website
    originalPrice: 549,
    popular: true,
    acType: 'ac',
    view: 'City View',
    status: 'Available'
  },
  {
    id: 3,
    name: 'Triple AC Room',
    category: 'triple',
    roomNumber: 'T301',
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80', 
        alt: 'Triple AC Room',
        isPrimary: true 
      }
    ],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    beds: '1 Double Bed + 1 Single Bed',
    rating: 4.6,
    reviews: 32,
    amenities: ['Free WiFi', 'AC', 'Smart TV', 'Mini Fridge', 'Room Service', 'Work Desk'],
    guests: 4,
    size: '45 m²',
    description: 'Large triple room ideal for families or groups with extra space.',
    price: 699, // This can be edited through the website
    originalPrice: 749,
    popular: false,
    acType: 'ac',
    view: 'Garden View',
    status: 'Available'
  },
  {
    id: 4,
    name: 'Single Non-AC Room',
    category: 'single',
    roomNumber: 'S102',
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80', 
        alt: 'Single Non-AC Room',
        isPrimary: true 
      }
    ],
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    beds: '1 Single Bed',
    rating: 4.2,
    reviews: 18,
    amenities: ['Free WiFi', 'Fan', 'TV', 'Room Service'],
    guests: 2,
    size: '20 m²',
    description: 'Budget-friendly single room with essential amenities.',
    price: 199, // This can be edited through the website
    originalPrice: 249,
    popular: false,
    acType: 'non-ac',
    view: 'City View',
    status: 'Available'
  },
  {
    id: 5,
    name: 'Double Non-AC Room',
    category: 'double',
    roomNumber: 'D202',
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80', 
        alt: 'Double Non-AC Room',
        isPrimary: true 
      }
    ],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    beds: '1 Double Bed',
    rating: 4.3,
    reviews: 27,
    amenities: ['Free WiFi', 'Fan', 'TV', 'Room Service'],
    guests: 3,
    size: '30 m²',
    description: 'Comfortable double room with natural ventilation and good amenities.',
    price: 349, // This can be edited through the website
    originalPrice: 399,
    popular: false,
    acType: 'non-ac',
    view: 'Garden View',
    status: 'Available'
  }
];

export default defaultRooms;