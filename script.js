document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const heroVideo = document.querySelector('.hero-video');
    const heroTextStates = document.querySelectorAll('.hero-text-state');
    const heroSection = document.querySelector('#hero');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Vérifier si la vidéo existe
    if (!heroVideo) {
        console.error('Vidéo héro non trouvée');
        return;
    }

    // Désactiver l'autoplay normal - nous contrôlons la lecture via le défilement
    heroVideo.autoplay = false;
    heroVideo.muted = true; // Requis pour l'autoplay sur certains navigateurs

    // Optimisation : utiliser un timestamp pour éviter les appels trop fréquents
    let lastUpdate = 0;
    const updateInterval = 16; // ~60fps

    // Fonction pour mettre à jour l'état de la vidéo basé sur le défilement
    function updateVideoState() {
        if (!heroSection) return;

        // Limiter la fréquence des mises à jour pour améliorer les performances
        const now = performance.now();
        if (now - lastUpdate < updateInterval) {
            return;
        }
        lastUpdate = now;

        // Calculer la position de défilement relative à la section héro
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        // Calculer la progression (0 à 1) dans la section héro
        let progress = (scrollPosition - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        progress = Math.max(0, Math.min(1, progress)); // Clamp entre 0 et 1

        // Mettre à jour le temps actuel de la vidéo (si la durée est connue)
        if (Number.isFinite(heroVideo.duration)) {
            heroVideo.currentTime = heroVideo.duration * progress;
        }

        // Mettre à jour les états de texte basé sur la progression
        updateTextStates(progress);
    }

    // Fonction pour mettre à jour les états de texte
    function updateTextStates(progress) {
        heroTextStates.forEach((state, index) => {
            // Définir des seuils pour chaque état de texte
            // État 1: 0-0.33, État 2: 0.34-0.66, État 3: 0.67-1.0
            const stateStart = index * 0.33;
            const stateEnd = (index + 1) * 0.33;

            if (progress >= stateStart && progress < stateEnd) {
                state.classList.add('active');
            } else {
                state.classList.remove('active');
            }
        });
    }

    // Gestion du formulaire de contact avec validation améliorée
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation simple du formulaire
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');

            let isValid = true;
            let errorMessage = '';

            // Validation du nom
            if (!nameInput.value.trim()) {
                isValid = false;
                errorMessage = 'Veuillez entrer votre nom';
            }
            // Validation de l'email
            else if (!emailInput.value.trim()) {
                isValid = false;
                errorMessage = 'Veuillez entrer votre email';
            }
            // Validation simple du format email
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                isValid = false;
                errorMessage = 'Veuillez entrer un email valide';
            }
            // Validation du message
            else if (!messageInput.value.trim()) {
                isValid = false;
                errorMessage = 'Veuillez entrer votre message';
            }

            if (!isValid) {
                formMessage.textContent = errorMessage;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.disabled = true;

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(contactForm)).toString()
            })
                .then(function(response) {
                    if (!response.ok) throw new Error('HTTP ' + response.status);
                    formMessage.textContent = 'Message envoyé avec succès !';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                })
                .catch(function() {
                    formMessage.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
                    formMessage.className = 'form-message error';
                })
                .finally(function() {
                    formMessage.style.display = 'block';
                    submitButton.disabled = false;
                    setTimeout(function() { formMessage.style.display = 'none'; }, 5000);
                });
        });
    }

    // Événements de défilement et de redimensionnement avec optimisation
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateVideoState();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Utiliser des options de passeur d'événements pour améliorer les performances
    const scrollOptions = { passive: true };
    window.addEventListener('scroll', onScroll, scrollOptions);
    window.addEventListener('resize', onScroll, scrollOptions);

    // Initialisation au chargement
    window.addEventListener('load', function() {
        // S'assurer que la vidéo est prête avant de commencer
        if (heroVideo.readyState >= 2) {
            updateVideoState();
        } else {
            heroVideo.addEventListener('loadedmetadata', updateVideoState);
        }
    });

    // Gestion de la fin de la vidéo - boucle si nécessaire
    heroVideo.addEventListener('ended', function() {
        // Optionally loop the video or reset to beginning
        // heroVideo.currentTime = 0;
    });

    // Gestion des erreurs de vidéo
    heroVideo.addEventListener('error', function(e) {
        console.error('Erreur de chargement de la vidéo:', e);
    });
});

// Fonction utilitaire pour ouvrir un lien WhatsApp avec un numéro de téléphone
function openWhatsApp(phoneNumber) {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
}