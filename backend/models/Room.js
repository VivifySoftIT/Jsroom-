const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    maxlength: [100, 'Room name cannot exceed 100 characters']
  },
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Room category is required'],
    enum: ['standard', 'executive', 'suite', 'family', 'presidential'],
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Room description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  size: {
    type: String,
    required: [true, 'Room size is required']
  },
  maxGuests: {
    type: Number,
    required: [true, 'Maximum guests is required'],
    min: [1, 'Maximum guests must be at least 1'],
    max: [10, 'Maximum guests cannot exceed 10']
  },
  bedConfiguration: {
    type: String,
    required: [true, 'Bed configuration is required']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  amenities: [{
    name: {
      type: String,
      required: true
    },
    icon: String,
    category: {
      type: String,
      enum: ['basic', 'entertainment', 'bathroom', 'comfort', 'technology']
    }
  }],
  features: [{
    type: String,
    trim: true
  }],
  detailedAmenities: {
    popularWithGuests: [String],
    roomFeatures: [String],
    mediaEntertainment: [String],
    bathroom: [String],
    otherFacilities: [String]
  },
  floor: {
    type: Number,
    required: [true, 'Floor number is required'],
    min: [1, 'Floor must be at least 1']
  },
  view: {
    type: String,
    enum: ['city', 'ocean', 'garden', 'pool', 'courtyard'],
    default: 'city'
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance', 'cleaning', 'out-of-order'],
    default: 'available'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot exceed 500 characters']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  popular: {
    type: Boolean,
    default: false
  },
  bookingCount: {
    type: Number,
    default: 0
  },
  lastCleaned: {
    type: Date
  },
  lastMaintenance: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
roomSchema.index({ category: 1, status: 1 });
roomSchema.index({ price: 1 });
roomSchema.index({ 'rating.average': -1 });
roomSchema.index({ popular: -1, 'rating.average': -1 });

// Calculate average rating when reviews are updated
roomSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = Math.round((sum / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
};

// Pre-save middleware to calculate rating
roomSchema.pre('save', function(next) {
  if (this.isModified('reviews')) {
    this.calculateAverageRating();
  }
  next();
});

// Virtual for primary image
roomSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images.length > 0 ? this.images[0].url : null);
});

// Virtual for discount percentage
roomSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

module.exports = mongoose.model('Room', roomSchema);