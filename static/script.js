document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const target = entry.target;

            // 1. Individual elements (e.g. .fade-in-up, .zoom-in)
            if (
                target.classList.contains('animate-on-scroll') &&
                !target.classList.contains('services-content') &&
                !target.classList.contains('reviews')
            ) {
                target.classList.add('animate');
            }

            // 2. Services - slide in from left
            if (target.classList.contains('services-content')) {
                const services = target.querySelectorAll('.service');
                services.forEach((service, index) => {
                    setTimeout(() => {
                        service.classList.add('animate');
                    }, index * 150); // stagger delay
                });
            }

            // 3. Reviews - fade in up one by one
            if (target.classList.contains('reviews')) {
                const reviewItems = target.querySelectorAll('.review');
                reviewItems.forEach((review, index) => {
                    review.style.animationDelay = `${index * 150}ms`;
                    review.classList.add('animate');
                });
            }

            observer.unobserve(target); // Trigger only once
        });
    });

    // Observe all relevant elements
    const targets = document.querySelectorAll('.animate-on-scroll, .services-content, .reviews');
    targets.forEach(el => observer.observe(el));
});
  
function contactButton() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

async function handleSubmit(event) {
    event.preventDefault();  // Prevent the default form submission (page reload)

    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Simple validation (you can add your own validations here)
    const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?)?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return;  // Prevent further processing if phone is invalid
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;  // Prevent further processing if email is invalid
    }

    // Create FormData to send the form fields
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('phone', phone);
    formData.append('email', email);

    try {
        const response = await fetch('http://127.0.0.1:5500/submit', {  // Make sure this is your FastAPI server's URL
            method: 'POST',
            body: formData
        });

        // Check if response status is okay (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();  // Assuming the server returns JSON
        console.log(result.message);  // Handle server response here

        alert("Form submitted successfully!");
    } catch (error) {
        console.error("Error submitting the form:", error);
        
        // More detailed error logging
        if (error instanceof TypeError) {
            alert("Network error or the server is unreachable. Please check your FastAPI server.");
        } else {
            alert(`An error occurred: ${error.message}`);
        }
    }
}





