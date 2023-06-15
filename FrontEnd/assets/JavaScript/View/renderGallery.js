const $gallery = document.querySelector('.gallery');

/**
 * Affiche la galerie avec les éléments donnés.
 * @param {object[]} items - Les éléments à afficher dans la galerie.
 */
export function renderGallery(items) {
    $gallery.innerHTML = '';
    items.forEach((item) => {
        const $galleryItem = document.createElement('div');
        $galleryItem.classList.add('box');
        $galleryItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" class="gallery-img">
            <h3 class="gallery-img-title">${item.title}</h3>
        `;
        $gallery.appendChild($galleryItem);
    });
}