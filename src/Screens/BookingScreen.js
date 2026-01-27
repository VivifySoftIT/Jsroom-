import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import emailService from '../services/emailService';
import dataService from '../services/dataService';
import { 
  FaCalendarAlt, 
  FaUsers,
  FaBed,
  FaCheckCircle,
  FaCreditCard,
  FaShieldAlt,
  FaArrowRight,
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt
} from 'react-icons/fa';

const BookingScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
      // Bank transfer - always full payment
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  // Get rooms from data service
  const rooms = dataService.getRooms();

  const selectedRoomData = rooms.find(room => room.id === parseInt(bookingData.selectedRoom)) || rooms[0];

  // Create room display name
  const getRoomDisplayName = (room) => {
    return `${room.category} ${room.acType === 'ac' ? 'AC' : 'Non-AC'} Room`;
  };

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
    
    return {
      subtotal: roomTotal,
      taxes: taxes,
      serviceFee: serviceFee,
      total: grandTotal,
      paymentAmount: grandTotal, // Always full payment
      remainingAmount: 0,
      isAdvancePayment: false
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
    // Validation for each step
    if (currentStep === 1) {
      if (!bookingData.checkIn || !bookingData.checkOut) {
        alert('Please select check-in and check-out dates.');
        return;
      }
      if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
        alert('Check-out date must be after check-in date.');
        return;
      }
    }
    
    if (currentStep === 2) {
      const { firstName, lastName, email, phone } = bookingData.guestInfo;
      if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all required guest information fields (Name, Email, Phone).');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }
    }
    
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
    
    try {
      // Prepare booking data
      const bookingDetails = {
        guestName: `${bookingData.guestInfo.firstName} ${bookingData.guestInfo.lastName}`,
        guestEmail: bookingData.guestInfo.email,
        guestPhone: bookingData.guestInfo.phone,
        guestAddress: `${bookingData.guestInfo.address}, ${bookingData.guestInfo.city}, ${bookingData.guestInfo.country}`,
        roomName: getRoomDisplayName(selectedRoomData),
        roomNumber: selectedRoomData.roomNumber,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        nights: calculateNights(),
        amount: calculateTotal().total,
        paymentStatus: 'pending',
        paymentType: 'full',
        paymentMethod: 'Bank Transfer',
        specialRequests: bookingData.guestInfo.specialRequests || 'None',
        bookingSource: 'Website',
        guestInfo: bookingData.guestInfo
      };

      // Save booking to localStorage
      const savedBooking = dataService.addBooking(bookingDetails);
      
      // Enhanced logging for debugging
      console.log('=== BOOKING CONFIRMATION ===');
      console.log('Booking saved successfully:', savedBooking);
      console.log('Guest Email:', bookingDetails.guestEmail);
      console.log('Admin Email: atchayakannan03@gmail.com');
      console.log('Booking Details:', bookingDetails);
      console.log('============================');

      // Send email notification ONLY to JS ROOMS management
      try {
        const emailResult = await emailService.sendBookingConfirmation({
          ...bookingDetails,
          bookingNumber: savedBooking.bookingNumber
        });

        console.log('JS ROOMS admin email result:', emailResult);

        // Always show success - booking is saved regardless of email
        alert(`✅ BOOKING CONFIRMED!

Confirmation Number: ${savedBooking.bookingNumber}
Guest: ${bookingDetails.guestName}
Room: ${bookingDetails.roomName}
Total: ₹${bookingDetails.amount}

${emailResult.success ? 
  '📧 JS ROOMS management has been notified automatically.' : 
  '📞 JS ROOMS will be notified. Check admin system for details.'
}

You will receive a call within 30 minutes for payment details.`);

      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        
        // Still show success - booking is saved
        alert(`✅ BOOKING CONFIRMED!

Confirmation Number: ${savedBooking.bookingNumber}
Guest: ${bookingDetails.guestName}
Room: ${bookingDetails.roomName}
Total: ₹${bookingDetails.amount}

📞 JS ROOMS will contact you shortly.
Your booking is saved in our system.

For immediate assistance: +91 98765 43210`);
      }

      setCompletedBooking(savedBooking);
      setBookingComplete(true);
      
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Select Dates & Guests', icon: FaCalendarAlt },
    { number: 2, title: 'Guest Information', icon: FaUser },
    { number: 3, title: 'Bank Transfer Details', icon: FaCreditCard },
    { number: 4, title: 'Confirmation', icon: FaCheckCircle }
  ];

  if (bookingComplete && completedBooking) {
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
              Thank you for choosing JS ROOMS. Your reservation request has been received and 
              a confirmation email with bank transfer details has been sent to your email address.
            </p>
            <div style={styles.bookingDetails}>
              <h3>Booking Details</h3>
              <div style={styles.detailRow}>
                <span>Confirmation Number:</span>
                <strong>{completedBooking.bookingNumber}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Room:</span>
                <strong>{completedBooking.roomName}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Check-in:</span>
                <strong>{completedBooking.checkIn}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Check-out:</span>
                <strong>{completedBooking.checkOut}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Total Amount:</span>
                <strong>₹{completedBooking.amount.toFixed(2)}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Amount to Transfer:</span>
                <strong>₹{completedBooking.amount.toFixed(2)}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Payment Status:</span>
                <strong>Pending Bank Transfer</strong>
              </div>
            </div>
            <div style={styles.successActions}>
              <button 
                onClick={() => navigate('/home')} 
                style={styles.dashboardBtn}
              >
                Back to Home
              </button>
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
                    <img src={selectedRoomData.images?.[0]?.url || 'https://via.placeholder.com/300x200'} alt={getRoomDisplayName(selectedRoomData)} style={styles.selectedRoomImage} />
                    <div style={styles.selectedRoomInfo}>
                      <h4 style={styles.selectedRoomName}>{getRoomDisplayName(selectedRoomData)}</h4>
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
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={bookingData.guestInfo.email}
                        onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                        style={styles.textInput}
                        placeholder="your.email@example.com"
                        required
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

            {/* Step 3: Bank Transfer Details */}
            {currentStep === 3 && (
              <div style={styles.stepContent}>
                <h2 style={styles.stepTitle}>Bank Transfer Details</h2>
                
                <div style={styles.paymentSecurity}>
                  <FaShieldAlt style={styles.securityIcon} />
                  <div>
                    <h4 style={styles.securityTitle}>Secure Bank Transfer</h4>
                    <p style={styles.securityText}>Transfer the amount to our bank account to confirm your booking</p>
                  </div>
                </div>



                {/* Bank Details Section */}
                <div style={styles.bankDetailsSection}>
                  <h3 style={styles.sectionTitle}>Bank Account Details</h3>
                  <div style={styles.bankDetailsCard}>
                    <div style={styles.bankDetailRow}>
                      <span style={styles.bankDetailLabel}>Bank Name:</span>
                      <span style={styles.bankDetailValue}>State Bank of India</span>
                    </div>
                    <div style={styles.bankDetailRow}>
                      <span style={styles.bankDetailLabel}>Account Name:</span>
                      <span style={styles.bankDetailValue}>JS ROOMS LUXURY LODGE</span>
                    </div>
                    <div style={styles.bankDetailRow}>
                      <span style={styles.bankDetailLabel}>Account Number:</span>
                      <span style={styles.bankDetailValue}>12345678901234</span>
                    </div>
                    <div style={styles.bankDetailRow}>
                      <span style={styles.bankDetailLabel}>IFSC Code:</span>
                      <span style={styles.bankDetailValue}>SBIN0001234</span>
                    </div>
                    <div style={styles.bankDetailRow}>
                      <span style={styles.bankDetailLabel}>Branch:</span>
                      <span style={styles.bankDetailValue}>Chennai Main Branch</span>
                    </div>
                    <div style={styles.bankDetailRow}>
                      <span style={styles.bankDetailLabel}>Amount to Transfer:</span>
                      <span style={styles.bankDetailValueHighlight}>₹{calculateTotal().total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={styles.transferInstructions}>
                    <h4 style={styles.instructionsTitle}>Transfer Instructions:</h4>
                    <ul style={styles.instructionsList}>
                      <li>Transfer the exact amount shown above to our bank account</li>
                      <li>Use your booking reference as the transfer description</li>
                      <li>Keep the transaction receipt for your records</li>
                      <li>Your booking will be confirmed once we receive the payment</li>
                      <li>For any queries, contact us at +91 98765 43210</li>
                    </ul>
                  </div>

                  <div style={styles.paymentNote}>
                    <FaCheckCircle style={styles.noteIcon} />
                    <div>
                      <p style={styles.noteText}>
                        <strong>Important:</strong> Please complete the bank transfer within 24 hours to secure your booking. 
                        We will send you a confirmation email once the payment is received and verified.
                      </p>
                    </div>
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
                      <span>Payment Method:</span>
                      <strong>Bank Transfer</strong>
                    </div>
                    <div style={styles.confirmationRow}>
                      <span>Amount to Transfer:</span>
                      <strong>₹{calculateTotal().total.toFixed(2)}</strong>
                    </div>
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
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
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
                  <img src={selectedRoomData.images?.[0]?.url || 'https://via.placeholder.com/300x200'} alt={getRoomDisplayName(selectedRoomData)} style={styles.summaryRoomImage} />
                  <div style={styles.summaryRoomInfo}>
                    <h4 style={styles.summaryRoomName}>{getRoomDisplayName(selectedRoomData)}</h4>
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
                
                {/* Transfer Amount Display */}
                {currentStep >= 3 && (
                  <>
                    <div style={styles.paymentSummary}>
                      <div style={styles.paymentRow}>
                        <span style={styles.paymentLabel}>Transfer Amount:</span>
                        <span style={styles.paymentAmountText}>₹{calculateTotal().total.toFixed(2)}</span>
                      </div>
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

  paymentLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
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

  // Bank Details Section
  bankDetailsSection: {
    marginTop: '2rem',
  },

  bankDetailsCard: {
    backgroundColor: '#FAF9F7',
    border: '2px solid #D4AF37',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },

  bankDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid #E5E5E5',
  },

  bankDetailLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },

  bankDetailValue: {
    fontSize: '14px',
    color: '#1A1A1A',
    fontWeight: '600',
  },

  bankDetailValueHighlight: {
    fontSize: '16px',
    color: '#D4AF37',
    fontWeight: '700',
  },

  transferInstructions: {
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '10px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },

  instructionsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  instructionsList: {
    margin: 0,
    paddingLeft: '1.5rem',
    color: '#666',
    lineHeight: '1.6',
  },

  paymentNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
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