 // Header Scroll
document.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Validation function
function validateForm(formId, fieldsConfig) {
  const form = document.getElementById(formId);
  let valid = true;

  // Clear previous error messages
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(error => {
    error.textContent = '';
    error.classList.remove('show');
  });

  // Validate each field
  fieldsConfig.forEach(({ id, minLength, pattern, message, required }) => {
    const field = form.querySelector(`#${id}`);
    const errorMessage = form.querySelector(`#${id}Error`);
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();

    // Validating the field
    if (
      (required && !value) ||
      (minLength && value.length < minLength) ||
      (pattern && !pattern.test(value))
    ) {
      errorMessage.textContent = message;
      errorMessage.classList.add('show');
      field.classList.add('invalid');
      valid = false;
    }

    // Clear error message on focus
    field.addEventListener('focus', () => {
      errorMessage.textContent = '';
      errorMessage.classList.remove('show');
      field.classList.remove('invalid');
    });
  });

  return valid;
}

// Form Fields Configuration
const fieldsConfig = [
  // Contact Form Fields
  { id: 'firstName', minLength: 3, message: 'First Name must be at least 3 characters.', required: true },
  { id: 'lastName', minLength: 3, message: 'Last Name must be at least 3 characters.', required: true },
  { id: 'email', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    message: 'Please enter a valid email address.', required: true },
  { id: 'message', minLength: 10, message: 'Message must be at least 10 characters.', required: true }
];

// Mailing List Fields Configuration
const mailingListFieldsConfig = [
  { id: 'mailingListEmail', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    message: 'Please enter a valid email address.', required: true },
  { id: 'subscribe', message: 'You must agree to subscribe to the newsletter.', required: true }
];

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Validate the contact form
  if (validateForm('contactForm', fieldsConfig)) {
    alert('Thank you for your message!');
    document.getElementById('contactForm').reset();
  }
});

// Mailing List Submission
document.getElementById('mailingListForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Validate the mailing list form
  if (validateForm('mailingListForm', mailingListFieldsConfig)) {
    alert('Thank you for subscribing to our mailing list!');
    document.getElementById('mailingListForm').reset();
  }
});
