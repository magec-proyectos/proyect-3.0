export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}


export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Enhanced XSS protection and input sanitization
  return input
    .trim()
    .replace(/[<>'"&]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .slice(0, 255); // Limit input length
};

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string' || email.length > 254) {
    return false;
  }
  
  // More comprehensive email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string): PasswordValidationResult => {
  const errors: string[] = [];

  if (!username || typeof username !== 'string') {
    errors.push('Username is required');
    return { isValid: false, errors };
  }

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (username.length > 20) {
    errors.push('Username must be less than 20 characters long');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  // Check for common SQL injection patterns
  const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i;
  if (sqlPatterns.test(username)) {
    errors.push('Username contains invalid characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Enhanced password validation with security checks
export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { isValid: false, errors };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Check for common weak passwords
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'qwerty', 
    'letmein', 'welcome', 'monkey', '1234567890'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common and easily guessable');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};