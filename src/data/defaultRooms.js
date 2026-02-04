// Import local images
import room1Image from '../Assets/room1.jpg';
import room2Image from '../Assets/room2.jpg';
import room3Image from '../Assets/room3.jpg';

// Default Rooms Data - Hard-coded rooms for the website (Only 3 rooms)
export const defaultRooms = [
  {
    id: 1,
    name: 'Single AC Room',
    category: 'single',
    roomNumber: 'S101',
    images: [
      { 
        url: room1Image, 
        alt: 'Single AC Room',
        isPrimary: true 
      }
    ],
    image: room1Image,
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
        url: room2Image, 
        alt: 'Double AC Room',
        isPrimary: true 
      }
    ],
    image: room2Image,
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
        url: room3Image, 
        alt: 'Triple AC Room',
        isPrimary: true 
      }
    ],
    image: room3Image,
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
  }
];

export default defaultRooms;