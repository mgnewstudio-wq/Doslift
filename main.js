function initMobileMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const navLinks = document.getElementById('mobileMenu'); // Changed from 'nav'
    const mobileLinks = document.querySelectorAll('#mobileMenu .nav-link');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        /* Close menu when clicking a link */
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}



/* Header Scroll Effect */
function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* Project Slider (Horizontal Scroll) */
function initProjectSlider() {
    const slider = document.querySelector('.projects-grid');
    const dots = document.querySelectorAll('.project-dot');

    if (slider && dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots
                dots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                dot.classList.add('active');

                // Scroll slider logic would go here
                // For now just console log
                console.log(`Scrolled to slide ${index + 1}`);
            });
        });
    }
}

/* Reveal Animations on Scroll */
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .project-card, .service-card');
    revealElements.forEach(el => observer.observe(el));
}

/* Contact Form Handling */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // detailed form submission logic would go here
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    }
}

/* Brands Slider (Infinite Scroll) */
/* Brands Slider (Interactive) */
function initBrandsSlider() {
    const slides = document.querySelectorAll('.brand-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Initialize
    showSlide(0);
    startAutoSlide();

    function showSlide(index) {
        // Handle wrap-around
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        currentSlide = index;

        // Update Slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        // Update Dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
        resetInterval();
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
        resetInterval();
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
}

/* Project Image Slider with Touch Support */
function initProjectSlider() {
    const slider = document.querySelector('.project-slider-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });

    // Button events
    if (prevBtn && nextBtn) {
        const card = document.querySelector('.project-card');
        const cardWidth = card ? card.offsetWidth : 350;

        prevBtn.addEventListener('click', () => {
            const gap = 24;
            slider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const gap = 24;
            slider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }
}

/* Catalog Accordion */
function initCatalogAccordion() {
    const items = document.querySelectorAll('.catalog-item');

    items.forEach(item => {
        // Hover for desktop
        item.addEventListener('mouseenter', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });

        // Click/Touch for mobile
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Auto-update footer year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* Smooth Scroll for Anchor Links */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Hero Slider */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;
let slideInterval;

function initHeroSlider() {
    if (totalSlides === 0) return;

    // Show first slide
    showSlide(0);

    // Event listeners
    document.querySelector('.slider-arrow.next')?.addEventListener('click', nextSlide);
    document.querySelector('.slider-arrow.prev')?.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Start auto-slide
    startAutoSlide();
}

function showSlide(index) {
    // Handle wrap-around
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    currentSlide = index;

    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetInterval();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetInterval();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
}


/* Stat Counter Animation for About Section */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    if (!statNumbers.length) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const countUp = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16); // 60fps

        const animate = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.count, 10);
                countUp(element, target);
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => observer.observe(num));
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initHeader();
    initMobileMenu();
    initProjectSlider();
    initCatalogAccordion();
    initSmoothScroll();
    initRevealAnimations();
    initContactForm();
    initBrandsSlider();
    initProjectsGrid();
    initStatCounters();
    initReviewsSlider();
});

/* Projects Grid with Dynamic Data */
function initProjectsGrid() {
    const tabs = document.querySelectorAll('.city-tab');
    const gridContainer = document.getElementById('projectsGrid');
    const paginationContainer = document.querySelector('.projects-pagination');
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    if (!tabs.length || !gridContainer) return;

    // Full Project Data
    const projectData = [
        // Almaty (22 projects)
        { city: 'almaty', name: 'ЖК «Zhuldyz Residence»', desc: 'Жилой комплекс премиум-класса', image: 'assets/projects/zhuldyz.jpg' },
        { city: 'almaty', name: 'ЖК «Maxima city»', desc: 'Современный жилой комплекс', image: 'assets/projects/maxima.jpg' },
        { city: 'almaty', name: 'ЖК «Buta legend»', desc: 'Элитный жилой комплекс', image: 'assets/projects/buta.png' },
        { city: 'almaty', name: 'ЖК «Madeniet»', desc: 'Жилой комплекс', image: 'assets/projects/madeniet.png' },
        { city: 'almaty', name: 'ЖК «Aura»', desc: 'Жилой комплекс бизнес-класса', image: 'assets/projects/aura.jpg' },
        { city: 'almaty', name: 'ЖК «Keruen»', desc: 'Жилой комплекс', image: 'assets/projects/keruen.jpg' },
        { city: 'almaty', name: 'ЖК «M. Park»', desc: 'Жилой комплекс', image: 'assets/projects/mpark.jpg' },
        { city: 'almaty', name: 'ЖК «Altay»', desc: 'Жилой комплекс', image: 'assets/projects/altay.jpg' },
        { city: 'almaty', name: 'ЖК «Abai city»', desc: 'Современный квартал', image: 'assets/projects/abai_city.jpg' },
        { city: 'almaty', name: 'ЖК «Time city»', desc: 'Жилой комплекс', image: 'assets/projects/time_city.jpg' },
        { city: 'almaty', name: 'ЖК «Гулана»', desc: 'Жилой комплекс', image: 'assets/projects/gulana.jpg' },
        { city: 'almaty', name: 'ЖК «Ожет»', desc: 'Жилой комплекс', image: 'assets/projects/ozhet.jpg' },
        { city: 'almaty', name: 'Микрорайон «Жас Канат»', desc: 'Жилой массив', image: 'assets/projects/zhas_kanat.jpg' },
        { city: 'almaty', name: 'НИШ Калкаман', desc: '11 лифтов для школы', image: 'assets/projects/nis.jpg' },
        { city: 'almaty', name: 'Больница «Сызганова»', desc: 'Медицинское учреждение', image: 'assets/projects/syzganova.jpg' },
        { city: 'almaty', name: 'ЖК «Атмосфера»', desc: 'Жилой комплекс', image: 'assets/projects/atmosfera.jpg' },
        { city: 'almaty', name: 'ЖК «Арлан»', desc: 'Жилой комплекс', image: 'assets/projects/arlan.png' },
        { city: 'almaty', name: 'ЖК «Buta Legasy»', desc: 'Жилой комплекс', image: 'assets/projects/buta_legacy.jpg' },
        { city: 'almaty', name: 'ЖК «Sunsity»', desc: 'Жилой комплекс' },
        { city: 'almaty', name: 'ЖК «Buta Fenomen»', desc: 'Жилой комплекс', image: 'assets/projects/buta_fenomen.jpg' },
        { city: 'almaty', name: 'Онкологический центр', desc: 'Республиканский центр' },
        { city: 'almaty', name: 'Ортопедический центр', desc: 'Республиканский центр' },

        // Shymkent (21 projects)
        { city: 'shymkent', name: 'ЖК «Capital»', desc: 'Жилой комплекс', image: 'assets/projects/capital.jpg' },
        { city: 'shymkent', name: 'ЖК «Atlant»', desc: 'Жилой комплекс', image: 'assets/projects/atlant.jpg' },
        { city: 'shymkent', name: 'ЖК «Damdes city»', desc: 'Жилой комплекс', image: 'assets/projects/damdes.jpg' },
        { city: 'shymkent', name: 'ЖК «Parasat»', desc: 'Жилой комплекс', image: 'assets/projects/parasat.jpg' },
        { city: 'shymkent', name: 'ЖК «Panorama park»', desc: 'Жилой комплекс', image: 'assets/projects/panorama_park.jpg' },
        { city: 'shymkent', name: 'ЖК «Turan»', desc: 'Жилой комплекс', image: 'assets/projects/turan_labeled.jpg' },
        { city: 'shymkent', name: 'ЖК «Uly dala»', desc: 'Жилой комплекс', image: 'assets/projects/uly_dala.jpg' },
        { city: 'shymkent', name: 'Микрорайон «Нурсат»', desc: 'Жилой район', image: 'assets/projects/nursat.jpg' },
        { city: 'shymkent', name: 'Микрорайон «Шымсити»', desc: 'Жилой район' },
        { city: 'shymkent', name: 'Микрорайон «Туран»', desc: 'Жилой район' },
        { city: 'shymkent', name: 'ЖК «Тенгри»', desc: 'Жилой комплекс', image: 'assets/projects/tengri.jpg' },
        { city: 'shymkent', name: 'ЖК «Viva»', desc: 'Жилой комплекс', image: 'assets/projects/viva.jpg' },
        { city: 'shymkent', name: 'ЖК «Birlik»', desc: 'Жилой комплекс', image: 'assets/projects/birlik.jpg' },
        { city: 'shymkent', name: 'ЖК «Otyrar»', desc: 'Жилой комплекс', image: 'assets/projects/otyrar.jpg' },
        { city: 'shymkent', name: 'ЖК «Керемет»', desc: 'Жилой комплекс', image: 'assets/projects/keremet.jpg' },
        { city: 'shymkent', name: 'ЖК «Гранд Береке»', desc: 'Жилой комплекс', image: 'assets/projects/grand_bereke.jpg' },
        { city: 'shymkent', name: 'ЖК «Бахыт»', desc: 'Жилой комплекс', image: 'assets/projects/bakhyt.jpg' },
        { city: 'shymkent', name: 'ЖК «Әлем Парк»', desc: 'Жилой комплекс' },
        { city: 'shymkent', name: 'ЖК «Art house»', desc: 'Жилой комплекс' },
        { city: 'shymkent', name: 'ЖК «Standard city»', desc: 'Жилой комплекс', image: 'assets/projects/standard_city.jpg' },
        { city: 'shymkent', name: 'АДЦ Шымкент', desc: 'Административный центр', image: 'assets/projects/adc.jpg' },
        { city: 'shymkent', name: 'ТД «Технодом»', desc: 'Торговый дом' },
        { city: 'shymkent', name: 'Автосалон «Kia»', desc: 'Автомобильный центр Allur', image: 'assets/projects/kia_allur.jpg' },

        // Astana (6 projects)
        { city: 'astana', name: 'БЦ «Дипломат»', desc: 'Бизнес-центр', image: 'assets/projects/diplomat.jpg' },
        { city: 'astana', name: 'Военные общежития', desc: 'Государственный объект', image: 'assets/projects/military_dorm.jpg' },
        { city: 'astana', name: 'Университет Сейфуллина', desc: 'Образовательное учреждение', image: 'assets/projects/seifullin_university.jpg' },
        { city: 'astana', name: 'ЖК «Лакшери»', desc: 'Жилой комплекс', image: 'assets/projects/luxury.jpg' },
        { city: 'astana', name: 'Автосалон «Kia»', desc: 'Киа центр Астана', image: 'assets/projects/kia_astana.jpg' },
        { city: 'astana', name: 'ЖК «Улы Дала»', desc: 'Жилой комплекс', image: 'assets/projects/uly_dala_astana.jpg' },

        // Other Cities (Turkestan, Taldykorgan, Ust-Kamenogorsk) (3 projects)
        { city: 'other', name: 'АДЦ Туркестан', desc: 'Туркестан' },
        { city: 'other', name: 'Адм. здание «Нурлы Жол»', desc: 'Талдыкорган' },
        { city: 'other', name: 'Автосалон «Kia»', desc: 'Усть-Каменогорск' }
    ];

    const ITEMS_PER_PAGE = 6;
    let currentCity = 'almaty';
    let currentPage = 0;

    function getCardsForCity(city) {
        return projectData.filter(item => item.city === city);
    }

    function createCardElement(project) {
        const div = document.createElement('div');
        div.className = 'project-card';
        // Use image if available, else standard gradient/fallback will apply via CSS if configured, 
        // OR we can leave style empty to let CSS handle default.
        const imageStyle = project.image ? `background-image: url('${project.image}'); background-size: cover; background-position: center;` : '';

        div.innerHTML = `
            <div class="project-image" style="${imageStyle}"></div>
            <div class="project-info">
                <h4>${project.name}</h4>
                <p>${project.desc}</p>
            </div>
        `;
        return div;
    }

    function updatePaginationDots(totalCards) {
        const totalPages = Math.ceil(totalCards / ITEMS_PER_PAGE);
        paginationContainer.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'project-dot' + (i === currentPage ? ' active' : '');
            dot.dataset.page = i;
            dot.addEventListener('click', () => {
                currentPage = i;
                showPage(currentCity, currentPage);
            });
            paginationContainer.appendChild(dot);
        }

        // Hide pagination if only 1 page
        paginationContainer.style.display = totalPages <= 1 ? 'none' : 'flex';
    }

    function showPage(city, page) {
        currentPage = page;
        const cityProjects = getCardsForCity(city);
        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageProjects = cityProjects.slice(startIndex, endIndex);

        // Clear grid
        gridContainer.innerHTML = '';

        // Render cards
        pageProjects.forEach((project, index) => {
            const card = createCardElement(project);
            gridContainer.appendChild(card);

            // Staggered animation
            setTimeout(() => {
                card.classList.add('reveal');
            }, index * 100);
        });

        // Update dots
        document.querySelectorAll('.project-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === page);
        });

        // Update stats (hidden but kept for logic)
        const visibleCount = pageProjects.length;
        if (visibleCountEl) visibleCountEl.textContent = visibleCount;
        if (totalCountEl) totalCountEl.textContent = cityProjects.length;
    }

    const cityNames = {
        'almaty': 'АЛМАТЫ',
        'shymkent': 'ШЫМКЕНТ',
        'astana': 'АСТАНА',
        'other': 'ДРУГИЕ ГОРОДА'
    };

    function switchCity(city) {
        currentCity = city;
        currentPage = 0;

        const cityProjects = getCardsForCity(city);
        updatePaginationDots(cityProjects.length);
        showPage(city, 0);

        // Update Tracker
        const trackerCity = document.getElementById('trackerCity');
        const trackerCountNum = document.getElementById('trackerCountNum');

        if (trackerCity) {
            trackerCity.style.opacity = '0';
            trackerCity.style.transform = 'translateY(10px)';

            setTimeout(() => {
                // Determine city name from data attribute or map
                trackerCity.textContent = cityNames[city] || city;
                trackerCity.style.opacity = '1';
                trackerCity.style.transform = 'translateY(0)';
            }, 200);
        }

        if (trackerCountNum) {
            // Animate number
            const startVal = parseInt(trackerCountNum.textContent) || 0;
            const endVal = cityProjects.length;
            animateValue(trackerCountNum, startVal, endVal, 500);
        }

        // Update tab counts display
        //tabs.forEach(tab => {
           // const tabCity = tab.dataset.city;
            //const count = getCardsForCity(tabCity).length;
          //  const countSpan = tab.querySelector('.tab-count');
           // if (countSpan) countSpan.textContent = `(${count})`;
       // });
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            switchCity(tab.dataset.city);
        });
    });

    // Initialize
    switchCity('almaty');

    // Mobile: Scroll Button to Expand Projects Grid
    const scrollBtn = document.getElementById('projectsScrollBtn');
    const gridWrapper = document.getElementById('projectsGridWrapper');

    if (scrollBtn && gridWrapper) {
        scrollBtn.addEventListener('click', () => {
            gridWrapper.classList.add('expanded');
        });
    }
}

/* Reviews/Certificates Slider and Lightbox */
function initReviewsSlider() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.querySelector('.reviews-prev');
    const nextBtn = document.querySelector('.reviews-next');
    const cards = document.querySelectorAll('.cert-card');
    const lightbox = document.getElementById('certLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    if (!track) return;

    // Slider Navigation
    const scrollAmount = 412; // Card width (380) + gap (32)
    let autoSlideInterval;

    function scrollNext() {
        // Check if at end, loop back to start
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    function scrollPrev() {
        // Check if at start, loop to end
        if (track.scrollLeft <= 10) {
            track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }

    // Auto-slide every 4 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(scrollNext, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollPrev();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollNext();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Lightbox functionality
    let currentIndex = 0;
    const cardImages = Array.from(cards).map(card => card.dataset.img);

    function showLightboxImage(index) {
        if (index < 0) index = cardImages.length - 1;
        if (index >= cardImages.length) index = 0;
        currentIndex = index;
        if (lightboxImage && cardImages[currentIndex]) {
            lightboxImage.src = cardImages[currentIndex];
        }
    }

    // Lightbox Open
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            if (lightbox && lightboxImage && cardImages[currentIndex]) {
                lightboxImage.src = cardImages[currentIndex];
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                stopAutoSlide(); // Pause auto-slide when lightbox is open
            }
        });
    });

    // Lightbox Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentIndex + 1);
        });
    }

    // Lightbox Close
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            startAutoSlide(); // Resume auto-slide when lightbox closes
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener('click', closeLightbox);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showLightboxImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showLightboxImage(currentIndex + 1);
            }
        }
    });
}

/* =====================================================
   Spheres 3D Carousel Logic
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    init3DCarousel();
});

function init3DCarousel() {
    const carousel = document.getElementById('spheresCarousel');
    if (!carousel) return;

    // Use the correct class name as per HTML
    const cards = Array.from(carousel.querySelectorAll('.carousel-3d-card'));
    if (cards.length === 0) return;

    // Configuration
    const cardSpacing = 200; // Spacing between cards (px)
    const depthSpacing = 120; // Z-depth step (px)
    const rotateAngle = 10;   // Rotation angle per step (deg)
    const autoPlaySpeed = 3000;

    // State
    const totalCards = cards.length;
    let activeIndex = Math.floor(totalCards / 2);
    let autoPlayInterval;

    // Drag State
    let isDragging = false;
    let startX = 0;
    let currentDragX = 0;
    let isClick = true;

    // --- Core Logic ---

    // Calculate shortest visual distance in a circle
    // Returns e.g. -2, -1, 0, 1, 2
    function getShortestDistance(from, to, length) {
        let diff = to - from;
        if (diff > length / 2) diff -= length;
        if (diff < -length / 2) diff += length;
        return diff;
    }

    function updateCarousel() {
        // dragOffset in index units (float)
        // dragging LEFT (negative pixels) should show NEXT card (positive index direction)
        // So 200px drag left = -200px = -1 index unit.
        // We want -1 index unit shift to visually shift cards LEFT.
        const dragOffset = currentDragX / cardSpacing;

        cards.forEach((card, index) => {
            // Calculate base offset from active index
            let offset = getShortestDistance(activeIndex, index, totalCards);

            // Apply drag. 
            // If dragging left (-px), cards effectively shift left.
            // Visual Position = offset + dragOffset
            const realOffset = offset + dragOffset;

            const absOffset = Math.abs(realOffset);
            const direction = realOffset >= 0 ? 1 : -1;

            // Opacity & Visibility
            // Faster fade for side cards
            let opacity = 1;
            let visibility = 'visible';
            let blur = 0;

            if (absOffset > 3.2) {
                opacity = 0;
                visibility = 'hidden';
            } else {
                // Stronger opacity falloff: 1 -> 0.6 -> 0.2
                opacity = Math.max(0, 1 - (absOffset * 0.35));

                // Add blur for depth of field
                if (absOffset > 0.5) {
                    blur = Math.min((absOffset - 0.5) * 3, 10);
                }
            }

            // zIndex
            let zIndex = 100 - Math.floor(absOffset * 10);

            // Transforms
            let translateX = realOffset * cardSpacing;

            // z: Deep push back
            let translateZ = -Math.abs(realOffset) * (depthSpacing * 1.2);
            if (absOffset < 0.5) {
                // Pop center forward
                translateZ += (1 - absOffset) * 60;
            }

            // rotateY: increased rotation for side cards
            let rotateY = -direction * Math.min(absOffset * (rotateAngle * 1.5), 60);

            // scale: sharper contrast. Center is 1 (or 1.1 via CSS), sides drop fast
            // 0 -> 1. 1 -> 0.75. 2 -> 0.5.
            let scale = Math.max(0.4, 1 - (absOffset * 0.25));

            // Apply style string
            const transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

            card.style.transform = transform;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.visibility = visibility;
            card.style.filter = `blur(${blur}px)`;

            // Active Class Logic
            if (absOffset < 0.4) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        activeIndex = (activeIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        activeIndex = (activeIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // --- Auto Play ---

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlaySpeed);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // --- Interactions ---

    function handleStart(x) {
        stopAutoPlay();
        isDragging = true;
        isClick = true;
        startX = x;
        currentDragX = 0;
        carousel.style.cursor = 'grabbing';

        // Disable transition during drag for instant feedback
        cards.forEach(c => c.style.transition = 'none');
    }

    function handleMove(x) {
        if (!isDragging) return;
        const diff = x - startX;
        if (Math.abs(diff) > 5) isClick = false;
        currentDragX = diff;
        updateCarousel();
    }

    function handleEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';

        // Re-enable transition
        cards.forEach(c => c.style.transition = '');

        // Snap logic
        // dragOffset > 0.5 -> switch to previous (left side items come to center)
        // dragOffset < -0.5 -> switch to next (right side items come to center)
        const offsetShift = -currentDragX / cardSpacing;
        const nearestShift = Math.round(offsetShift);

        if (nearestShift !== 0) {
            activeIndex = (activeIndex + nearestShift + totalCards) % totalCards;
        }

        currentDragX = 0;
        updateCarousel(); // Transition will handle smooth snap

        // Resume auto play only on mouse leave
    }

    // --- Event Listeners ---

    // Mouse
    carousel.addEventListener('mousedown', e => {
        // Only trigger if left click
        if (e.button === 0) handleStart(e.pageX);
    });

    window.addEventListener('mousemove', e => {
        if (isDragging) {
            e.preventDefault();
            handleMove(e.pageX);
        }
    });

    window.addEventListener('mouseup', handleEnd);

    // Touch
    carousel.addEventListener('touchstart', e => handleStart(e.touches[0].pageX), { passive: true });
    window.addEventListener('touchmove', e => {
        if (isDragging) handleMove(e.touches[0].pageX);
    }, { passive: true });
    window.addEventListener('touchend', handleEnd);

    // Hover pauses autoplay
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', () => {
        if (!isDragging) startAutoPlay();
    });

    // Click on Cards (if not dragged)
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (isClick && index !== activeIndex) {
                // Jump to this card
                activeIndex = index;
                updateCarousel();
            }
        });
    });

    // Initialize
    carousel.style.cursor = 'grab';
    updateCarousel();
    startAutoPlay();
}

