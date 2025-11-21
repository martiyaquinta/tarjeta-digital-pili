// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2026-09-05T21:30:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = '<p class="countdown-ended">¡El evento ha comenzado!</p>';
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Update guest fields based on number of guests
function updateGuestFields() {
    const guestCount = parseInt(document.getElementById('guests').value);
    const guestFieldsContainer = document.getElementById('guestFields');
    
    guestFieldsContainer.innerHTML = '';
    
    for (let i = 1; i <= guestCount; i++) {
        const guestDiv = document.createElement('div');
        guestDiv.className = 'guest-info';
        guestDiv.innerHTML = `
            <p class="guest-label">Invitado ${i}</p>
            <div class="form-row">
                <div class="form-group">
                    <label for="name${i}">Nombre *</label>
                    <input type="text" id="name${i}" name="name${i}" required>
                </div>
                <div class="form-group">
                    <label for="lastname${i}">Apellido *</label>
                    <input type="text" id="lastname${i}" name="lastname${i}" required>
                </div>
            </div>
        `;
        guestFieldsContainer.appendChild(guestDiv);
    }
}

// Initialize guest fields
updateGuestFields();

// Handle form submission
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message
    alert('¡Gracias por confirmar tu asistencia! Te esperamos en la fiesta.');
    
    // Reset form
    this.reset();
    updateGuestFields();
});

// Modal functions
function showAccountInfo() {
    document.getElementById('accountModal').style.display = 'block';
}

function closeAccountInfo() {
    document.getElementById('accountModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('accountModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
