// Mobile utility functions for responsive design

// Check if device is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

// Check if device is tablet
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 968 && window.innerWidth > 768;
};

// Get responsive style based on screen size
export const getResponsiveStyle = (baseStyle, mobileStyle = {}, tabletStyle = {}) => {
  if (isMobile()) {
    return { ...baseStyle, ...mobileStyle };
  }
  if (isTablet()) {
    return { ...baseStyle, ...tabletStyle };
  }
  return baseStyle;
};

// Apply mobile classes to elements
export const applyMobileClasses = () => {
  if (typeof document === 'undefined') return;
  
  const elements = {
    // Progress steps
    '.progressSteps': 'progress-mobile',
    '.progressStep': 'step-mobile',
    '.stepCircle': 'step-circle-mobile',
    '.stepIcon': 'step-icon-mobile',
    '.stepInfo': 'step-text-mobile',
    '.stepTitle': 'step-title-mobile',
    '.stepNumber': 'step-number-mobile',
    
    // Booking grid
    '.bookingGrid': 'booking-grid-mobile',
    '.bookingSummary': 'booking-summary-mobile',
    '.selectedRoomCard': 'selected-room-mobile',
    '.selectedRoomImage': 'selected-room-image-mobile',
    
    // Forms
    '.formGrid': 'form-grid-mobile',
    '.formRow': 'form-row-mobile',
    
    // Rooms
    '.roomsGrid': 'grid-1-col',
    '.roomCard': 'room-card-mobile',
    '.roomActions': 'room-actions-mobile',
    
    // Modals
    '.modalOverlay': 'modal-overlay-mobile',
    '.modalContent': 'modal-content-mobile',
    '.modalHeader': 'modal-header-mobile',
    '.modalBody': 'modal-body-mobile',
    '.modalFooter': 'modal-footer-mobile',
    
    // Admin
    '.adminSidebar': 'admin-sidebar-mobile',
    '.adminMain': 'admin-main-mobile',
    '.adminControls': 'admin-controls-mobile',
    '.adminSearch': 'admin-search-mobile',
    '.adminFilters': 'admin-filters-mobile',
    '.adminGrid': 'admin-grid-mobile',
    
    // General
    '.heroSection': 'hero-section',
    '.sectionPadding': 'section-padding',
    '.cardPadding': 'card-padding',
    '.grid2Col': 'grid-2-col-mobile',
    '.grid3Col': 'grid-3-col-mobile',
    '.grid4Col': 'grid-4-col-mobile',
    '.flexCol': 'flex-col-mobile',
    '.textCenter': 'text-center-mobile',
    '.fullWidth': 'full-width-mobile'
  };
  
  if (isMobile()) {
    Object.entries(elements).forEach(([selector, className]) => {
      const els = document.querySelectorAll(selector);
      els.forEach(el => el.classList.add(className));
    });
  }
};

// Remove mobile classes
export const removeMobileClasses = () => {
  if (typeof document === 'undefined') return;
  
  const mobileClasses = [
    'progress-mobile', 'step-mobile', 'step-circle-mobile', 'step-icon-mobile',
    'step-text-mobile', 'step-title-mobile', 'step-number-mobile',
    'booking-grid-mobile', 'booking-summary-mobile', 'selected-room-mobile',
    'selected-room-image-mobile', 'form-grid-mobile', 'form-row-mobile',
    'grid-1-col', 'room-card-mobile', 'room-actions-mobile',
    'modal-overlay-mobile', 'modal-content-mobile', 'modal-header-mobile',
    'modal-body-mobile', 'modal-footer-mobile', 'admin-sidebar-mobile',
    'admin-main-mobile', 'admin-controls-mobile', 'admin-search-mobile',
    'admin-filters-mobile', 'admin-grid-mobile', 'hero-section',
    'section-padding', 'card-padding', 'grid-2-col-mobile',
    'grid-3-col-mobile', 'grid-4-col-mobile', 'flex-col-mobile',
    'text-center-mobile', 'full-width-mobile'
  ];
  
  mobileClasses.forEach(className => {
    const els = document.querySelectorAll(`.${className}`);
    els.forEach(el => el.classList.remove(className));
  });
};

// Initialize responsive behavior
export const initResponsive = () => {
  if (typeof window === 'undefined') return;
  
  const handleResize = () => {
    removeMobileClasses();
    if (isMobile()) {
      applyMobileClasses();
    }
  };
  
  // Apply on load
  handleResize();
  
  // Apply on resize
  window.addEventListener('resize', handleResize);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

// Touch-friendly button styles
export const getTouchFriendlyStyle = (baseStyle) => {
  if (isMobile()) {
    return {
      ...baseStyle,
      minHeight: '44px',
      minWidth: '44px',
      padding: '12px 20px',
      fontSize: '16px'
    };
  }
  return baseStyle;
};

// Mobile-optimized input styles
export const getMobileInputStyle = (baseStyle) => {
  if (isMobile()) {
    return {
      ...baseStyle,
      fontSize: '16px', // Prevents zoom on iOS
      padding: '12px 16px',
      minHeight: '44px'
    };
  }
  return baseStyle;
};