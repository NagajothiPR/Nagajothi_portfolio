
const toggleButton = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark-mode') {
  body.classList.add('dark-mode');
  toggleButton.textContent = '☀️';
}

// Toggle on click
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');

  // Update icon
  toggleButton.textContent = isDark ? '☀️' : '🌙';

  // Save to localStorage
  localStorage.setItem('theme', isDark ? 'dark-mode' : 'light-mode');
});

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Sorry, your browser does not support Speech Recognition.");
  } else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;      // Keep listening until stopped manually
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const voiceBtn = document.getElementById('voice-search-btn');
    const statusEl = document.getElementById('voice-status');
    const micIcon = document.getElementById('mic-icon');

    let listening = false;

    function startListening() {
      recognition.start();
      listening = true;
      statusEl.textContent = "Listening...";
      statusEl.style.display = 'block';
      updateIcon();
    }

    function stopListening() {
      recognition.stop();
      listening = false;
      statusEl.textContent = "Stopped listening.";
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 1500);
      updateIcon();
    }

    function updateIcon() {
      // Change icon color and shape based on listening state
      if (listening) {
        micIcon.innerHTML = `
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="#dc3545"/>
          <line x1="12" y1="16" x2="12" y2="22" stroke="white" stroke-width="2"/>
          <line x1="8" y1="22" x2="16" y2="22" stroke="white" stroke-width="2"/>
        `;
      } else {
        micIcon.innerHTML = `
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"/>
          <path d="M19 11v2a7 7 0 0 1-14 0v-2h2v2a5 5 0 0 0 10 0v-2h2z"/>
          <path d="M12 17v4"/>
          <path d="M8 21h8"/>
        `;
      }
    }

    voiceBtn.addEventListener('click', () => {
      if (!listening) {
        startListening();
      } else {
        stopListening();
      }
    });

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const command = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
      statusEl.textContent = `Heard: "${command}"`;

      if (command.includes('about')) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('projects')) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('contact')) {
         const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }else if (command.includes('home')) {
        const projectsSection = document.getElementById('header');
        if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
    statusEl.textContent += " — Command not recognized.";
  }
};

    recognition.onerror = (event) => {
      statusEl.textContent = `Error: ${event.error}`;
    };

    recognition.onend = () => {
      // If still supposed to listen, restart recognition automatically
      if (listening) {
        recognition.start();
      } else {
        statusEl.style.display = 'none';
        updateIcon();
      }
    };

    // Initialize icon
    updateIcon();
  }




    const form = document.getElementById('contactForm');

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const nameSuccess = document.getElementById('nameSuccess');
    const emailSuccess = document.getElementById('emailSuccess');
    const messageSuccess = document.getElementById('messageSuccess');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameSuccess.textContent = '';
      emailSuccess.textContent = '';
      messageSuccess.textContent = '';

      let hasError = false;

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();

      if (name === '') {
        nameError.textContent = 'Please enter your name.';
        hasError = true;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
      if (email === '') {
        emailError.textContent = 'Email is required.';
        hasError = true;
      } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email.';
        hasError = true;
      }

      if (message === '') {
        messageError.textContent = 'Message cannot be empty.';
        hasError = true;
      }

      if (!hasError) {
       
        messageSuccess.textContent = 'Message Succesfully Submitted!';
        form.reset();
      }
    });