document.addEventListener('DOMContentLoaded', function() {

  // 1. Check if GSAP loaded
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

  // 2. Sticky Nav
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // 3. ScrambleText for h1 
  gsap.to('.first-name', {
    duration: 1.2,
    scrambleText: { text: 'Ibrahim', chars: 'upperAndLowerCase', speed: 0.6 },
    ease: 'none',
    delay: 0.2
  });

  gsap.to('.last-name', {
    duration: 1.5,
    scrambleText: { text: 'Al-Howaid', chars: 'upperAndLowerCase', speed: 0.5 },
    ease: 'none',
    delay: 0.4
  });

  // 4. Hero Timeline (Reveals the hidden elements)
  var heroTl = gsap.timeline({ delay: 0.4 });

  heroTl
    .fromTo('.hero-eyebrow', { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' })
    .fromTo('.hero-desc',    { autoAlpha: 0, y: 20 },  { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-cta > *', { autoAlpha: 0, y: 16 },  { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-visual',  { autoAlpha: 0, x: 60 },  { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .fromTo('.deco-line',    { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, transformOrigin: 'top', duration: 1.2, ease: 'power2.inOut' }, '-=0.6');

  // 5. General Scroll Fade-ups (About section)
  gsap.utils.toArray('.gsap-fade').forEach(function(el) {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });

  // 6. Project Cards Batch
  ScrollTrigger.batch('.project-card', {
    onEnter: function(batch) {
      gsap.fromTo(batch, 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
      );
    },
    start: 'top 90%',
    once: true
  });

  // 7. Timeline Items
  gsap.utils.toArray('.timeline-item').forEach(function(item, i) {
    gsap.fromTo(item,
      { autoAlpha: 0, x: -40 },
      {
        autoAlpha: 1, x: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: item, start: 'top 90%', once: true }
      }
    );
  });


  // 10. Section Labels
  gsap.utils.toArray('.section-label').forEach(function(label) {
    gsap.fromTo(label,
      { autoAlpha: 0, x: -20 },
      { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: label, start: 'top 92%', once: true } }
    );
  });

// ── Connected Timeline Animation ──
  gsap.utils.toArray('.connected-timeline-item').forEach(function(item, i) {
    gsap.fromTo(item,
      { autoAlpha: 0, x: -30 }, 
      {
        autoAlpha: 1, 
        x: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { 
          trigger: item, 
          start: 'top 85%', 
          once: true 
        }
      }
    );
  });

// 3D COVERFLOW CAROUSEL LOGIC
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  
  if (cards.length > 0) {
    let currentIndex = 0;
    let autoPlayInterval;
    const totalCards = cards.length;

    function update3DCarousel() {
      cards.forEach((card, index) => {
        // Strip all 3D classes first
        card.classList.remove('card-active', 'card-prev', 'card-next', 'card-hidden');

        // Apply classes based on distance from the current active index
        if (index === currentIndex) {
          card.classList.add('card-active');
        } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
          card.classList.add('card-prev');
        } else if (index === (currentIndex + 1) % totalCards) {
          card.classList.add('card-next');
        } else {
          card.classList.add('card-hidden');
        }
      });
    }

    function nextCard() {
      currentIndex = (currentIndex + 1) % totalCards;
      update3DCarousel();
    }

    function prevCard() {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      update3DCarousel();
    }

    // Allow users to click the tilted side-cards to bring them to the front
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (card.classList.contains('card-prev')) {
          prevCard();
          resetAutoPlay();
        } else if (card.classList.contains('card-next')) {
          nextCard();
          resetAutoPlay();
        }
      });
    });

    // Arrow Buttons
    if (nextBtn) nextBtn.addEventListener('click', () => { nextCard(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevCard(); resetAutoPlay(); });

    // Auto-Play logic
    function startAutoPlay() { autoPlayInterval = setInterval(nextCard, 3500); }
    function resetAutoPlay() { clearInterval(autoPlayInterval); startAutoPlay(); }

    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    // Start it up!
    update3DCarousel();
    startAutoPlay();
  }
  // 11. Contact Section
  gsap.fromTo('#contact h2',      { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true } });
  gsap.fromTo('#contact p',       { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true } });
  gsap.fromTo('.contact-email',   { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true } });
  gsap.fromTo('.social-row a',    { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5, scrollTrigger: { trigger: '.social-row', start: 'top 92%', once: true } });

  // 12. Footer
  gsap.fromTo('footer',
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.6, scrollTrigger: { trigger: 'footer', start: 'top 98%', once: true } }
  );

  // 13. Magnetic Buttons
  document.querySelectorAll('.btn-primary, .btn-ghost, .contact-email, .nav-links a').forEach(function(el) {
    if (!el.querySelector('.mag-inner')) {
      el.innerHTML = '<span class="mag-inner">' + el.innerHTML + '</span>';
    }
    el.addEventListener('mousemove', function(e) {
      var rect = el.getBoundingClientRect();
      var dx = e.clientX - (rect.left + rect.width  / 2);
      var dy = e.clientY - (rect.top  + rect.height / 2);
      gsap.to(el,                             { x: dx * 0.35, y: dy * 0.35, duration: 0.4, ease: 'power2.out' });
      gsap.to(el.querySelector('.mag-inner'), { x: dx * 0.55, y: dy * 0.55, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', function() {
      gsap.to(el,                             { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      gsap.to(el.querySelector('.mag-inner'), { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });

});

// ── Particle Starfield Background ──
tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: 100, density: { enable: true, width: 800, height: 800 } },
      color: { value: ["#c8a96e", "#ffffff"] }, // Matches your gold accent
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 1, max: 2 } },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, outModes: "out" }
    },
    interactivity: {
      events: { 
        onHover: { enable: true, mode: ["grab", "repulse"] }
      },
      modes: { 
        grab: { 
          distance: 150, 
          links: { opacity: 0.3, color: "#c8a96e" } 
        },
        repulse: { 
          distance: 120, 
          duration: 0.8,       // Takes almost a full second to settle back down
          factor: 0.5,         // Softens the aggressive push force
          speed: 0.5,            // Slows down how fast they run away
          easing: "ease-out-quad"
        } 
      }
    }
  }
});

// ── Confetti Click Effect ──
document.querySelectorAll('.btn-confetti').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Get coordinates of the click for the confetti origin
    const rect = btn.getBoundingClientRect();
    const x = (rect.left + (rect.width / 2)) / window.innerWidth;
    const y = (rect.top + (rect.height / 2)) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: x, y: y },
      colors: ['#c8a96e', '#7b9e87', '#ffffff'] // Matches your CSS variables!
    });
  });
});

// ── Typewriter Effect (Typed.js) ──
  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: [
        'Software Developer.', 
        'Computer Enthusiast.', 
        'Professional Over-thinker.',
        'Team Player.', 
        'History Nerd.',
        'Problem Solver.',
        'Cappuccino Maniac.',
        'Pattern Finder.',
        'Cat GIF Hoarder.'
      ], // Replace these with your actual titles!
      typeSpeed: 80,      // Speed of typing
      backSpeed: 50,      // Speed of deleting
      backDelay: 1500,    // How long it pauses before deleting
      startDelay: 1000,   // Waits 1 second for GSAP to reveal the text first
      loop: true,         // Keeps it looping infinitely
      cursorChar: '|'     // The blinking cursor character
    });



// 14. Project Modal Logic
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalGithub = document.getElementById('modal-github');
  const modalDemo = document.getElementById('modal-demo');
  const closeBtn = document.querySelector('.modal-close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      // 1. Grab data from the clicked card
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const github = card.getAttribute('data-github');
      const demo = card.getAttribute('data-demo');

      // 2. Populate the modal
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // 3. Show/Hide GitHub button based on if a link exists
      if (github) {
        modalGithub.href = github;
        modalGithub.style.display = 'inline-flex';
      } else {
        modalGithub.style.display = 'none';
      }

      // 4. Show/Hide Demo button based on if a link exists
      if (demo) {
        modalDemo.href = demo;
        modalDemo.style.display = 'inline-flex';
      } else {
        modalDemo.style.display = 'none';
      }

      // 5. Open the modal
      modal.classList.add('active');
    });
  });

  // Close modal when clicking the 'X'
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Close modal when clicking on the dark background overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });


    
  }