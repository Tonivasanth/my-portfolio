/* ==========================================================================
   Toni Vasanth - Data Analyst Portfolio JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    initParticleCanvas();
    initTypewriter();
    initNavbarScroll();
    initStatsCounter();
    initFilterTabs();
    initDashboardRotators();
    initLightbox();
    initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Interactive Data Particle Network Canvas Background
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
            this.color = ['rgba(99, 102, 241, ', 'rgba(236, 72, 153, ', 'rgba(56, 189, 248, '][
                Math.floor(Math.random() * 3)
            ];
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color + '0.8)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction push
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let angle = Math.atan2(dy, dx);
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                }
            }

            this.draw();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    let alpha = (1 - dist / 130) * 0.25;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((particle) => particle.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

/* --------------------------------------------------------------------------
   2. Hero Typewriter Animation
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const target = document.getElementById('typing-role');
    if (!target) return;

    const roles = [
        'Data Analyst',
        'Power BI & Tableau Developer',
        'Machine Learning & AI Enthusiast',
        'Full-Stack Data Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            target.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            target.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2200; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll Blur & Section Active Indicator
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. Stats Counter Animation
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    let animated = false;

    window.addEventListener('scroll', function () {
        const statsSection = document.getElementById('about');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !animated) {
            animated = true;
            counters.forEach((counter) => {
                const targetStr = counter.getAttribute('data-target') || counter.textContent;
                const target = parseFloat(targetStr);
                const isFloat = targetStr.includes('.');
                let count = 0;
                const speed = 40;
                const increment = target / speed;

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = isFloat ? count.toFixed(1) : Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.textContent = isFloat ? target.toFixed(1) : target;
                    }
                };
                updateCount();
            });
        }
    });
}

/* --------------------------------------------------------------------------
   5. Interactive Filter Tabs (Projects & Skills)
   -------------------------------------------------------------------------- */
function initFilterTabs() {
    // Project Filter
    const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
    const projectCards = document.querySelectorAll('[data-project-category]');

    projectFilterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            projectFilterBtns.forEach((b) => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-project-filter');

            projectCards.forEach((card) => {
                if (filter === 'all' || card.getAttribute('data-project-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill Filter
    const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
    const skillCategories = document.querySelectorAll('[data-skill-category]');

    skillFilterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            skillFilterBtns.forEach((b) => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-skill-filter');

            skillCategories.forEach((cat) => {
                if (filter === 'all' || cat.getAttribute('data-skill-category') === filter) {
                    cat.style.display = 'block';
                    cat.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. Dashboard Visual Rotator & Double-Click Live Trigger
   -------------------------------------------------------------------------- */
function initDashboardRotators() {
    const rotators = document.querySelectorAll('[data-rotator]');

    rotators.forEach((rotator) => {
        const img = rotator.querySelector('img');
        const liveUrl = rotator.getAttribute('data-live-url');
        const imagesJson = rotator.getAttribute('data-rotator-images');

        if (!img || !imagesJson) return;

        let images = [];
        try {
            images = JSON.parse(imagesJson);
        } catch (e) {
            console.error('Failed to parse rotator images:', e);
        }

        if (!images.length) return;

        let currentIndex = 0;

        // Single click -> Rotate Image
        rotator.addEventListener('click', function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;

            img.style.transform = 'scale(0.94)';
            img.style.opacity = '0.7';

            setTimeout(() => {
                img.src = images[currentIndex];
                img.style.transform = 'scale(1)';
                img.style.opacity = '1';
            }, 180);
        });

        // Double click -> Open Live Dashboard Link if available
        if (liveUrl) {
            rotator.addEventListener('dblclick', function (e) {
                e.stopPropagation();
                window.open(liveUrl, '_blank');
            });
        }
    });
}

/* --------------------------------------------------------------------------
   7. Fullscreen Lightbox Modal
   -------------------------------------------------------------------------- */
function initLightbox() {
    const modal = document.getElementById('imageLightboxModal');
    const modalImg = document.getElementById('lightboxModalImg');
    const closeBtn = document.getElementById('lightboxCloseBtn');

    if (!modal || !modalImg) return;

    // Trigger on elements with data-lightbox
    document.addEventListener('click', function (e) {
        const trigger = e.target.closest('[data-lightbox]');
        if (trigger) {
            const imgSrc = trigger.getAttribute('data-lightbox') || trigger.src;
            if (imgSrc) {
                modalImg.src = imgSrc;
                modal.classList.add('show');
            }
        }
    });

    closeBtn?.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

/* --------------------------------------------------------------------------
   8. Back To Top Floating Action
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
