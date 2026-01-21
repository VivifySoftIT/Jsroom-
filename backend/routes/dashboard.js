const express = require('express');
const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { auth, adminAuth, staffAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics (Admin/Staff)
// @access  Private/Staff
router.get('/stats', [auth, staffAuth], async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const [
      // Room statistics
      totalRooms,
      availableRooms,
      occupiedRooms,
      maintenanceRooms,
      
      // Booking statistics
      totalBookings,
      todayCheckIns,
      todayCheckOuts,
      pendingBookings,
      monthlyBookings,
      
      // Revenue statistics
      monthlyRevenue,
      yearlyRevenue,
      
      // User statistics
      totalUsers,
      newUsersThisMonth,
      
      // Recent bookings
      recentBookings
    ] = await Promise.all([
      // Room stats
      Room.countDocuments({ isActive: true }),
      Room.countDocuments({ isActive: true, status: 'available' }),
      Room.countDocuments({ isActive: true, status: 'occupied' }),
      Room.countDocuments({ isActive: true, status: 'maintenance' }),
      
      // Booking stats
      Booking.countDocuments(),
      Booking.countDocuments({
        checkInDate: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ['confirmed', 'checked-in'] }
      }),
      Booking.countDocuments({
        checkOutDate: { $gte: startOfDay, $lte: endOfDay },
        status: 'checked-out'
      }),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({
        createdAt: { $gte: startOfMonth },
        status: { $ne: 'cancelled' }
      }),
      
      // Revenue stats
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth },
            status: { $in: ['confirmed', 'checked-in', 'checked-out'] },
            'paymentDetails.status': 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$finalAmount' }
          }
        }
      ]),
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfYear },
            status: { $in: ['confirmed', 'checked-in', 'checked-out'] },
            'paymentDetails.status': 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$finalAmount' }
          }
        }
      ]),
      
      // User stats
      User.countDocuments({ isActive: true }),
      User.countDocuments({
        createdAt: { $gte: startOfMonth },
        isActive: true
      }),
      
      // Recent bookings
      Booking.find()
        .populate('room', 'name roomNumber')
        .populate('user', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(10)
        .select('bookingId status checkInDate checkOutDate finalAmount createdAt')
    ]);

    // Calculate occupancy rate
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    res.json({
      success: true,
      data: {
        rooms: {
          total: totalRooms,
          available: availableRooms,
          occupied: occupiedRooms,
          maintenance: maintenanceRooms,
          occupancyRate
        },
        bookings: {
          total: totalBookings,
          todayCheckIns,
          todayCheckOuts,
          pending: pendingBookings,
          monthly: monthlyBookings
        },
        revenue: {
          monthly: monthlyRevenue[0]?.total || 0,
          yearly: yearlyRevenue[0]?.total || 0
        },
        users: {
          total: totalUsers,
          newThisMonth: newUsersThisMonth
        },
        recentBookings
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics'
    });
  }
});

// @route   GET /api/dashboard/revenue-chart
// @desc    Get revenue chart data (Admin/Staff)
// @access  Private/Staff
router.get('/revenue-chart', [auth, staffAuth], async (req, res) => {
  try {
    const { period = 'monthly' } = req.query;
    
    let matchStage, groupStage, sortStage;
    const currentDate = new Date();

    if (period === 'daily') {
      // Last 30 days
      const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      matchStage = {
        createdAt: { $gte: thirtyDaysAgo },
        status: { $in: ['confirmed', 'checked-in', 'checked-out'] },
        'paymentDetails.status': 'completed'
      };
      
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        revenue: { $sum: '$finalAmount' },
        bookings: { $sum: 1 }
      };
      
      sortStage = { '_id.year': 1, '_id.month': 1, '_id.day': 1 };
    } else {
      // Last 12 months
      const twelveMonthsAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
      
      matchStage = {
        createdAt: { $gte: twelveMonthsAgo },
        status: { $in: ['confirmed', 'checked-in', 'checked-out'] },
        'paymentDetails.status': 'completed'
      };
      
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        revenue: { $sum: '$finalAmount' },
        bookings: { $sum: 1 }
      };
      
      sortStage = { '_id.year': 1, '_id.month': 1 };
    }

    const revenueData = await Booking.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: sortStage }
    ]);

    res.json({
      success: true,
      data: { revenueData, period }
    });

  } catch (error) {
    console.error('Get revenue chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching revenue chart data'
    });
  }
});

// @route   GET /api/dashboard/room-status
// @desc    Get room status overview (Admin/Staff)
// @access  Private/Staff
router.get('/room-status', [auth, staffAuth], async (req, res) => {
  try {
    const roomsByStatus = await Room.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          rooms: {
            $push: {
              id: '$_id',
              roomNumber: '$roomNumber',
              name: '$name',
              category: '$category'
            }
          }
        }
      }
    ]);

    const roomsByCategory = await Room.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
          available: {
            $sum: { $cond: [{ $eq: ['$status', 'available'] }, 1, 0] }
          },
          occupied: {
            $sum: { $cond: [{ $eq: ['$status', 'occupied'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        byStatus: roomsByStatus,
        byCategory: roomsByCategory
      }
    });

  } catch (error) {
    console.error('Get room status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching room status'
    });
  }
});

// @route   GET /api/dashboard/upcoming-arrivals
// @desc    Get upcoming arrivals (Admin/Staff)
// @access  Private/Staff
router.get('/upcoming-arrivals', [auth, staffAuth], async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    const upcomingArrivals = await Booking.find({
      checkInDate: { $gte: today, $lt: tomorrow },
      status: 'confirmed'
    })
    .populate('room', 'roomNumber name category')
    .populate('user', 'firstName lastName phone email')
    .sort({ checkInDate: 1 });

    res.json({
      success: true,
      data: { arrivals: upcomingArrivals }
    });

  } catch (error) {
    console.error('Get upcoming arrivals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upcoming arrivals'
    });
  }
});

// @route   GET /api/dashboard/upcoming-departures
// @desc    Get upcoming departures (Admin/Staff)
// @access  Private/Staff
router.get('/upcoming-departures', [auth, staffAuth], async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    const upcomingDepartures = await Booking.find({
      checkOutDate: { $gte: today, $lt: tomorrow },
      status: 'checked-in'
    })
    .populate('room', 'roomNumber name category')
    .populate('user', 'firstName lastName phone email')
    .sort({ checkOutDate: 1 });

    res.json({
      success: true,
      data: { departures: upcomingDepartures }
    });

  } catch (error) {
    console.error('Get upcoming departures error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upcoming departures'
    });
  }
});

// @route   GET /api/dashboard/user-dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/user-dashboard', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [
      user,
      activeBookings,
      pastBookings,
      upcomingBookings
    ] = await Promise.all([
      User.findById(userId),
      Booking.find({
        user: userId,
        status: { $in: ['confirmed', 'checked-in'] }
      })
      .populate('room', 'name roomNumber category images')
      .sort({ checkInDate: 1 }),
      
      Booking.find({
        user: userId,
        status: 'checked-out'
      })
      .populate('room', 'name roomNumber category images')
      .sort({ checkOutDate: -1 })
      .limit(5),
      
      Booking.find({
        user: userId,
        status: 'confirmed',
        checkInDate: { $gt: new Date() }
      })
      .populate('room', 'name roomNumber category images')
      .sort({ checkInDate: 1 })
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate loyalty tier
    const loyaltyTier = user.loyaltyPoints >= 1000 ? 'Gold' : 
                       user.loyaltyPoints >= 500 ? 'Silver' : 'Bronze';

    // Calculate total spent
    const totalSpent = await Booking.aggregate([
      {
        $match: {
          user: userId,
          status: { $in: ['checked-out'] },
          'paymentDetails.status': 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$finalAmount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          loyaltyPoints: user.loyaltyPoints,
          loyaltyTier,
          memberSince: user.createdAt
        },
        bookings: {
          active: activeBookings,
          upcoming: upcomingBookings,
          past: pastBookings
        },
        stats: {
          totalBookings: activeBookings.length + pastBookings.length + upcomingBookings.length,
          totalSpent: totalSpent[0]?.total || 0,
          loyaltyPoints: user.loyaltyPoints
        }
      }
    });

  } catch (error) {
    console.error('Get user dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user dashboard'
    });
  }
});

module.exports = router;