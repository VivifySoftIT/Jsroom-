const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { auth, adminAuth, staffAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/rooms
// @desc    Get all rooms with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['standard', 'executive', 'suite', 'family', 'presidential']),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('maxGuests').optional().isInt({ min: 1 }),
  query('available').optional().isBoolean()
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
      category,
      minPrice,
      maxPrice,
      maxGuests,
      available,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (maxGuests) filter.maxGuests = { $gte: parseInt(maxGuests) };
    if (available === 'true') filter.status = 'available';

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { features: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [rooms, totalCount] = await Promise.all([
      Room.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-reviews'),
      Room.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      success: true,
      data: {
        rooms,
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
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rooms'
    });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get single room by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('reviews.user', 'firstName lastName avatar');

    if (!room || !room.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: { room }
    });

  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching room'
    });
  }
});

// @route   GET /api/rooms/:id/availability
// @desc    Check room availability for specific dates
// @access  Public
router.get('/:id/availability', [
  query('checkIn').isISO8601().withMessage('Check-in date must be valid ISO date'),
  query('checkOut').isISO8601().withMessage('Check-out date must be valid ISO date')
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

    const { checkIn, checkOut } = req.query;
    const roomId = req.params.id;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room || !room.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      room: roomId,
      status: { $in: ['confirmed', 'checked-in'] },
      $or: [
        {
          checkInDate: { $lt: new Date(checkOut) },
          checkOutDate: { $gt: new Date(checkIn) }
        }
      ]
    });

    const isAvailable = overlappingBookings.length === 0 && room.status === 'available';

    res.json({
      success: true,
      data: {
        available: isAvailable,
        room: {
          id: room._id,
          name: room.name,
          price: room.price,
          status: room.status
        },
        conflictingBookings: overlappingBookings.length
      }
    });

  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking availability'
    });
  }
});

// @route   POST /api/rooms
// @desc    Create new room (Admin only)
// @access  Private/Admin
router.post('/', [auth, adminAuth], [
  body('name').trim().isLength({ min: 2 }).withMessage('Room name must be at least 2 characters'),
  body('roomNumber').trim().notEmpty().withMessage('Room number is required'),
  body('category').isIn(['standard', 'executive', 'suite', 'family', 'presidential']),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('size').trim().notEmpty().withMessage('Room size is required'),
  body('maxGuests').isInt({ min: 1, max: 10 }).withMessage('Max guests must be between 1 and 10'),
  body('bedConfiguration').trim().notEmpty().withMessage('Bed configuration is required'),
  body('floor').isInt({ min: 1 }).withMessage('Floor must be at least 1')
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

    // Check if room number already exists
    const existingRoom = await Room.findOne({ roomNumber: req.body.roomNumber });
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: 'Room number already exists'
      });
    }

    const room = new Room(req.body);
    await room.save();

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: { room }
    });

  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating room'
    });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update room (Admin only)
// @access  Private/Admin
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check if room number is being changed and if it already exists
    if (req.body.roomNumber && req.body.roomNumber !== room.roomNumber) {
      const existingRoom = await Room.findOne({ roomNumber: req.body.roomNumber });
      if (existingRoom) {
        return res.status(400).json({
          success: false,
          message: 'Room number already exists'
        });
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Room updated successfully',
      data: { room: updatedRoom }
    });

  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating room'
    });
  }
});

// @route   DELETE /api/rooms/:id
// @desc    Delete room (Admin only)
// @access  Private/Admin
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check if room has active bookings
    const activeBookings = await Booking.find({
      room: req.params.id,
      status: { $in: ['confirmed', 'checked-in'] }
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete room with active bookings'
      });
    }

    // Soft delete - set isActive to false
    room.isActive = false;
    await room.save();

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });

  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting room'
    });
  }
});

// @route   POST /api/rooms/:id/reviews
// @desc    Add room review
// @access  Private
router.post('/:id/reviews', [auth], [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
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

    const room = await Room.findById(req.params.id);
    if (!room || !room.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check if user has already reviewed this room
    const existingReview = room.reviews.find(
      review => review.user.toString() === req.user.userId
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this room'
      });
    }

    // Add review
    room.reviews.push({
      user: req.user.userId,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await room.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: { room }
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
});

// @route   GET /api/rooms/categories/stats
// @desc    Get room statistics by category
// @access  Public
router.get('/categories/stats', async (req, res) => {
  try {
    const stats = await Room.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgRating: { $avg: '$rating.average' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    console.error('Get room stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching room statistics'
    });
  }
});

module.exports = router;