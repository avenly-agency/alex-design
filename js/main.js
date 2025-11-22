document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. CUSTOM CURSOR
       ========================================= */
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        // Płynny ruch kursora
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        });

        // Lista elementów, które powiększają kursor
        // Dodaliśmy '.big-email' (kontakt) i elementy formularza
        const interactiveElements = document.querySelectorAll('a, .menu-toggle, .project-item, button, input, textarea, select, .big-email');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });

        // Ukrywanie kursora customowego, gdy wyjedziemy z okna
        document.addEventListener('mouseout', () => {
            cursor.style.opacity = '0';
        });
        document.addEventListener('mouseover', () => {
            cursor.style.opacity = '1';
        });
    }


    /* =========================================
       2. PRELOADER (Tylko jeśli istnieje)
       ========================================= */
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.preloader__counter');

    if (preloader && counter) {
        // Strona z preloaderem (np. Home)
        document.body.classList.add('is-loading');
        let currentValue = 0;

        const updateCounter = () => {
            const increment = Math.floor(Math.random() * 10) + 1;
            currentValue = Math.min(currentValue + increment, 100);
            counter.textContent = currentValue;

            if (currentValue < 100) {
                setTimeout(updateCounter, Math.random() * 30 + 20);
            } else {
                // KONIEC ŁADOWANIA
                setTimeout(() => {
                    preloader.classList.add('is-loaded');
                    document.body.classList.remove('is-loading');
                    
                    // Uruchom animacje wejścia DOPIERO po preloaderze
                    triggerRevealAnimations();
                }, 500);
            }
        };
        updateCounter();
    } else {
        // Strona BEZ preloadera (np. Kontakt, About)
        // Uruchom animacje od razu
        triggerRevealAnimations();
    }


    /* =========================================
       3. MENU NAVIGATION
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open'); // Klasa na body (do kolorów przycisku)
            menuOverlay.classList.toggle('is-open');    // Klasa na overlay (do widoczności)
            
            // Zmiana tekstu MENU / CLOSE
            if (document.body.classList.contains('nav-open')) {
                menuToggle.textContent = "CLOSE";
            } else {
                menuToggle.textContent = "MENU";
            }
        });

        // Zamknij menu po kliknięciu w link
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
                menuOverlay.classList.remove('is-open');
                menuToggle.textContent = "MENU";
            });
        });
    }


    /* =========================================
       4. REVEAL ANIMATIONS (Intersection Observer)
       ========================================= */
    // Ta funkcja sprawia, że elementy z klasą .reveal-up "wjeżdżają" podczas scrollowania
    function triggerRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-up');
        
        if (revealElements.length > 0) {
            const observerOptions = {
                threshold: 0.1, // Uruchom gdy 10% elementu jest widoczne
                rootMargin: "0px 0px -50px 0px"
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Animuj tylko raz
                    }
                });
            }, observerOptions);

            revealElements.forEach(el => {
                observer.observe(el);
            });
        }
    }


    /* =========================================
       5. CONTACT PAGE: COPY EMAIL
       ========================================= */
    const emailTrigger = document.getElementById('email-trigger');
    
    if (emailTrigger) {
        emailTrigger.addEventListener('click', () => {
            const email = emailTrigger.getAttribute('data-email');
            const tooltip = emailTrigger.querySelector('.copy-tooltip');
            
            // Kopiowanie do schowka
            navigator.clipboard.writeText(email).then(() => {
                const originalText = tooltip.textContent;
                
                // Pokaż komunikat "Skopiowano!"
                tooltip.textContent = "Skopiowano!";
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
                
                // Reset po 2 sekundach
                setTimeout(() => {
                    tooltip.textContent = originalText;
                    tooltip.style.opacity = ''; // Powrót do CSS hover
                    tooltip.style.transform = '';
                }, 2000);
            });
        });
    }

});