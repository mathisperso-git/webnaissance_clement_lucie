document.addEventListener('DOMContentLoaded', function() {
    const wishlistItems = [
        "Robot culinaire",
        "Chaise haute",
        "Lit bébé",
        "Poussette",
        "Sophie la girafe",
        "La beuteu de Mathis"
    ];

    const wishlistElement = document.getElementById('wishlist');

    function displayWishlist() {
        wishlistItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="${item.replace(/\s+/g, '-')}" name="${item.replace(/\s+/g, '-')}" />
                <label for="${item.replace(/\s+/g, '-')}" style="flex-grow: 1;">${item}</label>
            `;
            wishlistElement.appendChild(li);
        });
    }

    displayWishlist();

    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});