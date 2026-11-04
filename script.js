document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const inputGroup = emailInput.closest('.input-group');
    const errorMessage = document.getElementById('error-message');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const successMessage = document.getElementById('success-message');
    const buttonText = subscribeBtn.querySelector('.button-text');
    const buttonIcon = subscribeBtn.querySelector('i');

    // Standard RFC-compliant email checking pattern
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Live Validation Feedback
    emailInput.addEventListener('input', () => {
        const val = emailInput.value.trim();
        
        if (val === '') {
            inputGroup.classList.remove('valid', 'invalid');
            errorMessage.textContent = '';
        } else if (isValidEmail(val)) {
            inputGroup.classList.add('valid');
            inputGroup.classList.remove('invalid');
            errorMessage.textContent = '';
        } else {
            inputGroup.classList.add('invalid');
            inputGroup.classList.remove('valid');
            errorMessage.textContent = 'Please enter a valid email address.';
        }
    });

    // Form Submission Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = emailInput.value.trim();

        if (val === '') {
            inputGroup.classList.add('invalid');
            errorMessage.textContent = 'Email address cannot be blank.';
            emailInput.focus();
            return;
        }

        if (!isValidEmail(val)) {
            inputGroup.classList.add('invalid');
            errorMessage.textContent = 'Please enter a valid email address format.';
            emailInput.focus();
            return;
        }

        // Clear error text
        errorMessage.textContent = '';

        // Transition to Loading State
        const prevText = buttonText.textContent;
        buttonText.textContent = 'Subscribing...';
        buttonIcon.className = 'fa-solid fa-spinner fa-spin';
        subscribeBtn.disabled = true;

        // Simulate backend communication delay
        setTimeout(() => {
            form.style.display = 'none';
            successMessage.classList.add('show');
            console.log('Successfully subscribed:', val);
        }, 1200);
    });
});
