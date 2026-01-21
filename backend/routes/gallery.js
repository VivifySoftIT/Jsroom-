const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Mock gallery data (in production, this would come from a database)
const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Presidential Suite',
    category: 'rooms',
    alt: 'Luxurious presidential suite with city view',
    featured: true,
    description: 'Our most luxurious accommodation with panoramic city views'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Executive Room',
    category: 'rooms',
    alt: 'Modern executive room with work desk',
    featured: false,
    description: 'Perfect for business travelers with modern amenities'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Fine Dining Restaurant',
    category: 'dining',
    alt: 'Elegant restaurant with fine dining setup',
    featured: true,
    description: 'Award-winning cuisine in an elegant atmosphere'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Infinity Pool',
    category: 'amenities',
    alt: 'Rooftop infinity pool with city views',
    featured: true,
    description: 'Relax by our stunning rooftop infinity pool'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Luxury Suite Living Area',
    category: 'rooms',
    alt: 'Spacious living area in luxury suite',
    featured: false,
    description: 'Comfortable living spaces with premium furnishings'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Hotel Lobby',
    category: 'lobby',
    alt: 'Grand hotel lobby with elegant decor',
    featured: true,
    description: 'Welcome to our grand lobby with 24/7 concierge service'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Family Room',
    category: 'rooms',
    alt: 'Spacious family room with multiple beds',
    featured: false,
    description: 'Perfect for families with connecting rooms and kids area'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Standard Room',
    category: 'rooms',
    alt: 'Comfortable standard room with modern amenities',
    featured: false,
    description: 'Comfortable accommodation with all essential amenities'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Spa Treatment Room',
    category: 'amenities',
    alt: 'Relaxing spa treatment room',
    featured: false,
    description: 'Rejuvenate in our tranquil spa facilities'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Event Hall',
    category: 'events',
    alt: 'Elegant event hall for weddings and conferences',
    featured: true,
    description: 'Host your special events in our elegant venues'
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Concierge Desk',
    category: 'lobby',
    alt: 'Professional concierge service desk',
    featured: false,
    description: '24/7 concierge service for all your needs'
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    title: 'Hotel Exterior',
    category: 'exterior',
    alt: 'Modern hotel building exterior',
    featured: true,
    description: 'JS Rooms - Where luxury meets comfort'
  }
];

// @route   GET /api/gallery
// @desc    Get gallery images
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      page = 1, 
      limit = 12,
      search 
    } = req.query;

    let filteredImages = [...galleryImages];

    // Filter by category
    if (category && category !== 'all') {
      filteredImages = filteredImages.filter(img => img.category === category);
    }

    // Filter by featured
    if (featured === 'true') {
      filteredImages = filteredImages.filter(img => img.featured);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredImages = filteredImages.filter(img => 
        img.title.toLowerCase().includes(searchLower) ||
        img.description.toLowerCase().includes(searchLower) ||
        img.category.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedImages = filteredImages.slice(skip, skip + parseInt(limit));
    const totalCount = filteredImages.length;
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      success: true,
      data: {
        images: paginatedImages,
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
    console.error('Get gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching gallery images'
    });
  }
});

// @route   GET /api/gallery/categories
// @desc    Get gallery categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      { id: 'all', name: 'All Images', count: galleryImages.length },
      { id: 'rooms', name: 'Rooms & Suites', count: galleryImages.filter(img => img.category === 'rooms').length },
      { id: 'dining', name: 'Dining', count: galleryImages.filter(img => img.category === 'dining').length },
      { id: 'amenities', name: 'Amenities', count: galleryImages.filter(img => img.category === 'amenities').length },
      { id: 'events', name: 'Events', count: galleryImages.filter(img => img.category === 'events').length },
      { id: 'lobby', name: 'Lobby & Common Areas', count: galleryImages.filter(img => img.category === 'lobby').length },
      { id: 'exterior', name: 'Exterior', count: galleryImages.filter(img => img.category === 'exterior').length }
    ];

    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get gallery categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching gallery categories'
    });
  }
});

// @route   GET /api/gallery/featured
// @desc    Get featured gallery images
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredImages = galleryImages.filter(img => img.featured);

    res.json({
      success: true,
      data: { images: featuredImages }
    });

  } catch (error) {
    console.error('Get featured gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured images'
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery image
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const image = galleryImages.find(img => img.id === parseInt(req.params.id));

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Get related images (same category, excluding current image)
    const relatedImages = galleryImages
      .filter(img => img.category === image.category && img.id !== image.id)
      .slice(0, 4);

    res.json({
      success: true,
      data: { 
        image,
        relatedImages
      }
    });

  } catch (error) {
    console.error('Get gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching image'
    });
  }
});

// @route   POST /api/gallery (Admin only)
// @desc    Add new gallery image
// @access  Private/Admin
router.post('/', [auth, adminAuth], [
  body('url').isURL().withMessage('Valid image URL is required'),
  body('title').trim().isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
  body('category').isIn(['rooms', 'dining', 'amenities', 'events', 'lobby', 'exterior']),
  body('alt').trim().isLength({ min: 5 }).withMessage('Alt text must be at least 5 characters'),
  body('description').optional().trim().isLength({ max: 200 })
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

    const { url, title, category, alt, description, featured = false } = req.body;

    // Generate new ID
    const newId = Math.max(...galleryImages.map(img => img.id)) + 1;

    const newImage = {
      id: newId,
      url,
      title,
      category,
      alt,
      description,
      featured
    };

    // In production, save to database
    galleryImages.push(newImage);

    res.status(201).json({
      success: true,
      message: 'Image added to gallery successfully',
      data: { image: newImage }
    });

  } catch (error) {
    console.error('Add gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding image'
    });
  }
});

// @route   PUT /api/gallery/:id (Admin only)
// @desc    Update gallery image
// @access  Private/Admin
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const imageIndex = galleryImages.findIndex(img => img.id === parseInt(req.params.id));

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Update image
    galleryImages[imageIndex] = {
      ...galleryImages[imageIndex],
      ...req.body
    };

    res.json({
      success: true,
      message: 'Image updated successfully',
      data: { image: galleryImages[imageIndex] }
    });

  } catch (error) {
    console.error('Update gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating image'
    });
  }
});

// @route   DELETE /api/gallery/:id (Admin only)
// @desc    Delete gallery image
// @access  Private/Admin
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const imageIndex = galleryImages.findIndex(img => img.id === parseInt(req.params.id));

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Remove image
    galleryImages.splice(imageIndex, 1);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting image'
    });
  }
});

module.exports = router;