const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Room is required']
  },
  guestDetails: {
    firstName: {
      type: String,
      required: [true, 'Guest first name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Guest last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Guest email is required'],
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Guest phone is required']
    },
    idType: {
      type: String,
      enum: ['passport', 'driving-license', 'national-id', 'other'],
      required: true
    },
    idNumber: {
      type: String,
      required: [true, 'ID number is required']
    },
    nationality: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  checkInDate: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  numberOfGuests: {
    adults: {
      type: Number,
      required: true,
      min: [1, 'At least 1 adult is required']
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  numberOfNights: {
    type: Number,
    required: true
  },
  roomRate: {
    type: Number,
    required: [true, 'Room rate is required']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  taxes: {
    type: Number,
    default: 0
  },
  discounts: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['credit-card', 'debit-card', 'paypal', 'bank-transfer', 'cash', 'upi'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded', 'partial'],
      default: 'pending'
    },
    transactionId: String,
    paidAmount: {
      type: Number,
      default: 0
    },
    paymentDate: Date,
    refundAmount: {
      type: Number,
      default: 0
    },
    refundDate: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled', 'no-show'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  services: [{
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: Number,
    date: Date
  }],
  checkInTime: Date,
  checkOutTime: Date,
  actualCheckInDate: Date,
  actualCheckOutDate: Date,
  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    note: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['general', 'maintenance', 'housekeeping', 'guest-request', 'complaint']
    }
  }],
  cancellationReason: String,
  cancellationDate: Date,
  cancellationPolicy: {
    type: String,
    enum: ['free', 'partial-charge', 'full-charge']
  },
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'walk-in', 'third-party'],
    default: 'website'
  },
  loyaltyPointsEarned: {
    type: Number,
    default: 0
  },
  loyaltyPointsUsed: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ room: 1, checkInDate: 1, checkOutDate: 1 });
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ status: 1, checkInDate: 1 });
bookingSchema.index({ 'paymentDetails.status': 1 });

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.bookingId = `JSR${year}${month}${day}${random}`;
  }
  next();
});

// Calculate number of nights
bookingSchema.pre('save', function(next) {
  if (this.checkInDate && this.checkOutDate) {
    const timeDiff = this.checkOutDate.getTime() - this.checkInDate.getTime();
    this.numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  next();
});

// Virtual for total guests
bookingSchema.virtual('totalGuests').get(function() {
  return this.numberOfGuests.adults + this.numberOfGuests.children;
});

// Virtual for booking duration in days
bookingSchema.virtual('duration').get(function() {
  if (this.checkInDate && this.checkOutDate) {
    const timeDiff = this.checkOutDate.getTime() - this.checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  return 0;
});

// Method to check if booking is active
bookingSchema.methods.isActive = function() {
  return ['confirmed', 'checked-in'].includes(this.status);
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const checkIn = new Date(this.checkInDate);
  const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / (1000 * 3600);
  
  return this.status === 'confirmed' && hoursUntilCheckIn > 24;
};

module.exports = mongoose.model('Booking', bookingSchema);