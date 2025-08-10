document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    submitButton.addEventListener('click', () => {
        // Sélectionner tous les champs de saisie et le menu déroulant
        const nomPrenomInput = document.getElementById('nom-prenom');
        const sexeSelect = document.getElementById('sexe');
        const dateNaissanceInput = document.getElementById('dateNaissance'); // CHANGEMENT : Correction de l'ID
        const tailleInput = document.getElementById('taille');
        const poidsInput = document.getElementById('poids');
        const prenomInput = document.getElementById('prenom');

        // CHANGEMENT : 'dateNaissanceInput' remplace 'naissanceSelect'
        const inputs = [nomPrenomInput, sexeSelect, dateNaissanceInput, tailleInput, poidsInput, prenomInput];
        let allValid = true;

        // Boucle pour vérifier chaque champ
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

        // Si tout est valide, on prépare et envoie les données
        const data = {
            'nom-prenom': nomPrenomInput.value,
            'sexe': sexeSelect.value,
            'dateNaissance': dateNaissanceInput.value, // CHANGEMENT : Correction de l'ID
            'taille': tailleInput.value,
            'poids': poidsInput.value,
            'prenom': prenomInput.value
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
            submitButton.style.display = 'none';
            thankYouMessage.classList.remove('thank-you-message-hidden');
            thankYouMessage.classList.add('thank-you-message-visible');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
    });
});