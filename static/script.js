document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          const headerOffset = 80; // Adjust if you have a fixed header
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
  
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      });
    });
  });

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("navbar-logo");
    if (logo) {
        logo.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
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





