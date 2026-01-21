const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['dining', 'events', 'wellness', 'transport', 'concierge', 'recreation'],
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  priceType: {
    type: String,
    enum: ['fixed', 'per-person', 'per-hour', 'per-day', 'custom'],
    default: 'fixed'
  },
  duration: {
    type: String,
    required: [true, 'Service duration is required']
  },
  availability: {
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    hours: {
      start: String,
      end: String
    },
    isAvailable24x7: {
      type: Boolean,
      default: false
    }
  },
  location: {
    type: String,
    required: [true, 'Service location is required']
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
  features: [{
    type: String,
    trim: true
  }],
  inclusions: [{
    type: String,
    trim: true
  }],
  exclusions: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  maxCapacity: {
    type: Number,
    min: [1, 'Maximum capacity must be at least 1']
  },
  minAdvanceBooking: {
    type: Number,
    default: 0,
    min: 0
  },
  cancellationPolicy: {
    type: String,
    maxlength: [500, 'Cancellation policy cannot exceed 500 characters']
  },
  staff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
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
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
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
  isActive: {
    type: Boolean,
    default: true
  },
  popular: {
    type: Boolean,
    default: false
  },
  bookingCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String]
}, {
  timestamps: true
});

// Indexes for better query performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ popular: -1, 'rating.average': -1 });
serviceSchema.index({ price: 1 });
serviceSchema.index({ tags: 1 });

// Calculate average rating when reviews are updated
serviceSchema.methods.calculateAverageRating = function() {
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
serviceSchema.pre('save', function(next) {
  if (this.isModified('reviews')) {
    this.calculateAverageRating();
  }
  next();
});

// Virtual for primary image
serviceSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images.length > 0 ? this.images[0].url : null);
});

// Method to check if service is available on a specific date and time
serviceSchema.methods.isAvailableAt = function(date, time) {
  if (!this.isActive) return false;
  
  if (this.availability.isAvailable24x7) return true;
  
  const dayName = date.toLocaleLowerCase().slice(0, 3) + date.toLocaleLowerCase().slice(3);
  if (!this.availability.days.includes(dayName)) return false;
  
  if (this.availability.hours.start && this.availability.hours.end) {
    return time >= this.availability.hours.start && time <= this.availability.hours.end;
  }
  
  return true;
};

module.exports = mongoose.model('Service', serviceSchema);