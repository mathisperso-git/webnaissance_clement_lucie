document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const thankYouMessage = document.getElementById('thank-you-message');

    submitButton.addEventListener('click', () => {
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
            if (input.value.trim() === '' || (input.id === 'sexe' && input.value === '')) {
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

        // Display spinner and hide button
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
            // Hide spinner and show thank you message
            loadingSpinner.classList.remove('loading-spinner-visible');
            loadingSpinner.classList.add('loading-spinner-hidden');
            thankYouMessage.classList.remove('thank-you-message-hidden');
            thankYouMessage.classList.add('thank-you-message-visible');
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données:", error);
            alert("Une erreur est survenue. Veuillez réessayer.");

            // On error, hide spinner and show button again
            loadingSpinner.classList.remove('loading-spinner-visible');
            loadingSpinner.classList.add('loading-spinner-hidden');
            submitButton.style.display = 'block';
        });
    });
});