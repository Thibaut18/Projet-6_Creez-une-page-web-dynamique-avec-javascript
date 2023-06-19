import { deleteGalleryItem } from "../Model/modelGallery.js";
import { updateModalElements } from "../View/viewGallery.js";
import { previewImage, deletePreview, generateCategoryOptions } from "../View/viewModal.js";

// Événement sur le bouton de suppression
modalElements.galleryModal.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-delete-btn")) {
        const $boxModal = event.target.closest(".box-modal");
        const itemId = $boxModal.getAttribute("data-id");

        deleteGalleryItem(itemId)
            .then((isDeleted) => {
                if (isDeleted) {
                    updateModalElements(data);
                    console.log("Élément supprimé");
                } else {
                    console.log("Échec de la suppression");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'élément:", error);
            });

        $boxModal.remove();
    }
});

// Événement de chargement de la page
document.addEventListener("DOMContentLoaded", (event) => {
    const $uploadButton = document.querySelector("#uploadButton");

    if ($uploadButton) {
        $uploadButton.addEventListener("click", function () {
            $fileInput.click();
        });
    }
});

// Événement de changement de l'input de sélection de fichier pour la prévisualisation de l'image
$fileInput.addEventListener("change", previewImage);
$previewDeleteBtn.addEventListener("click", deletePreview);

fetchCategories().then((data) => {
    generateCategoryOptions(data);
});
