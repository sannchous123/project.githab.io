// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const overlay = document.getElementById('overlay');
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
// Элементы для видео
const heroVideo = document.querySelector('.hero-video-bg');

// Анимация видео при скролле
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (heroVideo) {
            heroVideo.classList.add('scrolled');
        }
    } else {
        navbar.classList.remove('scrolled');
        if (heroVideo) {
            heroVideo.classList.remove('scrolled');
        }
    }
});

// Оптимизация видео для мобильных устройств
if (heroVideo) {
    // Проверка мобильного устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Уменьшаем качество видео на мобильных для производительности
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('autoplay', '');
        heroVideo.setAttribute('loop', '');
        
        // Предотвращаем полноэкранный режим на iOS
        heroVideo.addEventListener('play', function() {
            this.controls = false;
        });
    }
    
    // Обработка ошибок загрузки видео
    heroVideo.addEventListener('error', function() {
        console.log('Ошибка загрузки видео');
        // Можно добавить фолбэк на фоновое изображение
        document.querySelector('.hero-video-container').style.display = 'none';
    });
    
    // Пауза видео при скрытии вкладки для экономии ресурсов
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        }
    });
}

    // 1. Изменение навбара при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 2. Мобильное меню
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // 3. Выпадающее меню для мобильной версии
    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dropdownMenu = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            dropdownMenu.classList.toggle('active');
            
            if (dropdownMenu.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // 4. FAQ аккордеон
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Закрываем все ответы
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Если не активен, открываем
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // 5. Обработка формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Валидация формы
        if (!formData.name || !formData.email || !formData.phone || !formData.service) {
            showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showFormMessage('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        if (!isValidPhone(formData.phone)) {
            showFormMessage('Пожалуйста, введите корректный номер телефона', 'error');
            return;
        }
        
        // Отправка данных
        simulateFormSubmit(formData);
    });
    
    // 6. Функция для проверки email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 7. Функция для проверки телефона
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        return phoneRegex.test(phone);
    }
    
    // 8. Функция для показа сообщения формы
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Скрываем сообщение через 5 секунд
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // 9. Имитация отправки формы
    function simulateFormSubmit(formData) {
        // Показываем индикатор загрузки
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Имитация задержки сети
        setTimeout(function() {
            try {
                // Сохраняем в localStorage
                const existingData = JSON.parse(localStorage.getItem('itservice_form_submissions')) || [];
                existingData.push(formData);
                localStorage.setItem('itservice_form_submissions', JSON.stringify(existingData));
                
                // Показываем успешное сообщение
                showFormMessage('Заявка успешно отправлена! Мы свяжемся с вами в течение 30 минут.', 'success');
                
                // Сбрасываем форму
                contactForm.reset();
            } catch (error) {
                showFormMessage('Заявка успешно отправлена! Мы свяжемся с вами в течение 30 минут.', 'success');
                contactForm.reset();
            }
            
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
        }, 1500);
    }
    
    // 10. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// IT-Слайдер
class ITSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 5000; // 5 секунд
        
        this.init();
    }
    
    init() {
        // Инициализация первого слайда
        this.showSlide(this.currentSlide);
        
        // События для кнопок
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // События для миниатюр
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.currentTarget.dataset.slide);
                this.showSlide(slideIndex);
            });
        });
        
        // События для точек
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.currentTarget.dataset.slide);
                this.showSlide(slideIndex);
            });
        });
        
        // Автопрокрутка
        this.startAutoPlay();
        
        // Пауза при наведении
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Обработка клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Свайпы для мобильных устройств
        this.initTouchEvents();
    }
    
    showSlide(index) {
        // Проверка границ
        if (index >= this.slides.length) index = 0;
        if (index < 0) index = this.slides.length - 1;
        
        // Скрываем все слайды
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Обновляем активные элементы
        this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        this.thumbnails[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        // Обновляем текущий индекс
        this.currentSlide = index;
        
        // Прокручиваем миниатюры к активной
        this.scrollToThumbnail(index);
        
        // Сбрасываем автопрокрутку
        this.resetAutoPlay();
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    scrollToThumbnail(index) {
        const thumbnailsContainer = document.querySelector('.thumbnails');
        const activeThumb = this.thumbnails[index];
        
        if (activeThumb) {
            const containerWidth = thumbnailsContainer.offsetWidth;
            const thumbWidth = activeThumb.offsetWidth;
            const thumbLeft = activeThumb.offsetLeft;
            
            thumbnailsContainer.scrollTo({
                left: thumbLeft - (containerWidth / 2) + (thumbWidth / 2),
                behavior: 'smooth'
            });
        }
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    initTouchEvents() {
        const slider = document.querySelector('.main-slider');
        let startX = 0;
        let endX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Для мыши
        slider.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            document.addEventListener('mouseup', handleMouseUp);
        });
        
        const handleMouseUp = (e) => {
            endX = e.clientX;
            this.handleSwipe(startX, endX);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Минимальное расстояние для свайпа
        
        if (startX - endX > threshold) {
            this.nextSlide(); // Свайп влево
        } else if (endX - startX > threshold) {
            this.prevSlide(); // Свайп вправо
        }
    }
}

// Инициализация слайдера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const itSlider = new ITSlider();
    
    // Добавляем ленивую загрузку для изображений
    const lazyImages = document.querySelectorAll('.slide-image img, .thumbnail img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});
