import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
  FaCalendarAlt, 
  FaUsers,
  FaBed,
  FaCheckCircle,
  FaCreditCard,
  FaShieldAlt,
  FaArrowRight,
  FaArrowLeft,
  FaStar,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCoffee,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt
} from 'react-icons/fa';

const BookingScreen = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    selectedRoom: searchParams.get('room') || '',
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      specialRequests: ''
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      paymentType: 'full', // 'full' or 'advance'
      advancePercentage: 30 // 30% advance payment
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const rooms = [
    {
      id: 1,
      name: 'Single AC Room',
      price: 299,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
      size: '25 m²',
      guests: 1,
      beds: '1 Single Bed',
      rating: 4.7,
      amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
      features: ['City View', 'Study Table', 'Modern Bathroom', 'Air Conditioning']
    },
    {
      id: 2,
      name: 'Double AC Room',
      price: 499,
      originalPrice: 549,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
      size: '35 m²',
      guests: 2,
      beds: '1 Double Bed',
      rating: 4.8,
      amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
      features: ['City View', 'Seating Area', 'Modern Bathroom', 'Air Conditioning']
    },
    {
      id: 3,
      name: 'Triple AC Room',
      price: 699,
      originalPrice: 749,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
      size: '45 m²',
      guests: 3,
      beds: '3 Single Beds',
      rating: 4.6,
      amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
      features: ['City View', 'Large Space', 'Modern Bathroom', 'Air Conditioning']
    }
  ];

  const selectedRoomData = rooms.find(room => room.id === parseInt(bookingData.selectedRoom)) || rooms[0];

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomTotal = selectedRoomData.price * nights * bookingData.rooms;
    const taxes = roomTotal * 0.12; // 12% tax
    const serviceFee = 50;
    const grandTotal = roomTotal + taxes + serviceFee;
    
    // Calculate payment amounts based on payment type
    const paymentAmount = bookingData.paymentInfo.paymentType === 'advance' 
      ? grandTotal * (bookingData.paymentInfo.advancePercentage / 100)
      : grandTotal;
    
    const remainingAmount = grandTotal - paymentAmount;
    
    return {
      subtotal: roomTotal,
      taxes: taxes,
      serviceFee: serviceFee,
      total: grandTotal,
      paymentAmount: paymentAmount,
      remainingAmount: remainingAmount,
      isAdvancePayment: bookingData.paymentInfo.paymentType === 'advance'
    };
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setBookingData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    setIsLoading(true);
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      setBookingComplete(true);
    }, 3000);
  };

  const steps = [
    { number: 1, title: 'Select Dates & Guests', icon: FaCalendarAlt },
    { number: 2, title: 'Guest Information', icon: FaUser },
    { number: 3, title: 'Payment Details', icon: FaCreditCard },
    { number: 4, title: 'Confirmation', icon: FaCheckCircle }
  ];

  if (bookingComplete) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.successContainer}>
          <div style={styles.successContent}>
            <div style={styles.successIcon}>
              <FaCheckCircle />
            </div>
            <h1 style={styles.successTitle}>Booking Confirmed!</h1>
            <p style={styles.successMessage}>
              Thank you for choosing JS ROOMS. Your reservation has been confirmed and 
              a confirmation email has been sent to your email address.
            </p>
            <div style={styles.bookingDetails}>
              <h3>Booking Details</h3>
              <div style={styles.detailRow}>
                <span>Confirmation Number:</span>
                <strong>JSR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Room:</span>
                <strong>{selectedRoomData.name}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Check-in:</span>
                <strong>{bookingData.checkIn}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Check-out:</span>
                <strong>{bookingData.checkOut}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Total Amount:</span>
                <strong>₹{calculateTotal().total.toFixed(2)}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Amount Paid:</span>
                <strong>₹{calculateTotal().paymentAmount.toFixed(2)}</strong>
              </div>
              {calculateTotal().isAdvancePayment && (
                <div style={styles.detailRow}>
                  <span>Remaining Amount:</span>
                  <strong>₹{calculateTotal().remainingAmount.toFixed(2)} (Due at check-in)</strong>
                </div>
              )}
              <div style={styles.detailRow}>
                <span>Payment Status:</span>
                <strong>{calculateTotal().isAdvancePayment ? 'Advance Paid' : 'Fully Paid'}</strong>
              </div>
            </div>
            <div style={styles.successActions}>
              <Link to="/dashboard" style={styles.dashboardBtn}>
                View Booking
              </Link>
              <Link to="/home" style={styles.homeBtn}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Progress Steps */}
      <section style={styles.progressSection}>
        <div style={styles.progressContainer}>
          <div style={styles.progressSteps}>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} style={styles.progressStep}>
                  <div style={{
                    ...styles.stepCircle,
                    ...(currentStep >= step.number ? styles.stepCircleActive : {}),
                    ...(currentStep === step.number ? styles.stepCircleCurrent : {})
                  }}>
                    <IconComponent style={styles.stepIcon} />
                  </div>
                  <div style={styles.stepInfo}>
                    <div style={styles.stepNumber}>Step {step.number}</div>
                    <div style={styles.stepTitle}>{step.title}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div style={{
                      ...styles.stepConnector,
                      ...(currentStep > step.number ? styles.stepConnectorActive : {})
                    }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div style={styles.bookingContainer}>
        <div style={styles.bookingGrid}>
          {/* Main Booking Form */}
          <div style={styles.bookingForm}>
            {/* Step 1: Select Dates & Guests */}
            {currentStep === 1 && (
              <div style={styles.stepContent}>
                <h2 style={styles.stepTitle}>Select Your Stay Details</h2>
                
                {/* Selected Room Display */}
                <div style={styles.selectedRoomDisplay}>
                  <h3 style={styles.sectionTitle}>Selected Room</h3>
                  <div style={styles.selectedRoomCard}>
                    <img src={selectedRoomData.image} alt={selectedRoomData.name} style={styles.selectedRoomImage} />
                    <div style={styles.selectedRoomInfo}>
                      <h4 style={styles.selectedRoomName}>{selectedRoomData.name}</h4>
                      <div style={styles.selectedRoomSpecs}>
                        <span>{selectedRoomData.size}</span>
                        <span>Max {selectedRoomData.guests} guests</span>
                        <span>{selectedRoomData.beds}</span>
                      </div>
                      <div style={styles.selectedRoomPrice}>
                        <span style={styles.currentPrice}>₹{selectedRoomData.price}</span>
                        {selectedRoomData.originalPrice > selectedRoomData.price && (
                          <span style={styles.originalPrice}>₹{selectedRoomData.originalPrice}</span>
                        )}
                        <span style={styles.perNight}>/night</span>
                      </div>
                    </div>
                    <Link to="/rooms" style={styles.changeRoomBtn}>
                      Change Room
                    </Link>
                  </div>
                </div>
                
                <div style={styles.dateSelection}>
                  <div style={styles.dateGroup}>
                    <label style={styles.label}>Check-in Date</label>
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange(null, 'checkIn', e.target.value)}
                      style={styles.dateInput}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div style={styles.dateGroup}>
                    <label style={styles.label}>Check-out Date</label>
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange(null, 'checkOut', e.target.value)}
                      style={styles.dateInput}
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div style={styles.guestSelection}>
                  <div style={styles.guestGroup}>
                    <label style={styles.label}>
                      <FaUsers style={styles.labelIcon} />
                      Guests
                    </label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) => handleInputChange(null, 'guests', parseInt(e.target.value))}
                      style={styles.selectInput}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.guestGroup}>
                    <label style={styles.label}>
                      <FaBed style={styles.labelIcon} />
                      Rooms
                    </label>
                    <select
                      value={bookingData.rooms}
                      onChange={(e) => handleInputChange(null, 'rooms', parseInt(e.target.value))}
                      style={styles.selectInput}
                    >
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Guest Information */}
            {currentStep === 2 && (
              <div style={styles.stepContent}>
                <h2 style={styles.stepTitle}>Guest Information</h2>
                
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                      type="text"
                      value={bookingData.guestInfo.firstName}
                      onChange={(e) => handleInputChange('guestInfo', 'firstName', e.target.value)}
                      style={styles.textInput}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      type="text"
                      value={bookingData.guestInfo.lastName}
                      onChange={(e) => handleInputChange('guestInfo', 'lastName', e.target.value)}
                      style={styles.textInput}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <FaEnvelope style={styles.labelIcon} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={bookingData.guestInfo.email}
                      onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                      style={styles.textInput}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <FaPhone style={styles.labelIcon} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bookingData.guestInfo.phone}
                      onChange={(e) => handleInputChange('guestInfo', 'phone', e.target.value)}
                      style={styles.textInput}
                      placeholder="+91"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <FaMapMarkerAlt style={styles.labelIcon} />
                      Address
                    </label>
                    <input
                      type="text"
                      value={bookingData.guestInfo.address}
                      onChange={(e) => handleInputChange('guestInfo', 'address', e.target.value)}
                      style={styles.textInput}
                      placeholder="Street address"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>City</label>
                    <input
                      type="text"
                      value={bookingData.guestInfo.city}
                      onChange={(e) => handleInputChange('guestInfo', 'city', e.target.value)}
                      style={styles.textInput}
                      placeholder="City"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Country</label>
                    <select
                      value={bookingData.guestInfo.country}
                      onChange={(e) => handleInputChange('guestInfo', 'country', e.target.value)}
                      style={styles.selectInput}
                    >
                      <option value="">Select Country</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Special Requests (Optional)</label>
                  <textarea
                    value={bookingData.guestInfo.specialRequests}
                    onChange={(e) => handleInputChange('guestInfo', 'specialRequests', e.target.value)}
                    style={styles.textareaInput}
                    placeholder="Any special requests or preferences..."
                    rows="4"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Payment Details */}
            {currentStep === 3 && (
              <div style={styles.stepContent}>
                <h2 style={styles.stepTitle}>Payment Information</h2>
                
                <div style={styles.paymentSecurity}>
                  <FaShieldAlt style={styles.securityIcon} />
                  <div>
                    <h4 style={styles.securityTitle}>Secure Payment</h4>
                    <p style={styles.securityText}>Your payment information is encrypted and secure</p>
                  </div>
                </div>

                {/* Payment Type Selection */}
                <div style={styles.paymentTypeSection}>
                  <h3 style={styles.sectionTitle}>Choose Payment Option</h3>
                  <div style={styles.paymentOptions}>
                    <div 
                      style={{
                        ...styles.paymentOption,
                        ...(bookingData.paymentInfo.paymentType === 'full' ? styles.paymentOptionActive : {})
                      }}
                      onClick={() => handleInputChange('paymentInfo', 'paymentType', 'full')}
                    >
                      <div style={styles.paymentOptionHeader}>
                        <input
                          type="radio"
                          name="paymentType"
                          checked={bookingData.paymentInfo.paymentType === 'full'}
                          onChange={() => handleInputChange('paymentInfo', 'paymentType', 'full')}
                          style={styles.radioInput}
                        />
                        <div>
                          <h4 style={styles.paymentOptionTitle}>Pay Full Amount</h4>
                          <p style={styles.paymentOptionDesc}>Pay the complete amount now</p>
                        </div>
                      </div>
                      <div style={styles.paymentOptionAmount}>
                        <span style={styles.paymentAmount}>₹{calculateTotal().total.toFixed(2)}</span>
                        <span style={styles.paymentLabel}>Total Amount</span>
                      </div>
                    </div>

                    <div 
                      style={{
                        ...styles.paymentOption,
                        ...(bookingData.paymentInfo.paymentType === 'advance' ? styles.paymentOptionActive : {})
                      }}
                      onClick={() => handleInputChange('paymentInfo', 'paymentType', 'advance')}
                    >
                      <div style={styles.paymentOptionHeader}>
                        <input
                          type="radio"
                          name="paymentType"
                          checked={bookingData.paymentInfo.paymentType === 'advance'}
                          onChange={() => handleInputChange('paymentInfo', 'paymentType', 'advance')}
                          style={styles.radioInput}
                        />
                        <div>
                          <h4 style={styles.paymentOptionTitle}>Pay Advance ({bookingData.paymentInfo.advancePercentage}%)</h4>
                          <p style={styles.paymentOptionDesc}>Pay advance now, remaining at check-in</p>
                        </div>
                      </div>
                      <div style={styles.paymentOptionAmount}>
                        <span style={styles.paymentAmount}>₹{calculateTotal().paymentAmount.toFixed(2)}</span>
                        <span style={styles.paymentLabel}>Advance Payment</span>
                        <span style={styles.remainingAmount}>
                          Remaining: ₹{calculateTotal().remainingAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {bookingData.paymentInfo.paymentType === 'advance' && (
                    <div style={styles.advanceNote}>
                      <FaCheckCircle style={styles.noteIcon} />
                      <div>
                        <p style={styles.noteText}>
                          <strong>Advance Payment Policy:</strong> You'll pay ₹{calculateTotal().paymentAmount.toFixed(2)} now to secure your booking. 
                          The remaining amount of ₹{calculateTotal().remainingAmount.toFixed(2)} will be collected at check-in.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <FaCreditCard style={styles.labelIcon} />
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={bookingData.paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange('paymentInfo', 'cardNumber', e.target.value)}
                      style={styles.textInput}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Cardholder Name</label>
                    <input
                      type="text"
                      value={bookingData.paymentInfo.cardholderName}
                      onChange={(e) => handleInputChange('paymentInfo', 'cardholderName', e.target.value)}
                      style={styles.textInput}
                      placeholder="Name on card"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Expiry Date</label>
                    <input
                      type="text"
                      value={bookingData.paymentInfo.expiryDate}
                      onChange={(e) => handleInputChange('paymentInfo', 'expiryDate', e.target.value)}
                      style={styles.textInput}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>CVV</label>
                    <input
                      type="text"
                      value={bookingData.paymentInfo.cvv}
                      onChange={(e) => handleInputChange('paymentInfo', 'cvv', e.target.value)}
                      style={styles.textInput}
                      placeholder="123"
                      maxLength="4"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div style={styles.stepContent}>
                <h2 style={styles.stepTitle}>Review Your Booking</h2>
                
                <div style={styles.confirmationDetails}>
                  <div style={styles.confirmationSection}>
                    <h3>Stay Details</h3>
                    <div style={styles.confirmationRow}>
                      <span>Check-in:</span>
                      <strong>{bookingData.checkIn}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Check-out:</span>
                      <strong>{bookingData.checkOut}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Nights:</span>
                      <strong>{calculateNights()}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Guests:</span>
                      <strong>{bookingData.guests}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Rooms:</span>
                      <strong>{bookingData.rooms}</strong>
                    </div>
                  </div>

                  <div style={styles.confirmationSection}>
                    <h3>Guest Information</h3>
                    <div style={styles.confirmationRow}>
                      <span>Name:</span>
                      <strong>{bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Email:</span>
                      <strong>{bookingData.guestInfo.email}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Phone:</span>
                      <strong>{bookingData.guestInfo.phone}</strong>
                    </div>
                  </div>

                  <div style={styles.confirmationSection}>
                    <h3>Payment Details</h3>
                    <div style={styles.confirmationRow}>
                      <span>Payment Type:</span>
                      <strong>{bookingData.paymentInfo.paymentType === 'full' ? 'Full Payment' : `Advance Payment (${bookingData.paymentInfo.advancePercentage}%)`}</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Amount to Pay Now:</span>
                      <strong>₹{calculateTotal().paymentAmount.toFixed(2)}</strong>
                    </div>
                    {calculateTotal().isAdvancePayment && (
                      <div style={styles.confirmationRow}>
                        <span>Remaining at Check-in:</span>
                        <strong>₹{calculateTotal().remainingAmount.toFixed(2)}</strong>
                      </div>
                    )}
                    <div style={styles.confirmationRow}>
                      <span>Total Booking Amount:</span>
                      <strong>₹{calculateTotal().total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>

                <div style={styles.termsSection}>
                  <label style={styles.checkboxLabel}>
                    <input type="checkbox" style={styles.checkbox} required />
                    <span>I agree to the <Link to="/terms" style={styles.link}>Terms & Conditions</Link> and <Link to="/privacy" style={styles.link}>Privacy Policy</Link></span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={styles.navigationButtons}>
              {currentStep > 1 && (
                <button onClick={prevStep} style={styles.prevButton}>
                  <FaArrowLeft style={styles.btnIcon} />
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button onClick={nextStep} style={styles.nextButton}>
                  Next
                  <FaArrowRight style={styles.btnIcon} />
                </button>
              ) : (
                <button 
                  onClick={handleBookingSubmit} 
                  style={styles.bookButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Complete Booking'}
                  {!isLoading && <FaCheckCircle style={styles.btnIcon} />}
                </button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div style={styles.bookingSummary}>
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Booking Summary</h3>
              
              {selectedRoomData && (
                <div style={styles.selectedRoom}>
                  <img src={selectedRoomData.image} alt={selectedRoomData.name} style={styles.summaryRoomImage} />
                  <div style={styles.summaryRoomInfo}>
                    <h4 style={styles.summaryRoomName}>{selectedRoomData.name}</h4>
                    <div style={styles.summaryRoomSpecs}>
                      <span>{selectedRoomData.size}</span>
                      <span>Max {selectedRoomData.guests} guests</span>
                    </div>
                    <div style={styles.summaryRoomPrice}>
                      ₹{selectedRoomData.price}/night
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.summaryDetails}>
                {bookingData.checkIn && bookingData.checkOut && (
                  <>
                    <div style={styles.summaryRow}>
                      <span>Check-in:</span>
                      <span>{bookingData.checkIn}</span>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Check-out:</span>
                      <span>{bookingData.checkOut}</span>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Nights:</span>
                      <span>{calculateNights()}</span>
                    </div>
                  </>
                )}
                <div style={styles.summaryRow}>
                  <span>Guests:</span>
                  <span>{bookingData.guests}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Rooms:</span>
                  <span>{bookingData.rooms}</span>
                </div>
              </div>

              <div style={styles.priceBreakdown}>
                <div style={styles.priceRow}>
                  <span>Room Total:</span>
                  <span>₹{calculateTotal().subtotal.toFixed(2)}</span>
                </div>
                <div style={styles.priceRow}>
                  <span>Taxes & Fees:</span>
                  <span>₹{calculateTotal().taxes.toFixed(2)}</span>
                </div>
                <div style={styles.priceRow}>
                  <span>Service Fee:</span>
                  <span>₹{calculateTotal().serviceFee.toFixed(2)}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total Amount:</span>
                  <span>₹{calculateTotal().total.toFixed(2)}</span>
                </div>
                
                {/* Payment Amount Display */}
                {currentStep >= 3 && (
                  <>
                    <div style={styles.paymentSummary}>
                      <div style={styles.paymentRow}>
                        <span style={styles.paymentLabel}>
                          {calculateTotal().isAdvancePayment ? 'Advance Payment:' : 'Payment Amount:'}
                        </span>
                        <span style={styles.paymentAmountText}>₹{calculateTotal().paymentAmount.toFixed(2)}</span>
                      </div>
                      {calculateTotal().isAdvancePayment && (
                        <div style={styles.remainingRow}>
                          <span>Remaining at Check-in:</span>
                          <span>₹{calculateTotal().remainingAmount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div style={styles.summaryFeatures}>
                <h4>Included:</h4>
                <div style={styles.featuresList}>
                  <div style={styles.featureItem}>
                    <FaCheckCircle style={styles.featureIcon} />
                    <span>Free WiFi</span>
                  </div>
                  <div style={styles.featureItem}>
                    <FaCheckCircle style={styles.featureIcon} />
                    <span>Free Cancellation</span>
                  </div>
                  <div style={styles.featureItem}>
                    <FaCheckCircle style={styles.featureIcon} />
                    <span>24/7 Concierge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAF9F7',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  // Progress Section
  progressSection: {
    padding: '2rem 1.5rem',
    backgroundColor: 'white',
    marginTop: '80px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },

  progressContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  progressSteps: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },

  stepCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease',
  },

  stepCircleActive: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
  },

  stepCircleCurrent: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    boxShadow: '0 0 0 4px rgba(212, 175, 55, 0.2)',
  },

  stepIcon: {
    fontSize: '20px',
  },

  stepInfo: {
    textAlign: 'center',
  },

  stepNumber: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },

  stepTitle: {
    fontSize: '14px',
    color: '#1A1A1A',
    fontWeight: '600',
    marginTop: '0.25rem',
  },

  stepConnector: {
    position: 'absolute',
    top: '25px',
    left: '60%',
    right: '-60%',
    height: '2px',
    backgroundColor: '#E5E5E5',
    zIndex: -1,
  },

  stepConnectorActive: {
    backgroundColor: '#D4AF37',
  },

  // Main Booking Container
  bookingContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },

  bookingGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '3rem',
    alignItems: 'start',
  },

  // Booking Form
  bookingForm: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  stepContent: {
    marginBottom: '2rem',
  },

  stepTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1.5rem',
  },

  // Date Selection
  dateSelection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '2rem',
  },

  dateGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  labelIcon: {
    fontSize: '14px',
    color: '#D4AF37',
  },

  dateInput: {
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  // Guest Selection
  guestSelection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '2rem',
  },

  guestGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  selectInput: {
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    cursor: 'pointer',
  },

  // Room Selection
  roomSelection: {
    marginBottom: '2rem',
  },

  selectedRoomDisplay: {
    marginBottom: '2rem',
  },

  selectedRoomCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    border: '2px solid #D4AF37',
    borderRadius: '12px',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    gap: '1rem',
  },

  selectedRoomImage: {
    width: '120px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '8px',
    flexShrink: 0,
  },

  selectedRoomInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  selectedRoomName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  selectedRoomSpecs: {
    display: 'flex',
    gap: '1rem',
    fontSize: '13px',
    color: '#666',
  },

  selectedRoomPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },

  changeRoomBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },

  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  currentPrice: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },

  originalPrice: {
    fontSize: '0.9rem',
    color: '#999',
    textDecoration: 'line-through',
  },

  perNight: {
    fontSize: '0.9rem',
    color: '#666',
  },

  // Form Elements
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  textInput: {
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  textareaInput: {
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },

  // Payment Security
  paymentSecurity: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '10px',
    marginBottom: '2rem',
  },

  securityIcon: {
    fontSize: '24px',
    color: '#D4AF37',
  },

  securityTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  securityText: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },

  // Payment Type Selection
  paymentTypeSection: {
    marginBottom: '2rem',
  },

  paymentOptions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  },

  paymentOption: {
    border: '2px solid #E5E5E5',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '120px',
  },

  paymentOptionActive: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },

  paymentOptionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },

  radioInput: {
    marginTop: '2px',
    accentColor: '#D4AF37',
    transform: 'scale(1.2)',
  },

  paymentOptionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: '0 0 0.25rem 0',
  },

  paymentOptionDesc: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },

  paymentOptionAmount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  paymentAmount: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#D4AF37',
  },

  paymentLabel: {
    fontSize: '10px',
    color: '#666',
    marginTop: '2px',
  },

  remainingAmount: {
    fontSize: '10px',
    color: '#999',
    marginTop: '2px',
  },

  advanceNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },

  noteIcon: {
    fontSize: '16px',
    color: '#10B981',
    marginTop: '2px',
    flexShrink: 0,
  },

  noteText: {
    fontSize: '14px',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: '1.5',
  },

  // Confirmation
  confirmationDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    marginBottom: '2rem',
  },

  confirmationSection: {
    padding: '1.5rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '12px',
  },

  confirmationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #E5E5E5',
  },

  termsSection: {
    marginBottom: '2rem',
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
  },

  checkbox: {
    marginTop: '2px',
    accentColor: '#D4AF37',
  },

  link: {
    color: '#D4AF37',
    textDecoration: 'none',
  },

  // Navigation Buttons
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid #E5E5E5',
  },

  prevButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #E5E5E5',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  nextButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  bookButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  btnIcon: {
    fontSize: '14px',
  },

  // Booking Summary
  bookingSummary: {
    position: 'sticky',
    top: '100px',
  },

  summaryCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  summaryTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1.5rem',
  },

  selectedRoom: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '12px',
  },

  summaryRoomImage: {
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  summaryRoomInfo: {
    flex: 1,
  },

  summaryRoomName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: '0 0 0.5rem 0',
  },

  summaryRoomSpecs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    fontSize: '12px',
    color: '#666',
    marginBottom: '0.5rem',
  },

  summaryRoomPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#D4AF37',
  },

  summaryDetails: {
    marginBottom: '2rem',
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    fontSize: '14px',
    color: '#666',
    borderBottom: '1px solid #F0F0F0',
  },

  priceBreakdown: {
    marginBottom: '2rem',
  },

  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    fontSize: '14px',
    color: '#666',
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0 0.5rem',
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A1A1A',
    borderTop: '2px solid #D4AF37',
    marginTop: '1rem',
  },

  // Payment Summary
  paymentSummary: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(212, 175, 55, 0.3)',
  },

  paymentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },

  paymentAmountText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#D4AF37',
  },

  remainingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#666',
    paddingTop: '0.5rem',
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
  },

  summaryFeatures: {
    borderTop: '1px solid #F0F0F0',
    paddingTop: '1.5rem',
  },

  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },

  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
  },

  featureIcon: {
    color: '#D4AF37',
    fontSize: '12px',
  },

  // Success Page
  successContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    marginTop: '80px',
  },

  successContent: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '3rem',
    textAlign: 'center',
    maxWidth: '600px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  },

  successIcon: {
    fontSize: '4rem',
    color: '#D4AF37',
    marginBottom: '1.5rem',
  },

  successTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  successMessage: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },

  bookingDetails: {
    backgroundColor: '#FAF9F7',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    textAlign: 'left',
  },

  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #E5E5E5',
  },

  successActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },

  dashboardBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },

  homeBtn: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #E5E5E5',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
};

export default BookingScreen;