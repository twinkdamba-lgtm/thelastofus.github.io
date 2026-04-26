document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('active')) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    const trailerModal = document.getElementById('trailerModal');
    const trailerVideo = document.getElementById('trailerVideo');
    const trailerCloseBtn = document.querySelector('.trailer-modal-close');

    function openTrailer() {
        if (!trailerModal || !trailerVideo) return;

        trailerModal.classList.add('is-open');
        trailerModal.setAttribute('aria-hidden', 'false');

    
        trailerVideo.currentTime = 0;

        const playPromise = trailerVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                
            });
        }
    }

    function closeTrailer() {
        if (!trailerModal || !trailerVideo) return;

        trailerModal.classList.remove('is-open');
        trailerModal.setAttribute('aria-hidden', 'true');
        trailerVideo.pause();
        trailerVideo.currentTime = 0;
    }

    const trailerTriggers = document.querySelectorAll('.btn-trailer, .play-icon, .video-placeholder');
    if (trailerTriggers.length && trailerModal && trailerVideo) {
        trailerTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                if (trigger.tagName === 'A') event.preventDefault();
                openTrailer();
            });
        });

        if (trailerCloseBtn) {
            trailerCloseBtn.addEventListener('click', closeTrailer);
        }

        trailerModal.addEventListener('click', (event) => {
            if (event.target === trailerModal) closeTrailer();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeTrailer();
        });

        trailerVideo.addEventListener('ended', closeTrailer);
    }


    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.querySelector('.lightbox-close');
    const lightboxPrevBtn = document.querySelector('.lightbox-prev');
    const lightboxNextBtn = document.querySelector('.lightbox-next');

    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item'));
    const galleryImages = galleryItems
        .map((item) => item.querySelector('img'))
        .filter((img) => Boolean(img));
    let lightboxIndex = 0;

    function setLightboxImage(index) {
        if (!lightboxImage || !galleryImages.length) return;

        const safeIndex = (index + galleryImages.length) % galleryImages.length;
        lightboxIndex = safeIndex;

        const img = galleryImages[safeIndex];
        lightboxImage.src = img.getAttribute('src') || '';
        lightboxImage.alt = img.getAttribute('alt') || '';

        if (lightboxCaption) {
            lightboxCaption.textContent = img.getAttribute('alt') || '';
        }
    }

    function openLightbox(index) {
        if (!lightboxModal || !lightboxImage || !galleryImages.length) return;
        lightboxModal.classList.add('is-open');
        lightboxModal.setAttribute('aria-hidden', 'false');
        setLightboxImage(index);
    }

    function closeLightbox() {
        if (!lightboxModal || !lightboxImage) return;
        lightboxModal.classList.remove('is-open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        if (lightboxCaption) lightboxCaption.textContent = '';
    }

    function prevLightbox() {
        setLightboxImage(lightboxIndex - 1);
    }

    function nextLightbox() {
        setLightboxImage(lightboxIndex + 1);
    }

    if (galleryImages.length && lightboxModal) {
        galleryItems.forEach((item, idx) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => openLightbox(idx));
        });

        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
        if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);
        if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);

        lightboxModal.addEventListener('click', (event) => {
            if (event.target === lightboxModal) closeLightbox();
        });

        document.addEventListener('keydown', (event) => {
            if (!lightboxModal.classList.contains('is-open')) return;
            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowLeft') prevLightbox();
            if (event.key === 'ArrowRight') nextLightbox();
        });
    }
});
