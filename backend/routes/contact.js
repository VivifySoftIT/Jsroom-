const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @route   POST /api/contact/inquiry
// @desc    Submit contact inquiry
// @access  Public
router.post('/inquiry', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please enter a valid phone number'),
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  body('inquiryType').optional().isIn(['general', 'reservation', 'support', 'feedback'])
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

    const { name, email, phone, subject, message, inquiryType = 'general' } = req.body;

    // Create email content
    const emailContent = `
      <h2>New Contact Inquiry - JS Rooms</h2>
      <p><strong>Type:</strong> ${inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

    // Auto-reply content
    const autoReplyContent = `
      <h2>Thank you for contacting JS Rooms!</h2>
      <p>Dear ${name},</p>
      <p>We have received your inquiry and will get back to you within 24 hours.</p>
      <p><strong>Your inquiry details:</strong></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Type:</strong> ${inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)}</p>
      <p>If you need immediate assistance, please call us at +91 894 738 2799.</p>
      <br>
      <p>Best regards,<br>JS Rooms Team</p>
    `;

    // Send emails if email configuration is available
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        // Send inquiry to hotel
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact Inquiry: ${subject}`,
          html: emailContent
        });

        // Send auto-reply to customer
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting JS Rooms',
          html: autoReplyContent
        });

        console.log('Contact inquiry emails sent successfully');
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue without failing the request
      }
    }

    // Store inquiry in database (you can create a ContactInquiry model)
    // For now, just log it
    console.log('Contact Inquiry:', {
      name,
      email,
      phone,
      subject,
      message,
      inquiryType,
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting inquiry'
    });
  }
});

// @route   POST /api/contact/callback
// @desc    Request callback
// @access  Public
router.post('/callback', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('preferredTime').optional().trim().notEmpty()
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

    const { name, phone, preferredTime, message } = req.body;

    // Create callback request email
    const emailContent = `
      <h2>Callback Request - JS Rooms</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${preferredTime ? `<p><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <hr>
      <p><small>Requested on: ${new Date().toLocaleString()}</small></p>
    `;

    // Send email if configuration is available
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `Callback Request from ${name}`,
          html: emailContent
        });

        console.log('Callback request email sent successfully');
      } catch (emailError) {
        console.error('Callback email error:', emailError);
      }
    }

    // Log callback request
    console.log('Callback Request:', {
      name,
      phone,
      preferredTime,
      message,
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: 'Callback request submitted successfully. We will call you back soon.'
    });

  } catch (error) {
    console.error('Callback request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting callback request'
    });
  }
});

// @route   GET /api/contact/info
// @desc    Get contact information
// @access  Public
router.get('/info', (req, res) => {
  try {
    const contactInfo = {
      phone: {
        primary: '+91 894 738 2799',
        secondary: '+91 894 738 2800',
        available: '24/7'
      },
      email: {
        general: 'info@jsrooms.com',
        reservations: 'reservations@jsrooms.com',
        support: 'support@jsrooms.com'
      },
      address: {
        street: '123 Luxury Lane',
        city: 'Mountain View',
        state: 'CA',
        country: 'United States',
        zipCode: '94040'
      },
      hours: {
        frontDesk: '24/7',
        concierge: '6:00 AM - 11:00 PM',
        restaurant: '6:00 AM - 11:00 PM',
        pool: '6:00 AM - 10:00 PM'
      },
      socialMedia: {
        facebook: 'https://facebook.com/jsrooms',
        twitter: 'https://twitter.com/jsrooms',
        instagram: 'https://instagram.com/jsrooms',
        linkedin: 'https://linkedin.com/company/jsrooms'
      },
      departments: [
        {
          name: 'Reservations',
          phone: '+91 894 738 2799',
          email: 'reservations@jsrooms.com',
          hours: '24/7',
          description: 'Book your stay or modify existing reservations'
        },
        {
          name: 'Guest Services',
          phone: '+91 894 738 2800',
          email: 'guestservices@jsrooms.com',
          hours: '6 AM - 11 PM',
          description: 'Assistance during your stay and special requests'
        },
        {
          name: 'Events & Meetings',
          phone: '+91 894 738 2801',
          email: 'events@jsrooms.com',
          hours: '9 AM - 6 PM',
          description: 'Corporate events, weddings, and private functions'
        }
      ]
    };

    res.json({
      success: true,
      data: contactInfo
    });

  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact information'
    });
  }
});

// @route   GET /api/contact/faq
// @desc    Get frequently asked questions
// @access  Public
router.get('/faq', (req, res) => {
  try {
    const faqs = [
      {
        category: 'Booking',
        questions: [
          {
            question: 'What are your check-in and check-out times?',
            answer: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request.'
          },
          {
            question: 'Can I modify or cancel my booking?',
            answer: 'Yes, you can modify or cancel your booking up to 24 hours before check-in. Cancellation policies may vary based on the room type and booking conditions.'
          },
          {
            question: 'Do you accept pets?',
            answer: 'We are a pet-friendly hotel. Please inform us in advance about your pet, and additional charges may apply.'
          }
        ]
      },
      {
        category: 'Amenities',
        questions: [
          {
            question: 'What dining options are available?',
            answer: 'We have a fine dining restaurant and 24-hour room service available for our guests.'
          },
          {
            question: 'Is parking available?',
            answer: 'Yes, we offer complimentary valet parking for all hotel guests. Self-parking is also available.'
          },
          {
            question: 'Do you have a fitness center?',
            answer: 'Yes, we have a fully equipped fitness center available 24/7 for our guests.'
          }
        ]
      },
      {
        category: 'Services',
        questions: [
          {
            question: 'Do you provide airport shuttle service?',
            answer: 'We can arrange transportation to and from the airport. Please contact our concierge for rates and scheduling.'
          },
          {
            question: 'Is Wi-Fi available?',
            answer: 'Yes, complimentary high-speed Wi-Fi is available throughout the hotel.'
          },
          {
            question: 'Do you have laundry services?',
            answer: 'Yes, we offer same-day laundry and dry cleaning services. Items collected before 10 AM will be returned by 6 PM the same day.'
          }
        ]
      }
    ];

    res.json({
      success: true,
      data: { faqs }
    });

  } catch (error) {
    console.error('Get FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching FAQ'
    });
  }
});

module.exports = router;