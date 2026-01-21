const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');
const { auth, adminAuth, staffAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', [auth], [
  body('roomId').isMongoId().withMessage('Valid room ID is required'),
  body('checkInDate').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOutDate').isISO8601().withMessage('Valid check-out date is required'),
  body('guestDetails.firstName').trim().isLength({ min: 2 }).withMessage('Guest first name is required'),
  body('guestDetails.lastName').trim().isLength({ min: 2 }).withMessage('Guest last name is required'),
  body('guestDetails.email').isEmail().withMessage('Valid guest email is required'),
  body('guestDetails.phone').isMobilePhone().withMessage('Valid guest phone is required'),
  body('guestDetails.idType').isIn(['passport', 'driving-license', 'national-id', 'other']),
  body('guestDetails.idNumber').trim().notEmpty().withMessage('ID number is required'),
  body('numberOfGuests.adults').isInt({ min: 1 }).withMessage('At least 1 adult is required'),
  body('numberOfGuests.children').optional().isInt({ min: 0 }),
  body('paymentDetails.method').isIn(['credit-card', 'debit-card', 'paypal', 'bank-transfer', 'cash', 'upi'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      roomId,
      checkInDate,
      checkOutDate,
      guestDetails,
      numberOfGuests,
      specialRequests,
      paymentDetails
    } = req.body;

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const now = new Date();

    if (checkIn < now) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // Check room availability
    const room = await Room.findById(roomId);
    if (!room || !room.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Room not found or not available'
      });
    }

    if (room.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Room is not currently available'
      });
    }

    // Check guest capacity
    const totalGuests = numberOfGuests.adults + (numberOfGuests.children || 0);
    if (totalGuests > room.maxGuests) {
      return res.status(400).json({
        success: false,
        message: `Room can accommodate maximum ${room.maxGuests} guests`
      });
    }

    // Check for conflicting bookings
    const conflictingBookings = await Booking.find({
      room: roomId,
      status: { $in: ['confirmed', 'checked-in'] },
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn }
        }
      ]
    });

    if (conflictingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for the selected dates'
      });
    }

    // Calculate pricing
    const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const roomRate = room.price;
    const totalAmount = roomRate * numberOfNights;
    const taxes = Math.round(totalAmount * 0.18); // 18% tax
    const finalAmount = totalAmount + taxes;

    // Create booking
    const booking = new Booking({
      user: req.user.userId,
      room: roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestDetails,
      numberOfGuests,
      numberOfNights,
      roomRate,
      totalAmount,
      taxes,
      finalAmount,
      specialRequests,
      paymentDetails: {
        ...paymentDetails,
        status: 'pending'
      },
      status: 'pending'
    });

    await booking.save();

    // Populate room and user details
    await booking.populate([
      { path: 'room', select: 'name roomNumber category images' },
      { path: 'user', select: 'firstName lastName email phone' }
    ]);

    // Update room booking count
    room.bookingCount += 1;
    await room.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
});

// @route   GET /api/bookings
// @desc    Get user's bookings or all bookings (admin/staff)
// @access  Private
router.get('/', [auth], [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled', 'no-show'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    
    // If not admin/staff, only show user's own bookings
    if (!['admin', 'staff'].includes(req.user.role)) {
      filter.user = req.user.userId;
    }

    if (status) filter.status = status;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [bookings, totalCount] = await Promise.all([
      Booking.find(filter)
        .populate('room', 'name roomNumber category images price')
        .populate('user', 'firstName lastName email phone')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),
      Booking.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', [auth], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room', 'name roomNumber category images amenities features')
      .populate('user', 'firstName lastName email phone')
      .populate('services.service', 'name price category');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user can access this booking
    if (req.user.role === 'guest' && booking.user._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private (Staff/Admin)
router.put('/:id/status', [auth, staffAuth], [
  body('status').isIn(['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled', 'no-show']),
  body('notes').optional().trim().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, notes } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update status
    booking.status = status;

    // Handle specific status changes
    if (status === 'checked-in') {
      booking.actualCheckInDate = new Date();
      booking.checkInTime = new Date();
    } else if (status === 'checked-out') {
      booking.actualCheckOutDate = new Date();
      booking.checkOutTime = new Date();
    } else if (status === 'cancelled') {
      booking.cancellationDate = new Date();
      if (notes) booking.cancellationReason = notes;
    }

    // Add note if provided
    if (notes) {
      booking.notes.push({
        staff: req.user.userId,
        note: notes,
        type: 'general'
      });
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking }
    });

  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking status'
    });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', [auth], [
  body('reason').optional().trim().isLength({ max: 500 })
], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user can cancel this booking
    if (req.user.role === 'guest' && booking.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking can be cancelled
    if (!booking.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled at this time'
      });
    }

    // Cancel booking
    booking.status = 'cancelled';
    booking.cancellationDate = new Date();
    if (req.body.reason) {
      booking.cancellationReason = req.body.reason;
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
});

// @route   GET /api/bookings/stats/dashboard
// @desc    Get booking statistics for dashboard
// @access  Private (Staff/Admin)
router.get('/stats/dashboard', [auth, staffAuth], async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const [
      totalBookings,
      todayCheckIns,
      todayCheckOuts,
      activeBookings,
      pendingBookings,
      revenueStats
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({
        checkInDate: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ['confirmed', 'checked-in'] }
      }),
      Booking.countDocuments({
        checkOutDate: { $gte: startOfDay, $lte: endOfDay },
        status: 'checked-out'
      }),
      Booking.countDocuments({
        status: { $in: ['confirmed', 'checked-in'] }
      }),
      Booking.countDocuments({ status: 'pending' }),
      Booking.aggregate([
        {
          $match: {
            status: { $in: ['confirmed', 'checked-in', 'checked-out'] },
            'paymentDetails.status': 'completed'
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$finalAmount' },
            averageBookingValue: { $avg: '$finalAmount' }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalBookings,
        todayCheckIns,
        todayCheckOuts,
        activeBookings,
        pendingBookings,
        revenue: revenueStats[0] || { totalRevenue: 0, averageBookingValue: 0 }
      }
    });

  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking statistics'
    });
  }
});

module.exports = router;