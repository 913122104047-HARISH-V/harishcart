const validatePassword = (password) => {
  const errors = [];

  if (!password || password.length < 8 || password.length > 15) {
    errors.push("Password must be between 8 and 15 characters");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must include at least one special character (!@#$%^&*)");
  }

  const weakPatterns = ["123456", "password", "qwerty"];
  if (weakPatterns.includes(password.toLowerCase())) {
    errors.push("Password is too common or weak");
  }

  return errors;
};

module.exports = validatePassword;