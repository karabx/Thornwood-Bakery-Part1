/**
 * Thornwood Bakery – Main JavaScript File
 * Handles:
 *  1. Mobile navigation toggle (hamburger menu)
 *  2. Enquiry form validation (enquiry.html)
 *  3. Contact form validation (contact.html)
 */

/* =====================================================================
   1. MOBILE NAVIGATION TOGGLE
   Adds / removes the "open" class on the nav element when the
   hamburger button is clicked. The CSS shows/hides the nav based
   on whether the class is present.
   ===================================================================== */

// Select the toggle button and the navigation element from the DOM
const navToggle = document.getElementById("navToggle");
const mainNav   = document.getElementById("mainNav");

// Only attach the event listener if both elements exist on the page
if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    // Toggle the "open" class – CSS uses this to show/hide the nav
    mainNav.classList.toggle("open");

    // Update the aria-expanded attribute for screen-reader accessibility
    const isOpen = mainNav.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* =====================================================================
   2. ENQUIRY FORM VALIDATION
   Validates all required fields before the form is submitted.
   Displays inline error messages next to invalid fields.
   Shows a success message on valid submission.
   ===================================================================== */

/**
 * Helper – marks a field as invalid and displays an error message.
 * @param {HTMLElement} field     - The input/select/textarea element.
 * @param {HTMLElement} errorEl   - The span element where the error is shown.
 * @param {string}      message   - The error text to display.
 */
function showError(field, errorEl, message) {
  field.classList.add("invalid");
  errorEl.textContent = message;
}

/**
 * Helper – clears the error state from a field.
 * @param {HTMLElement} field   - The input/select/textarea element.
 * @param {HTMLElement} errorEl - The span element to clear.
 */
function clearError(field, errorEl) {
  field.classList.remove("invalid");
  errorEl.textContent = "";
}

/**
 * Helper – validates that a string value is not empty.
 * @param {string} value - The value to check.
 * @returns {boolean}
 */
function isNotEmpty(value) {
  return value.trim().length > 0;
}

/**
 * Helper – validates an email address using a regular expression.
 * @param {string} email - The email string to validate.
 * @returns {boolean}
 */
function isValidEmail(email) {
  // Standard email format: something@something.something
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Helper – validates that a date string is in the future.
 * @param {string} dateString - The date value from an input[type="date"].
 * @returns {boolean}
 */
function isFutureDate(dateString) {
  if (!dateString) return false;
  const selected = new Date(dateString);
  const today    = new Date();
  today.setHours(0, 0, 0, 0); // Compare dates only, not times
  return selected > today;
}

// ---- Enquiry Form ----

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    // Prevent the default form submission so we can validate first
    event.preventDefault();

    // Retrieve all field and error-span elements by their IDs
    const fullName        = document.getElementById("fullName");
    const fullNameError   = document.getElementById("fullNameError");

    const email           = document.getElementById("email");
    const emailError      = document.getElementById("emailError");

    const phone           = document.getElementById("phone");
    const phoneError      = document.getElementById("phoneError");

    const enquiryType     = document.getElementById("enquiryType");
    const enquiryTypeError = document.getElementById("enquiryTypeError");

    const collectionDate  = document.getElementById("collectionDate");
    const collectionDateError = document.getElementById("collectionDateError");

    const message         = document.getElementById("message");
    const messageError    = document.getElementById("messageError");

    const formSuccess     = document.getElementById("formSuccess");

    // Track whether the form is valid; start optimistically as true
    let isValid = true;

    // --- Validate Full Name ---
    if (!isNotEmpty(fullName.value)) {
      showError(fullName, fullNameError, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(fullName, fullNameError);
    }

    // --- Validate Email ---
    if (!isNotEmpty(email.value)) {
      showError(email, emailError, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, emailError, "Please enter a valid email address (e.g. name@example.com).");
      isValid = false;
    } else {
      clearError(email, emailError);
    }

    // --- Validate Phone ---
    if (!isNotEmpty(phone.value)) {
      showError(phone, phoneError, "Please enter your phone number.");
      isValid = false;
    } else {
      clearError(phone, phoneError);
    }

    // --- Validate Enquiry Type ---
    if (!isNotEmpty(enquiryType.value)) {
      showError(enquiryType, enquiryTypeError, "Please select an enquiry type.");
      isValid = false;
    } else {
      clearError(enquiryType, enquiryTypeError);
    }

    // --- Validate Collection Date (must be a future date) ---
    if (!isNotEmpty(collectionDate.value)) {
      showError(collectionDate, collectionDateError, "Please enter your required collection date.");
      isValid = false;
    } else if (!isFutureDate(collectionDate.value)) {
      showError(collectionDate, collectionDateError, "Collection date must be a future date.");
      isValid = false;
    } else {
      clearError(collectionDate, collectionDateError);
    }

    // --- Validate Message ---
    if (!isNotEmpty(message.value)) {
      showError(message, messageError, "Please describe your order or enquiry.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, messageError, "Please provide a bit more detail (at least 10 characters).");
      isValid = false;
    } else {
      clearError(message, messageError);
    }

    // --- If all fields are valid, show the success message ---
    if (isValid) {
      // Hide the form and show the success confirmation
      enquiryForm.style.display = "none";
      formSuccess.classList.remove("hidden");

      // Scroll the success message into view smoothly
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

/* =====================================================================
   3. CONTACT FORM VALIDATION
   Same approach as the enquiry form, but for the simpler contact form
   on contact.html (name, email, subject, message).
   ===================================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve contact form fields and error spans
    const contactName       = document.getElementById("contactName");
    const contactNameError  = document.getElementById("contactNameError");

    const contactEmail      = document.getElementById("contactEmail");
    const contactEmailError = document.getElementById("contactEmailError");

    const subject           = document.getElementById("subject");
    const subjectError      = document.getElementById("subjectError");

    const contactMessage    = document.getElementById("contactMessage");
    const contactMessageError = document.getElementById("contactMessageError");

    const contactSuccess    = document.getElementById("contactSuccess");

    let isValid = true;

    // --- Validate Name ---
    if (!isNotEmpty(contactName.value)) {
      showError(contactName, contactNameError, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(contactName, contactNameError);
    }

    // --- Validate Email ---
    if (!isNotEmpty(contactEmail.value)) {
      showError(contactEmail, contactEmailError, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(contactEmail.value)) {
      showError(contactEmail, contactEmailError, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(contactEmail, contactEmailError);
    }

    // --- Validate Subject ---
    if (!isNotEmpty(subject.value)) {
      showError(subject, subjectError, "Please enter a subject for your message.");
      isValid = false;
    } else {
      clearError(subject, subjectError);
    }

    // --- Validate Message ---
    if (!isNotEmpty(contactMessage.value)) {
      showError(contactMessage, contactMessageError, "Please enter your message.");
      isValid = false;
    } else if (contactMessage.value.trim().length < 10) {
      showError(contactMessage, contactMessageError, "Your message must be at least 10 characters.");
      isValid = false;
    } else {
      clearError(contactMessage, contactMessageError);
    }

    // --- Show success confirmation if valid ---
    if (isValid) {
      contactForm.style.display = "none";
      contactSuccess.classList.remove("hidden");
      contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
