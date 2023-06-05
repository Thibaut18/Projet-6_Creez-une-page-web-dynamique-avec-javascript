/**
 * Récupère les œuvres depuis l'API.
 * @async
 * @returns {Promise<object[]>} La liste des œuvres.
 * @throws {Error} Si la requête pour récupérer les œuvres échoue.
 */
async function fetchWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Échec de la récupération des œuvres');
    }
}

/**
 * Récupère les catégories depuis l'API.
 * @async
 * @returns {Promise<object[]>} La liste des catégories.
 * @throws {Error} Si la requête pour récupérer les catégories échoue.
 */
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Échec de la récupération des catégories');
    }
}

/**
 * Affiche la galerie avec les éléments donnés.
 * @param {object[]} items - Les éléments à afficher dans la galerie.
 */
function renderGallery(items) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    items.forEach((item) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('box');
        galleryItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" class="item__img">
            <h3 class="item__title">${item.title}</h3>
        `;
        gallery.appendChild(galleryItem);
    });
}

// Récupère les œuvres et les catégories, puis affiche la galerie.
fetchWorks().then((works) => {
    const allCategoriesButton = document.querySelector('#all-filter');
    allCategoriesButton.addEventListener('click', () => renderGallery(works));
    renderGallery(works);
});

fetchCategories().then((categories) => {
    const buttonsContainer = document.querySelector('#js-filter-box');

    /**
     * Gère l'événement de clic sur un bouton de filtre.
     * @param {object} category - La catégorie associée au bouton.
     */
    const filterButtonClickHandler = async (category) => {
        const works = await fetchWorks();
        const filteredWorks = works.filter((work) => work.categoryId === category.id);
        renderGallery(filteredWorks);
    };

    categories.forEach((category) => {
        const button = document.createElement('button');
        button.innerText = category.name;
        button.classList.add('button-filter');
        button.addEventListener('click', () => {
            filterButtonClickHandler(category);
            const filterButtons = document.querySelectorAll('.button-filter');
            filterButtons.forEach((btn) => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });

        buttonsContainer.appendChild(button);
    });
});
