// Déclaration des variables du DOM
const $gallery = document.querySelector(".gallery");
const $buttonsContainer = document.querySelector("#js-filter-box");
const $allCategoriesButton = document.querySelector("#all-filter");

/**
 * Récupère les œuvres depuis l'API.
 * @async
 * @returns {Promise<object[]>} La liste des œuvres.
 */
async function getAllWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Récupère les catégories depuis l'API.
 * @async
 * @returns {Promise<object[]>} La liste des catégories.
 */
async function getAllCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Affiche la galerie avec les éléments donnés.
 * @param {object[]} items - Les éléments à afficher dans la galerie.
 */
function renderGallery(items) {
    $gallery.innerHTML = "";
    items.forEach((item) => {
        const $galleryItem = document.createElement("div");
        $galleryItem.classList.add("box");
        $galleryItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" class="gallery-img">
            <h3 class="gallery-img-title">${item.title}</h3>
        `;
        $gallery.appendChild($galleryItem);
    });
}

// Récupère les œuvres, puis affiche la galerie.
getAllWorks().then((works) => {
    renderGallery(works); // Affiche les œuvres initiales
    // Gestionnaire d'événements pour le bouton "Tous les filtres"
    $allCategoriesButton.addEventListener("click", () => {
        renderGallery(works); // Affiche toutes les œuvres lors du clic sur "Tous les filtres"
        const $filterButtons = document.querySelectorAll(".button-filter");
        $filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        $allCategoriesButton.classList.add("active");
    });
});

getAllCategories().then((categories) => {
    const filterButtonClickHandler = async (category) => {
        const allWorks = await getAllWorks();
        const filteredWorks = allWorks.filter((work) => work.categoryId === category.id);
        renderGallery(filteredWorks);
    };
    categories.forEach((category) => {
        const $button = document.createElement("button");
        $button.innerText = category.name;
        $button.classList.add("button-filter");
        $button.addEventListener("click", () => {
            filterButtonClickHandler(category);
            const $filterButtons = document.querySelectorAll(".button-filter");
            $filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });
            $button.classList.add("active");
        });
        $buttonsContainer.appendChild($button);
    });
});
