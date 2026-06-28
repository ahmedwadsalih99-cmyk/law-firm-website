/**
 * ============================================
 * مكتب العدالة للمحاماة - JavaScript كامل
 * ============================================
 */

// تشغيل جميع الدوال عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    navbarScroll();
    mobileMenu();
    backToTopButton();
    counterAnimation();
    scrollReveal();
    filterServices();
    contactFormValidation();
    smoothScrollLinks();
});

// ============================================
// 1. شريط التنقل - يتغير مع التمرير
// ============================================
function navbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 2. قائمة الجوال (هامبرغر)
// ============================================
function mobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;
    
    // فتح وإغلاق القائمة
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // إغلاق القائمة عند الضغط على أي رابط
    var links = navMenu.getElementsByClassName('nav-link');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    }
}

// ============================================
// 3. زر العودة للأعلى
// ============================================
function backToTopButton() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    
    // إظهار وإخفاء الزر
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    // التمرير للأعلى عند الضغط
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 4. عداد الأرقام المتحرك
// ============================================
function counterAnimation() {
    var counters = document.querySelectorAll('.stat-number, .counter-number');
    if (counters.length === 0) return;
    
    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'));
        if (!target) return;
        
        var duration = 2000; // المدة: 2 ثانية
        var steps = 50;      // عدد الخطوات
        var stepTime = duration / steps;
        var increment = target / steps;
        var current = 0;
        
        var timer = setInterval(function() {
            current = current + increment;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
    
    // مراقبة ظهور العناصر
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counter = entry.target;
                if (!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    // بدء المراقبة
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}
// ============================================
// 5. تأثيرات الظهور عند التمرير
// ============================================
function scrollReveal() {
    var elements = document.querySelectorAll('.service-card, .testimonial-card, .team-card, .service-detail-card, .vision-card, .mission-card, .values-card, .timeline-item, .counter-item');
    if (elements.length === 0) return;
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// 6. تصفية الخدمات
// ============================================
function filterServices() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.service-detail-card');
    if (buttons.length === 0 || cards.length === 0) return;
    
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // إزالة النشط من كل الأزرار
            buttons.forEach(function(b) {
                b.classList.remove('active');
            });
            
            // تنشيط الزر المضغوط
            this.classList.add('active');
            
            // قيمة التصفية
            var filter = this.getAttribute('data-filter');
            
            // إظهار وإخفاء البطاقات
            cards.forEach(function(card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// 7. التحقق من نموذج التواصل
// ============================================
function contactFormValidation() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    
    var successMsg = document.getElementById('successMessage');
    var errorMsg = document.getElementById('errorMessage');
    
    // التحقق من الحقل
    function checkField(field) {
        var value = field.value.trim();
        var errorEl = document.getElementById(field.id + 'Error');
        var isValid = true;
        var message = '';
        
        // إزالة الكلاسات القديمة
        field.classList.remove('error', 'success');
        
        // التحقق من الفراغ
        if (value === '') {
            isValid = false;
            message = 'هذا الحقل مطلوب';
        } else {
            // تحقق خاص حسب النوع
            if (field.id === 'email') {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'بريد إلكتروني غير صحيح';
                }
            }
            if (field.id === 'phone') {
                var phoneRegex = /^05\d{8}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    message = 'رقم هاتف غير صحيح (مثال: 05xxxxxxxx)';
                }
            }
            if (field.id === 'message' && value.length < 10) {
                isValid = false;
                message = 'الرسالة قصيرة جداً (10 أحرف على الأقل)';
            }
        }
        
        // عرض النتيجة
        if (isValid) {
            field.classList.add('success');
if (errorEl) errorEl.textContent = '';
        } else {
            field.classList.add('error');
            if (errorEl) errorEl.textContent = message;
        }
        
        return isValid;
    }
    
    // التحقق من كل الحقول عند الإرسال
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // إخفاء الرسائل القديمة
        if (successMsg) successMsg.classList.remove('show');
        if (errorMsg) errorMsg.classList.remove('show');
        
        // جلب كل الحقول
        var fields = form.querySelectorAll('input, select, textarea');
        var allValid = true;
        
        fields.forEach(function(field) {
            if (!checkField(field)) {
                allValid = false;
            }
        });
        
        if (allValid) {
            // محاكاة الإرسال
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            setTimeout(function() {
                if (successMsg) successMsg.classList.add('show');
                form.reset();
                fields.forEach(function(f) {
                    f.classList.remove('success', 'error');
                });
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        } else {
            if (errorMsg) errorMsg.classList.add('show');
        }
    });
    
    // التحقق المباشر أثناء الكتابة
    var inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            checkField(this);
        });
    });
}

// ============================================
// 8. التمرير السلس للروابط الداخلية
// ============================================
function smoothScrollLinks() {
    var links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var target = document.querySelector(targetId);
            if (!target) return;
            
            e.preventDefault();
            
            var navbarHeight = 80; // ارتفاع شريط التنقل
            var position = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// رسالة ترحيب في الكونسول
// ============================================
console.log('⚖️ مكتب العدالة للمحاماة - JavaScript تم التحميل بنجاح');



