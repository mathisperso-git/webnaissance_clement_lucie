document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');
    const loadingSpinner = document.getElementById('loading-spinner'); // Sélectionnez le spinner

    // Gère l'ouverture/fermeture du menu de navigation
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Gère l'envoi du formulaire
    submitButton.addEventListener('click', () => {
        // ... (votre code de validation existant) ...

        const inputs = [
            document.getElementById('nom-prenom'),
            document.getElementById('sexe'),
            document.getElementById('dateNaissance'),
            document.getElementById('taille'),
            document.getElementById('poids'),
            document.getElementById('prenom')
        ];
        let allValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error-field');
                allValid = false;
            } else {
                input.classList.remove('error-field');
            }
        });

        if (!allValid) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // 1. Afficher le spinner et masquer le bouton
        submitButton.style.display = 'none';
        loadingSpinner.classList.remove('loading-spinner-hidden');
        loadingSpinner.classList.add('loading-spinner-visible');

        const data = {
            'nom-prenom': inputs[0].value,
            'sexe': inputs[1].value,
            'dateNaissance': inputs[2].value,
            'taille': inputs[3].value,
            'poids': inputs[4].value,
            'prenom': inputs[5].value
        };

        const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbziIoCwVirS6HdXk5-TzjOOcfTaEC8GfubI6ccRbo62eamdxL-0p9Uj_mA5hhauhwcD/exec';

        fetch(appsScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            // 2. Masquer le spinner et afficher le message de remerciement
            loadingSpinner.classList.remove('loading-spinner-visible');
            loadingSpinner.classList.add('loading-spinner-hidden');
            thankYouMessage.classList.remove('thank-you-message-hidden');
            thankYouMessage.classList.add('thank-you-message-visible');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');

            // En cas d'erreur, masquer le spinner et réafficher le bouton pour que l'utilisateur puisse réessayer
            loadingSpinner.classList.remove('loading-spinner-visible');
            loadingSpinner.classList.add('loading-spinner-hidden');
            submitButton.style.display = 'block';
        });
    });
});