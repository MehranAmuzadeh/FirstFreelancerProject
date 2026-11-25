document.addEventListener("DOMContentLoaded", function () {

    /* ==================== SLIDER MANTIĞI ==================== */
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const sliderContainer = document.querySelector(".hero-slider");

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval = null;
    const autoSlideTime = 5000; // 5 saniye

    // Belirli bir slayta git
    function goToSlide(index) {
        if (totalSlides === 0) return;

        // Tüm slaytları ve noktaları pasif yap
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // Sınırları kontrol et (sonsuz döngü)
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        // Aktif olanları göster
        slides[currentSlide].classList.add("active");
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Otomatik geçişi başlat
    function startAutoSlide() {
        stopAutoSlide(); // Önce eski interval varsa temizle
        slideInterval = setInterval(nextSlide, autoSlideTime);
    }

    // Otomatik geçişi durdur
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Oklar (varsa)
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            startAutoSlide(); // Sıfırla
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            prevSlide();
            startAutoSlide();
        });
    }

    // Noktalar (varsa)
    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Fare slider üzerine gelince durdur, çıkınca devam et
    if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", stopAutoSlide);
        sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }

    // İlk başlatma
    if (totalSlides > 0) {
        goToSlide(0); // İlk slaytı aktif et
        startAutoSlide();
    }
});