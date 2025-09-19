document.addEventListener('DOMContentLoaded', function () {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffc8c8"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 15,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 80.17060304327615,
                "color": "#1f2e4e",
                "opacity": 1,
                "width": 2.244776885211732
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 179.82017982017982,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Check if the device is mobile
    if (window.innerWidth > 768) {
        // Initialize Typed.js only for non-mobile devices
        var typed = new Typed('#typed', {
            strings: ["SEO EXPERT", "WEB Designer", "Full Stack Developer"],
            typeSpeed: 80,
            backSpeed: 70,
            backDelay: 2000, // 3 seconds delay before backspacing
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Elements to animate
    const elements = [
        { selector: '.section__title-1', animation: 'js-slide-top' },
        { selector: '.about__img', animation: 'js-slide-left' },
        { selector: '.about__shadow', animation: 'js-slide-right' },
        { selector: '.geometric-box', animation: 'js-slide-right', delay: 'js-delay-1' },
        { selector: '.about__box', animation: 'js-slide-right', delay: 'js-delay-2' },
        { selector: '.about__description', animation: 'js-slide-top', delay: 'js-delay-1' },
        { selector: '.about__list', animation: 'js-slide-top', delay: 'js-delay-2' },
        { selector: '.about__b', animation: 'js-slide-top', delay: 'js-delay-3' },
        { selector: '.but', animation: 'js-slide-top', delay: 'js-delay-4' }
    ];

    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const config = elements.find(e => el.matches(e.selector));
                if (config) {
                    el.classList.add(config.animation);
                    if (config.delay) el.classList.add(config.delay);
                    observer.unobserve(el);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize elements and observe them
    elements.forEach(item => {
        const els = document.querySelectorAll(item.selector);
        els.forEach(el => {
            el.classList.add('js-animate');
            observer.observe(el);
        });
    });
});


// about section

document.addEventListener('DOMContentLoaded', function () {
    // Client logos auto-scroll effect
    const clientLogos = document.querySelector('#about .d-flex.gap-5');
    if (clientLogos) {
        let scrollSpeed = 1;
        let direction = -1; // -1 for left, 1 for right

        function autoScrollLogos() {
            clientLogos.scrollLeft += scrollSpeed * direction;

            // Reverse direction at edges
            if (clientLogos.scrollLeft <= 0) {
                direction = 1;
            } else if (clientLogos.scrollLeft >= clientLogos.scrollWidth - clientLogos.clientWidth) {
                direction = -1;
            }

            requestAnimationFrame(autoScrollLogos);
        }

        // Start auto-scroll only if container is overflowing
        if (clientLogos.scrollWidth > clientLogos.clientWidth) {
            autoScrollLogos();
        }

        // Pause on hover
        clientLogos.parentElement.addEventListener('mouseenter', () => {
            scrollSpeed = 0;
        });

        clientLogos.parentElement.addEventListener('mouseleave', () => {
            scrollSpeed = 1;
        });
    }

    // Animate stats counters
    const stats = [
        { element: document.querySelector('#about .text-primary.display-6'), target: 300, suffix: '%' },
        { element: document.querySelector('#about .text-success.display-6'), target: 50, suffix: '+' },
        { element: document.querySelector('#about .text-warning.display-6'), target: 200, suffix: '+' }
    ];

    function animateCounters() {
        stats.forEach(stat => {
            if (stat.element && !stat.animated) {
                const duration = 2000; // 2 seconds
                const start = 0;
                const increment = stat.target / (duration / 16); // 60fps
                let current = start;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.target) {
                        clearInterval(timer);
                        current = stat.target;
                        stat.animated = true;
                    }
                    stat.element.textContent = Math.floor(current) + stat.suffix;
                }, 16);
            }
        });
    }

    // Intersection Observer to trigger animations when section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(aboutSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// about icon slider 

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('client-logos-slider');
    const logos = slider.children;
    const logoCount = logos.length / 2; // since duplicated
    let current = 0;
    let isTransitioning = false;
    let intervalId = null;
    let isPaused = false;

    function slideOneLogo() {
        if (isTransitioning || isPaused) return;
        isTransitioning = true;
        current++;
        const logoWidth = logos[0].offsetWidth + 40; // 40px gap-5
        slider.style.transition = "transform 0.5s";
        slider.style.transform = `translateX(-${current * logoWidth}px)`;

        slider.addEventListener('transitionend', function handler() {
            if (current >= logoCount) {
                slider.style.transition = "none";
                slider.style.transform = "translateX(0px)";
                current = 0;
            }
            isTransitioning = false;
            slider.removeEventListener('transitionend', handler);
        });
    }

    function startSlider() {
        if (!intervalId) {
            intervalId = setInterval(slideOneLogo, 2000);
        }
    }

    function stopSlider() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    slider.addEventListener('mouseenter', function () {
        isPaused = true;
        stopSlider();
    });

    slider.addEventListener('mouseleave', function () {
        isPaused = false;
        startSlider();
    });

    startSlider();
});