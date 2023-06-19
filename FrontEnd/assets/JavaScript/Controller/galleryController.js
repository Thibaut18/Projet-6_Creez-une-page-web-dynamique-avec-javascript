import { fetchWorks, fetchCategories } from '../Model/pickWorksAndCategories.js';
import { renderGallery } from '../View/renderGallery.js';

const $buttonsContainer = document.querySelector('#js-filter-box');
const $allCategoriesButton = document.querySelector('#all-filter');

export function initializeGalleryAndCategoriesButton() {
    fetchWorks().then((works) => {
    renderGallery(works);
    $allCategoriesButton.addEventListener('click', () => {
        renderGallery(works);
        const $filterButtons = document.querySelectorAll('.button-filter');
        $filterButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        $allCategoriesButton.classList.add('active');
    });
});
}

export function initializeFilterButtons() {
    fetchCategories().then((categories) => {
    const $filterButtonClickHandler = async (category) => {
        const $works = await fetchWorks();
        const $filteredWorks = $works.filter((work) => work.categoryId === category.id);
        renderGallery($filteredWorks);
    };
    categories.forEach((category) => {
        const $button = document.createElement('button');
        $button.innerText = category.name;
        $button.classList.add('button-filter');
        $button.addEventListener('click', () => {
            $filterButtonClickHandler(category);
            const $filterButtons = document.querySelectorAll('.button-filter');
            $filterButtons.forEach((btn) => {
                btn.classList.remove('active');
            });
            $button.classList.add('active');
        });
        $buttonsContainer.appendChild($button);
    });
});
}