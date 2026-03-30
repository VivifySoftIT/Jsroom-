// Import local images
const room2Image = '/assets/IMG_1405.jpg'; // Changed to match Triple Non-AC as requested
const room3Image = '/assets/IMG_1403.jpg';
const room4Image = '/assets/IMG_1391.jpg'; // Different image for Non-AC
const room5Image = '/assets/IMG_1405.jpg'; // Different image for Non-AC

// Default Rooms Data - Hard-coded rooms for the website
export const defaultRooms = [
  {
    id: 1,
    name: 'Single AC Room',
    category: 'single',
    roomNumber: 'S101',
    images: [{ url: '/assets/IMG_1392.jpg', alt: 'Single AC Room', isPrimary: true }],
    image: '/assets/IMG_1392.jpg',
    beds: '1 Single Bed',
    rating: 4.5,
    reviews: 23,
    amenities: ['Free WiFi', 'AC', 'Smart TV', 'Mini Fridge', 'Room Service'],
    guests: 1,
    size: '25 m²',
    description: 'Comfortable single room with modern amenities and city views.',
    price: 999, // Placeholder since it's not available
    originalPrice: 1200,
    popular: false,
    acType: 'ac',
    view: 'City View',
    status: 'Not Available'
  },
  {
    id: 2,
    name: 'Double AC Room',
    category: 'double',
    roomNumber: 'D201',
    images: [{ url: room2Image, alt: 'Double AC Room', isPrimary: true }],
    image: room2Image,
    beds: '1 Double Bed',
    rating: 4.7,
    reviews: 45,
    amenities: ['Free WiFi', 'AC', 'Smart TV', 'Mini Fridge', 'Room Service', 'Balcony'],
    guests: 2,
    size: '35 m²',
    description: 'Spacious double bedroom perfect for couples with city views.',
    price: 2200,
    originalPrice: 2500,
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
    images: [{ url: room3Image, alt: 'Triple AC Room', isPrimary: true }],
    image: room3Image,
    beds: '1 Double Bed + 1 Single Bed',
    rating: 4.6,
    reviews: 32,
    amenities: ['Free WiFi', 'AC', 'Smart TV', 'Mini Fridge', 'Room Service', 'Work Desk'],
    guests: 3,
    size: '45 m²',
    description: 'Large triple room ideal for families or groups with extra space.',
    price: 2700,
    originalPrice: 3000,
    popular: false,
    acType: 'ac',
    view: 'Garden View',
    status: 'Available'
  },
  {
    id: 4,
    name: 'Double Non-AC Room',
    category: 'double',
    roomNumber: 'D102',
    images: [{ url: room4Image, alt: 'Double Non-AC Room', isPrimary: true }],
    image: room4Image,
    beds: '1 Double Bed',
    rating: 4.3,
    reviews: 18,
    amenities: ['Free WiFi', 'Fan', 'Smart TV', 'Room Service'],
    guests: 2,
    size: '30 m²',
    description: 'Comfortable non-AC double room at an affordable price.',
    price: 1500,
    originalPrice: 1800,
    popular: false,
    acType: 'non-ac',
    view: 'Standard View',
    status: 'Available'
  },
  {
    id: 5,
    name: 'Triple Non-AC Room',
    category: 'triple',
    roomNumber: 'T102',
    images: [{ url: room5Image, alt: 'Triple Non-AC Room', isPrimary: true }],
    image: room5Image,
    beds: '1 Double Bed + 1 Single Bed',
    rating: 4.4,
    reviews: 21,
    amenities: ['Free WiFi', 'Fan', 'Smart TV', 'Room Service'],
    guests: 3,
    size: '40 m²',
    description: 'Spacious non-AC triple room for groups or families.',
    price: 1800,
    originalPrice: 2000,
    popular: false,
    acType: 'non-ac',
    view: 'Standard View',
    status: 'Available'
  }
];

export default defaultRooms;