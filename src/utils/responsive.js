// Utility function to add responsive classes based on screen size
export const getResponsiveClasses = (baseClasses = '', mobileClasses = '') => {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return `${baseClasses} ${mobileClasses}`.trim();
  }
  return baseClasses;
};

// Hook to detect mobile screen size
export const useIsMobile = () => {
  if (typeof window === 'undefined') return false;
  
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
};

// Responsive style helper
export const getResponsiveStyle = (baseStyle, mobileStyle = {}) => {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return { ...baseStyle, ...mobileStyle };
  }
  return baseStyle;
};