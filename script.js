// Smart Healthcare Assistant Portal - script.js
// All main JS logic for UI, features, and effects

// Loader Animation
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = 'none', 500);
    }, 900); // Loader visible for 0.9s
});

// Navbar Section Switching
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const target = this.getAttribute('href').substring(1);
        sections.forEach(sec => {
            if (sec.id === target) sec.classList.add('active');
            else sec.classList.remove('active');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Symptom Checker Logic
const symptomForm = document.getElementById('symptomForm');
const symptomResult = document.getElementById('symptomResult');
const symptomData = {
    fever: {
        disease: 'Common Cold, Flu, COVID-19',
        advice: 'Stay hydrated, rest, monitor temperature. Consult doctor if fever persists.'
    },
    cough: {
        disease: 'Bronchitis, Asthma, COVID-19',
        advice: 'Drink warm fluids, avoid irritants. Seek medical help if severe.'
    },
    headache: {
        disease: 'Migraine, Tension Headache, Dehydration',
        advice: 'Rest in a quiet room, stay hydrated. See a doctor if frequent.'
    },
    stomachache: {
        disease: 'Indigestion, Food Poisoning, Gastritis',
        advice: 'Eat light, avoid spicy food. Visit doctor if pain is severe.'
    },
    fatigue: {
        disease: 'Anemia, Thyroid Issues, Sleep Deprivation',
        advice: 'Get enough sleep, eat balanced diet. Consult doctor if ongoing.'
    },
    rash: {
        disease: 'Allergy, Infection, Dermatitis',
        advice: 'Keep area clean, avoid scratching. See doctor if spreading.'
    }
};
symptomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = document.getElementById('symptom').value;
    if (!value || !symptomData[value]) {
        symptomResult.textContent = 'Please select a symptom.';
        return;
    }
    const { disease, advice } = symptomData[value];
    symptomResult.innerHTML = `<strong>Possible Disease:</strong> ${disease}<br><strong>Advice:</strong> ${advice}`;
});

// BMI Calculator Logic
const bmiForm = document.getElementById('bmiForm');
const bmiResult = document.getElementById('bmiResult');
bmiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (!height || !weight || height < 50 || weight < 10) {
        bmiResult.textContent = 'Please enter valid height and weight.';
        return;
    }
    const bmi = weight / ((height / 100) ** 2);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    bmiResult.innerHTML = `Your BMI: <span>${bmi.toFixed(1)}</span> (<span>${category}</span>)`;
});

// Appointment Booking Logic
const appointmentForm = document.getElementById('appointmentForm');
const appointmentResult = document.getElementById('appointmentResult');
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('patientName').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value;
    // Simple validation
    if (!name || !email || !date) {
        appointmentResult.textContent = 'Please fill all fields.';
        return;
    }
    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        appointmentResult.textContent = 'Please enter a valid email.';
        return;
    }
    // Store in localStorage
    const appointment = { name, email, date };
    localStorage.setItem('appointment', JSON.stringify(appointment));
    appointmentResult.innerHTML = `<span style="color: var(--success)">Appointment booked for ${name} on ${date}!</span>`;
    appointmentForm.reset();
});

// Health Tips Logic
const tips = [
    "Drink plenty of water every day.",
    "Exercise regularly for at least 30 minutes.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Get 7-8 hours of sleep every night.",
    "Wash your hands frequently.",
    "Take breaks from screens to rest your eyes.",
    "Practice mindfulness or meditation.",
    "Avoid smoking and limit alcohol consumption.",
    "Maintain a healthy weight.",
    "Visit your doctor for regular checkups."
];
const healthTip = document.getElementById('healthTip');
const newTipBtn = document.getElementById('newTip');
function showRandomTip() {
    const idx = Math.floor(Math.random() * tips.length);
    healthTip.textContent = tips[idx];
}
newTipBtn.addEventListener('click', showRandomTip);
// Show a tip on load
showRandomTip();

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        darkModeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkModeToggle.textContent = '☀️';
    }
});
// Load theme from localStorage
(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.textContent = '☀️';
    }
})();

// Scroll Animation for Cards
const cards = document.querySelectorAll('.card');
function revealOnScroll() {
    const trigger = window.innerHeight * 0.92;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < trigger) {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        } else {
            card.style.opacity = 0;
            card.style.transform = 'translateY(40px)';
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
// Initial state for animation
cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(40px)';
});
