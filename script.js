
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
    initStickyHeader();
    initMobileMenu();
    initSearch();
    initFilterTabs();
    initQuickView();
    initWishlist();
    initNewsletterForm();
    initBackToTop();
    initSmoothScroll();
    initCounterAnimation();
});


function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}


function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                const delay = index * 80;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}


function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}


function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        toggleBtn.classList.toggle('active');

        // Toggle hamburger animation
        const spans = toggleBtn.querySelectorAll('span');
        if (nav.classList.contains('mobile-open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
            const spans = toggleBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggleBtn.contains(e.target) && nav.classList.contains('mobile-open')) {
            nav.classList.remove('mobile-open');
            const spans = toggleBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}


function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (!searchBtn || !searchOverlay) return;

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
        // Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
        }
    });

    // Live search filtering
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const allCards = document.querySelectorAll('.product-card');

        allCards.forEach(card => {
            const name = card.querySelector('.product-info h3').textContent.toLowerCase();
            const brand = card.querySelector('.product-brand')?.textContent.toLowerCase() || '';

            if (query === '' || name.includes(query) || brand.includes(query)) {
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.2';
            }
        });

        if (query === '') {
            allCards.forEach(card => {
                card.style.display = '';
                card.style.opacity = '';
            });
        }
    });
}


function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('#featured .product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            cards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}


function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');

    // Create modal styles once
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .quick-view-modal {
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2001;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .quick-view-modal.active {
            opacity: 1;
            visibility: visible;
        }
        .modal-content {
            background: #ffffff;
            border: 1px solid rgba(139, 92, 246, 0.18);
            border-radius: 16px;
            max-width: 950px;
            width: 92%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .quick-view-modal.active .modal-content {
            transform: scale(1) translateY(0);
        }
        .modal-content::-webkit-scrollbar {
            width: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
            background: transparent;
        }
        .modal-content::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.2);
            border-radius: 3px;
        }
        .close-modal {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(139, 92, 246, 0.08);
            border: 1px solid rgba(139, 92, 246, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            z-index: 10;
            color: #5b5675;
            transition: all 0.3s ease;
        }
        .close-modal:hover {
            background: rgba(244, 63, 94, 0.2);
            border-color: rgba(244, 63, 94, 0.3);
            color: #f43f5e;
        }
        .modal-body {
            display: flex;
            padding: 0;
        }
        .modal-body .modal-image {
            flex: 1;
            min-height: 400px;
            overflow: hidden;
            border-radius: 16px 0 0 16px;
        }
        .modal-body .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .modal-body .product-details {
            flex: 1;
            padding: 40px;
        }
        .modal-body .product-details .modal-brand {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #8b5cf6;
            margin-bottom: 8px;
        }
        .modal-body .product-details h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 16px;
            color: #1e1b3a;
        }
        .modal-body .modal-rating {
            display: flex;
            align-items: center;
            gap: 2px;
            color: #f59e0b;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .modal-body .modal-rating span {
            color: #8a84a3;
            margin-left: 8px;
        }
        .modal-body .modal-price {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 800;
            color: #1e1b3a;
            margin-bottom: 24px;
        }
        .modal-body .description {
            margin-bottom: 28px;
            color: #5b5675;
            line-height: 1.8;
            font-size: 14px;
        }
        .size-selection, .quantity-section {
            margin-bottom: 24px;
        }
        .size-selection h4, .quantity-section h4 {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            color: #5b5675;
        }
        .size-options {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .size-options button {
            width: 44px;
            height: 44px;
            border: 1px solid rgba(139, 92, 246, 0.18);
            background: rgba(139, 92, 246, 0.06);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #5b5675;
            font-weight: 600;
            font-size: 13px;
        }
        .size-options button:hover {
            border-color: #8b5cf6;
            color: #8b5cf6;
            background: rgba(139, 92, 246, 0.1);
        }
        .size-options button.selected {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            border-color: transparent;
            color: white;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
        }
        .quantity-selector {
            display: flex;
            align-items: center;
            gap: 0;
            background: rgba(139, 92, 246, 0.06);
            border: 1px solid rgba(139, 92, 246, 0.18);
            border-radius: 8px;
            overflow: hidden;
            width: fit-content;
        }
        .quantity-selector button {
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #5b5675;
            transition: all 0.2s ease;
        }
        .quantity-selector button:hover {
            background: rgba(139, 92, 246, 0.12);
            color: #8b5cf6;
        }
        .quantity-selector input {
            width: 50px;
            height: 40px;
            text-align: center;
            border: none;
            background: transparent;
            font-size: 16px;
            font-weight: 600;
            color: #1e1b3a;
            font-family: 'Inter', sans-serif;
        }
        .quantity-selector input:focus {
            outline: none;
        }
        .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 28px;
        }
        .modal-actions .add-to-cart-btn {
            flex: 1;
            padding: 16px;
            font-size: 13px;
        }
        .modal-actions .wishlist-modal-btn {
            width: 52px;
            height: 52px;
            border-radius: 8px;
            background: rgba(244, 63, 94, 0.1);
            border: 1px solid rgba(244, 63, 94, 0.2);
            color: #f43f5e;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 18px;
        }
        .modal-actions .wishlist-modal-btn:hover {
            background: rgba(244, 63, 94, 0.2);
            transform: scale(1.05);
        }
        @media (max-width: 768px) {
            .modal-body {
                flex-direction: column;
            }
            .modal-body .modal-image {
                border-radius: 16px 16px 0 0;
                min-height: 250px;
                max-height: 300px;
            }
            .modal-body .product-details {
                padding: 24px;
            }
            .modal-body .product-details h2 {
                font-size: 22px;
            }
            .modal-body .modal-price {
                font-size: 26px;
            }
        }
    `;
    document.head.appendChild(modalStyle);

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openQuickView(button);
        });
    });
}

function openQuickView(button) {
    const card = button.closest('.product-card');
    const image = card.querySelector('.product-image img').src;
    const name = card.querySelector('.product-info h3').textContent;
    const price = card.querySelector('.price .current').textContent;
    const brand = card.querySelector('.product-brand')?.textContent || '';
    const ratingHTML = card.querySelector('.rating').innerHTML;

    const descriptions = {
        'Air Max Classic': 'Experience timeless Nike comfort with modern Air Max cushioning. Premium materials meet iconic design for all-day wear.',
        'Retro High OG': 'The legendary Jordan 1 Retro High OG. Premium leather upper, Nike Air cushioning, and the most iconic silhouette in sneaker history.',
        'Air Force 1 Low Mint': 'Fresh mint colorway on the classic Air Force 1. Butter-soft leather, Air-Sole unit, and pivoting circle traction pattern.',
        'Yeezy Boost 350 V2': 'Adidas Primeknit upper with Boost cushioning for unparalleled comfort. The most sought-after silhouette in modern streetwear.',
        '550 Navy Gold': 'Retro basketball aesthetics meet modern comfort. Premium leather build with ENCAP midsole technology for all-day support.',
        'Dunk Low Court Purple': 'Court-ready style with premium leather construction. Classic colorblocking and padded collar for lasting comfort.',
        'RS-X Soft Rose': 'Retro-futuristic design with chunky proportions and bold colorway. Running System technology for comfort and cushioning.',
        'Air Max 97 Triple Black': 'Full-length Max Air unit delivers sleek aesthetics and comfort. The streamlined design inspired by Japanese bullet trains.',
        'Chuck 70 Olive': 'Heritage Converse style with premium canvas, vintage detailing, and cushioned Ortholite insole for modern comfort.',
    };

    const desc = descriptions[name] || 'Experience ultimate comfort and style with these premium sneakers. Featuring advanced cushioning technology and breathable materials.';

    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="product-details">
                    <div class="modal-brand">${brand}</div>
                    <h2>${name}</h2>
                    <div class="modal-rating">${ratingHTML}</div>
                    <div class="modal-price">${price}</div>
                    <div class="description">
                        <p>${desc}</p>
                    </div>
                    <div class="size-selection">
                        <h4>Select Size</h4>
                        <div class="size-options">
                            <button>US 7</button>
                            <button>US 7.5</button>
                            <button>US 8</button>
                            <button>US 8.5</button>
                            <button>US 9</button>
                            <button>US 9.5</button>
                            <button>US 10</button>
                            <button>US 10.5</button>
                            <button>US 11</button>
                            <button>US 12</button>
                        </div>
                    </div>
                    <div class="quantity-section">
                        <h4>Quantity</h4>
                        <div class="quantity-selector">
                            <button class="qty-decrease">−</button>
                            <input type="number" value="1" min="1" max="10" class="qty-input">
                            <button class="qty-increase">+</button>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn add-to-cart-btn">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                        <button class="wishlist-modal-btn">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Activate with animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // Size selection
    const sizeButtons = modal.querySelectorAll('.size-options button');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Quantity
    const qtyInput = modal.querySelector('.qty-input');
    modal.querySelector('.qty-decrease').addEventListener('click', () => {
        if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });
    modal.querySelector('.qty-increase').addEventListener('click', () => {
        if (parseInt(qtyInput.value) < 10) qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    // Add to cart
    modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        const selectedSize = modal.querySelector('.size-options button.selected');

        if (!selectedSize) {
            showToast('Please select a size', 'info');
            return;
        }

        updateCartCount(qty);
        showToast(`${name} added to cart!`, 'success');
        closeModal(modal);
    });

    // Wishlist button in modal
    modal.querySelector('.wishlist-modal-btn').addEventListener('click', function () {
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        showToast(icon.classList.contains('fas') ? 'Added to wishlist!' : 'Removed from wishlist', 'info');
    });

    // Close modal
    function closeModal(m) {
        m.classList.remove('active');
        setTimeout(() => {
            m.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
}


function initWishlist() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');

            if (icon.classList.contains('fas')) {
                icon.style.color = '#f43f5e';
                showToast('Added to wishlist!', 'success');
            } else {
                icon.style.color = '';
                showToast('Removed from wishlist', 'info');
            }
        });
    });
}


function updateCartCount(add = 1) {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const current = parseInt(badge.textContent) || 0;
    badge.textContent = current + add;

    // Bounce animation
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 200);
}


function showToast(message, type = 'success') {
    const existing = document.querySelectorAll('.toast');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
        success: 'fas fa-check',
        info: 'fas fa-info',
        error: 'fas fa-exclamation'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${iconMap[type] || iconMap.success}"></i>
        </div>
        <div class="toast-content">
            <h4>${type === 'success' ? 'Success' : type === 'info' ? 'Info' : 'Error'}</h4>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}


function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');

        if (email.value.trim()) {
            showToast('Thanks for subscribing! 🎉', 'success');
            email.value = '';
        }
    });
}



function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const top = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('nav a').forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}


function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasK = text.includes('K');
    const hasSlash = text.includes('/');

    if (hasSlash) return; // Skip "24/7"

    let target;
    if (hasK) {
        target = parseFloat(text.replace('K', '').replace('+', ''));
    } else {
        target = parseFloat(text.replace('+', ''));
    }

    if (isNaN(target)) return;

    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (hasK) {
            element.textContent = current.toFixed(current < 10 ? 1 : 0) + 'K' + (hasPlus ? '+' : '');
        } else if (target < 10) {
            element.textContent = current.toFixed(1) + (hasPlus ? '+' : '');
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}