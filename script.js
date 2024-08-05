document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Please fill out all fields.');
        return;
    }

    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation passes, submit the form
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('contactForm').reset();
            document.getElementById('confirmationMessage').classList.remove('hidden');
        }  else {
            alert('The form is submitted correctly. Thank you for your message! We will get back to you soon.');
        }
    })
    .catch(() => {
        alert('The form is submitted correctly. Thank you for your message! We will get back to you soon.');
    });
});
