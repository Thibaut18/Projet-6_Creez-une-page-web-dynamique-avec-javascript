import { deleteGalleryItem } from '../Model/modelGallery.js';
import { modalElements } from '../View/viewModal.js';

// Crée les éléments de la galerie dans la modal
const createGalleryModalItems = (data) => {
    const fragment = document.createDocumentFragment();

    for (const item of data) {
        const $boxModal = document.createElement("div");
        $boxModal.classList.add("box-modal");
        $boxModal.setAttribute("data-id", item.id);

        const $modalItemImg = document.createElement("img");
        $modalItemImg.classList.add("modal-item__img");
        $modalItemImg.src = item.imageUrl;
        $modalItemImg.alt = item.title;

        const $modalEditBtn = document.createElement("button");
        $modalEditBtn.classList.add("modal-edit-btn");
        $modalEditBtn.innerText = "éditer";

        const $modalDeleteBtn = document.createElement("button");
        $modalDeleteBtn.classList.add("modal-delete-btn");
        $modalDeleteBtn.setAttribute("aria-label", "delete");
        // Écouteur d'événements sur le bouton de suppression
        $modalDeleteBtn.addEventListener("click", () => {
            // Appeler une fonction pour supprimer l'élément
            deleteGalleryItem(item.id)
                .then((isDeleted) => {
                    if (isDeleted) {
                        // Supprimer l'élément du DOM
                        $boxModal.remove();
                        console.log("Elément supprimé");
                    } else {
                        console.log("Échec de la suppression");
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression de l'élément:", error);
                });
        });

        const $modalDeleteImg = document.createElement("img");
        $modalDeleteImg.src = "./assets/icons/trash.svg";
        $modalDeleteImg.alt = "delete";

        $modalDeleteBtn.appendChild($modalDeleteImg);
        $boxModal.append($modalItemImg, $modalEditBtn, $modalDeleteBtn);
        fragment.appendChild($boxModal);
    }

    modalElements.galleryModal.appendChild(fragment);
};

// Met à jour les éléments de la modal
const updateModalElements = (data) => {
    modalElements.modalTitle.textContent = "Galerie photo";

    modalElements.galleryModal.style.display = "flex";
    modalElements.deleteGallery.style.display = "block";
    modalElements.addPicture.style.display = "block";
    modalElements.formAddPicture.style.display = "none";
    modalElements.backGallery.style.display = "none";
    modalElements.barModal.style.display = "block";

    modalElements.galleryModal.innerHTML = "";
    createGalleryModalItems(data);
};

// Fonction de prévisualisation de l'image
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        $preview.style.display = "block";
        $preview.src = URL.createObjectURL(file);
        $buttonUploadPhoto.style.display = "none";
        $textFormatImg.style.display = "none";
        $previewDeleteBtn.style.display = "inline-flex";
    } else {
        $preview.style.display = "none";
        $preview.src = "";
        $buttonUploadPhoto.style.display = "block";
        $textFormatImg.style.display = "block";
        $previewDeleteBtn.style.display = "none";
    }
}

// Suppression de l'image de prévisualisation
function deletePreview() {
    $preview.src = "";
    $preview.style.display = "none";
    $buttonUploadPhoto.style.display = "block";
    $textFormatImg.style.display = "block";
    $previewDeleteBtn.style.display = "none";
    $submitBtn.setAttribute("disabled", "disabled");
    $submitBtn.classList.remove("active");
    $formAddPicture.reset();
    $errorTitle.classList.remove("active");
    $errorTitleText.classList.remove("active");
}

// Fonction pour générer les options de catégories
function generateCategoryOptions(data) {
    const categories = document.querySelector("#categorie");
    // Création des options du select à partir des catégories de l'API
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].id;
        option.textContent = data[i].name;
        categories.appendChild(option);
    }
}

export { createGalleryModalItems, updateModalElements, previewImage, deletePreview, generateCategoryOptions };