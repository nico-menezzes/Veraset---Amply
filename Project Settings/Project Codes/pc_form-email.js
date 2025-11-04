window.Webflow ||= [];
window.Webflow.push(() => {
  // --- EMAIL FIELD VALIDATION ---
  const initEmailValidation = () => {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    if (!emailInputs.length) return;

    const ERROR_MSG = 'Please enter a valid email address.';
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const validateEmail = (input) => {
      const email = input.value.trim();
      const isValid = EMAIL_REGEX.test(email);

      if (email && !isValid) {
        input.setCustomValidity(ERROR_MSG);
      } else {
        input.setCustomValidity(''); // Clear error if valid or empty
      }
    };

    emailInputs.forEach((input) => {
      // Validate when the user leaves the field
      input.addEventListener('blur', () => validateEmail(input));
      
      // Clear validation message while typing for a better user experience
      input.addEventListener('input', () => input.setCustomValidity(''));

      // Ensure validation is run on the form's submit event, not the input's.
      const form = input.closest('form');
      if (form && !form.dataset.emailValidationAttached) {
        form.dataset.emailValidationAttached = 'true'; // Prevent attaching multiple listeners
        
        form.addEventListener('submit', (e) => {
          const formEmailInputs = form.querySelectorAll('input[type="email"]');
          formEmailInputs.forEach(formInput => {
            validateEmail(formInput);
            // Report validity to show the native browser error tooltip if invalid.
            if (!formInput.checkValidity()) {
              formInput.reportValidity();
            }
          });
        });
      }
    });
  };

  initEmailValidation();
});
