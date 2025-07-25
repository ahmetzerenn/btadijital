// Performance Optimizations
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 16); // ~60fps

// Lazy loading for images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Optimized intersection observer
const optimizedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const optimizedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            optimizedObserver.unobserve(entry.target); // Stop observing after animation
        }
    });
}, optimizedObserverOptions);

// Optimized counter animation with requestAnimationFrame
function optimizedAnimateCounter(element, target, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (target - startValue) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Optimized stats observer
const optimizedStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            optimizedAnimateCounter(statNumber, target);
            optimizedStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Mobile Navigation Toggle (güvenli)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

if (hamburger && navMenu && mobileMenuOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            mobileMenuOverlay.classList.add('active');
        } else {
            mobileMenuOverlay.classList.remove('active');
        }
    });
    mobileMenuOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
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

// Use optimized scroll handlers
window.addEventListener('scroll', optimizedScrollHandler);

// Sticky ve Animasyonlu Navbar
(function() {
    const navbar = document.querySelector('.navbar');
    const navLogoImg = document.querySelector('.nav-logo img');
    function onScrollNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScrollNavbar);
    document.addEventListener('DOMContentLoaded', onScrollNavbar);
})();

// Contact form handling with debounced validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const debouncedValidation = debounce((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, 300);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const company = formData.get('company');
        const service = formData.get('service');
        const budget = formData.get('budget');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service || !message) {
            alert('Lütfen tüm zorunlu alanları doldurun.');
            return;
        }
        
        // Email validation
        if (!debouncedValidation(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const debouncedEmailValidation = debounce((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, 300);

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Lütfen e-posta adresinizi girin.');
            return;
        }
        
        if (!debouncedEmailValidation(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Abone Olunuyor...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Başarıyla abone oldunuz! Dijital pazarlama güncellemelerini e-posta ile alacaksınız.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Blog category filtering with optimized rendering
const categoryBtns = document.querySelectorAll('.category-btn');
const blogCards = document.querySelectorAll('.blog-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter blog cards with optimized rendering
        blogCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// SSS Accordion (Sadece bir soru açık kalabilir)
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('FAQ accordion kodu yüklendi:', faqItems.length);
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                // Diğer açık olanı kapat
                faqItems.forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                // Kendi durumunu değiştir
                item.classList.toggle('active');
            });
        });
    });
})();

// Load more blog posts
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.textContent = 'Yükleniyor...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading more posts
        setTimeout(() => {
            alert('Daha fazla blog yazısı yüklendi!');
            loadMoreBtn.textContent = 'Daha Fazla Yazı Yükle';
            loadMoreBtn.disabled = false;
        }, 2000);
    });
}

// Optimized element animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        optimizedObserver.observe(el);
    });
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Optimized stats animation
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => optimizedStatsObserver.observe(stat));
});

// Optimized hover effects with requestAnimationFrame
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });
    
    card.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });
    
    item.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        requestAnimationFrame(() => {
            this.parentElement.style.transform = 'scale(1.02)';
        });
    });
    
    input.addEventListener('blur', function() {
        requestAnimationFrame(() => {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Social media links hover effect
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'rotate(360deg) scale(1.1)';
        });
    });
    
    link.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
});

// Add transition to all interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
interactiveElements.forEach(el => {
    el.style.transition = 'all 0.3s ease';
});

// Back to top functionality
// Bu bölümdeki backToTopBtn ile ilgili kodlar kaldırıldı. Sadece index.html ve styles.css'deki buton kullanılacak.

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
} 

// Hero Slider kodları kaldırıldı 

// Dark/Light Theme Toggle
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
}
function toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setTheme('dark');
    document.addEventListener('DOMContentLoaded', updateThemeIcon);
    document.getElementById('themeToggleBtn')?.addEventListener('click', function() {
        setTimeout(updateThemeIcon, 50);
    });
    const observer = new MutationObserver(updateThemeIcon);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
function updateThemeIcon() {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    if (document.body.classList.contains('dark-theme')) {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// DEBUG ve ÇALIŞAN SSS ACCORDION KODU
console.log('Script.js yüklendi');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded çalıştı');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('faqItems:', faqItems.length);
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', function() {
            // Diğer açık olanı kapat
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            // Kendi durumunu değiştir
            item.classList.toggle('active');
            console.log('Tıklandı, aktif mi:', item.classList.contains('active'));
        });
    });
});

// Yüzdeyle Yüklenen Preloader (yüzdesiz, sadece bar)
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.getElementById('preloaderProgressBar');
        if (!preloader || !progressBar) return;
        let percent = 0;
        function updateBar() {
            percent += Math.random() * 8 + 2; // 2-10 arası artış
            if (percent > 100) percent = 100;
            progressBar.style.width = percent + '%';
            if (percent < 100) {
                setTimeout(updateBar, 30 + Math.random() * 40);
            } else {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => { preloader.style.display = 'none'; }, 500);
                }, 350);
            }
        }
        updateBar();
    });
})();

// Hero istatistikleri için animasyonlu counter
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const stats = document.querySelectorAll('.hero-stat-number');
        stats.forEach(stat => {
            const text = stat.textContent.trim();
            const match = text.match(/(\d+)/);
            if (!match) return;
            const number = parseInt(match[1]);
            const prefix = text.replace(/(\d+).*/, '');
            const suffix = text.replace(/.*?(\d+)(.*)/, '$2');
            let current = 0;
            const duration = 1200;
            const step = Math.max(1, Math.floor(number / (duration / 16)));
            function animate() {
                current += step;
                if (current > number) current = number;
                stat.textContent = prefix + current + suffix;
                if (current < number) {
                    requestAnimationFrame(animate);
                }
            }
            stat.textContent = prefix + '0' + suffix;
            animate();
        });
    });
})();

// Modern Back to Top Button (tüm sayfalarda otomatik)
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('globalBackToTopBtn')) return;
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.id = 'globalBackToTopBtn';
        document.body.appendChild(backToTopBtn);
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();