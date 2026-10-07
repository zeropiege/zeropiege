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

    // Fonction pour mettre à jour l'état de la vidéo basé sur le défilement
    function updateVideoState() {
        if (!heroSection) return;

        // Calculer la position de défilement relative à la section héro
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        // Calculer la progression (0 à 1) dans la section héro
        let progress = (scrollPosition - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        progress = Math.max(0, Math.min(1, progress)); // Clamp entre 0 et 1

        // Mettre à jour le temps actuel de la vidéo basé sur la progression
        const currentTime = heroVideo.duration * progress;
        heroVideo.currentTime = currentTime;

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

    // Gestion du formulaire de contact
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ici, vous ajouteriez votre logique de soumission de formulaire
            // Pour l'exemple, nous afficherons un message de succès

            formMessage.textContent = 'Message envoyé avec succès !';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            // Réinitialiser le formulaire
            contactForm.reset();

            // Masquer le message après 5 secondes
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Événements de défilement et de redimensionnement
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

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

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