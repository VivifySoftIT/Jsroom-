# JS Rooms Hotel Management API

A comprehensive backend API for the JS Rooms hotel management system built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Room Management**: Complete CRUD operations for rooms with availability checking
- **Booking System**: Full booking lifecycle management with payment tracking
- **User Management**: User profiles, preferences, and loyalty points
- **Services Management**: Hotel services and amenities management
- **Gallery Management**: Image gallery with categorization
- **Contact System**: Contact forms and inquiry management
- **Dashboard Analytics**: Comprehensive statistics and reporting
- **Email Integration**: Automated email notifications
- **Security**: Rate limiting, input validation, and data sanitization

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd js-rooms-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/jsrooms
   JWT_SECRET=your_super_secret_jwt_key_here
   FRONTEND_URL=http://localhost:3000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Room Endpoints

#### Get All Rooms
```http
GET /api/rooms?page=1&limit=10&category=suite&minPrice=100&maxPrice=500
```

#### Get Single Room
```http
GET /api/rooms/:id
```

#### Check Room Availability
```http
GET /api/rooms/:id/availability?checkIn=2024-01-15&checkOut=2024-01-20
```

#### Create Room (Admin Only)
```http
POST /api/rooms
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Presidential Suite",
  "roomNumber": "PS001",
  "category": "suite",
  "description": "Luxurious presidential suite",
  "price": 599,
  "size": "120 m²",
  "maxGuests": 4,
  "bedConfiguration": "1 King + 1 Queen",
  "floor": 15
}
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": "room_id_here",
  "checkInDate": "2024-01-15T15:00:00.000Z",
  "checkOutDate": "2024-01-20T11:00:00.000Z",
  "guestDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "idType": "passport",
    "idNumber": "AB123456"
  },
  "numberOfGuests": {
    "adults": 2,
    "children": 0
  },
  "paymentDetails": {
    "method": "credit-card"
  }
}
```

#### Get User Bookings
```http
GET /api/bookings?page=1&limit=10&status=confirmed
Authorization: Bearer <token>
```

#### Update Booking Status (Staff Only)
```http
PUT /api/bookings/:id/status
Authorization: Bearer <staff-token>
Content-Type: application/json

{
  "status": "checked-in",
  "notes": "Guest checked in successfully"
}
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "preferences": {
    "roomType": "suite",
    "bedType": "king"
  }
}
```

#### Get User Loyalty Points
```http
GET /api/users/loyalty
Authorization: Bearer <token>
```

### Service Endpoints

#### Get All Services
```http
GET /api/services?category=dining&popular=true
```

#### Get Single Service
```http
GET /api/services/:id
```

### Gallery Endpoints

#### Get Gallery Images
```http
GET /api/gallery?category=rooms&featured=true&page=1&limit=12
```

#### Get Gallery Categories
```http
GET /api/gallery/categories
```

### Contact Endpoints

#### Submit Contact Inquiry
```http
POST /api/contact/inquiry
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Room Inquiry",
  "message": "I would like to know about room availability",
  "inquiryType": "reservation"
}
```

#### Get Contact Information
```http
GET /api/contact/info
```

### Dashboard Endpoints (Staff/Admin Only)

#### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <staff-token>
```

#### Get Revenue Chart Data
```http
GET /api/dashboard/revenue-chart?period=monthly
Authorization: Bearer <staff-token>
```

#### Get User Dashboard
```http
GET /api/dashboard/user-dashboard
Authorization: Bearer <token>
```

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **guest**: Regular hotel guests (default)
- **staff**: Hotel staff members
- **admin**: System administrators

### Protected Routes
- Most GET endpoints are public
- POST, PUT, DELETE operations require authentication
- Admin/Staff operations require appropriate role permissions

## 📊 Data Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: String (guest|staff|admin),
  loyaltyPoints: Number,
  preferences: Object,
  address: Object
}
```

### Room Model
```javascript
{
  name: String,
  roomNumber: String (unique),
  category: String,
  description: String,
  price: Number,
  size: String,
  maxGuests: Number,
  bedConfiguration: String,
  images: Array,
  amenities: Array,
  status: String (available|occupied|maintenance|cleaning)
}
```

### Booking Model
```javascript
{
  bookingId: String (unique),
  user: ObjectId,
  room: ObjectId,
  checkInDate: Date,
  checkOutDate: Date,
  guestDetails: Object,
  numberOfGuests: Object,
  totalAmount: Number,
  paymentDetails: Object,
  status: String (pending|confirmed|checked-in|checked-out|cancelled)
}
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation using express-validator
- **Password Hashing**: bcryptjs with salt rounds
- **CORS Protection**: Configurable CORS settings
- **Helmet**: Security headers protection
- **JWT Expiration**: Tokens expire after 7 days

## 📧 Email Integration

The API supports email notifications for:
- Contact form submissions
- Booking confirmations
- Password reset requests
- Callback requests

Configure email settings in the `.env` file using SMTP credentials.

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-super-secure-production-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "js-rooms-api"
pm2 startup
pm2 save
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@jsrooms.com
- Documentation: [API Docs](https://api.jsrooms.com/docs)
- Issues: [GitHub Issues](https://github.com/jsrooms/api/issues)

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- Authentication and user management
- Room and booking management
- Basic dashboard and reporting

---

**JS Rooms API** - Built with ❤️ for modern hotel management