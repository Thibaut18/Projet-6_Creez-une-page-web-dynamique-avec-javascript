const $modalElements = {
    galleryModal: document.querySelector("#js-gallery-modal"),
    addPicture: document.querySelector("#js-add-picture"),
    modalTitle: document.querySelector("#js-modal-title"),
    deleteGallery: document.querySelector("#js-delete-gallery"),
    formAddPicture: document.querySelector("#js-form-add-img"),
    backGallery: document.querySelector("#js-back-to-gallery"),
    barModal: document.querySelector("#js-bar-modal"),
};

const $errorTitle = document.querySelector(".bordertitle-error");
const $errorTitleText = document.querySelector(".error-title-form");
const $modalContainer = document.querySelector(".modal-container");
const $modalTriggers = document.querySelectorAll(".modal-trigger");
const $fileInput = document.querySelector("#file-input");
const $titreInput = document.getElementById("titre");
const $categorieSelect = document.getElementById("categorie");
const $submitBtn = document.querySelector(".confirm-button-form-add");

// Événement de chargement de la page
window.addEventListener("load", () => {
    updateLoginButton();
    updateUI();
});

// Gestion de la modal de la galerie

// Affichage/masquage de la modal
$modalTriggers.forEach(($trigger) =>
    $trigger.addEventListener("click", () => {
        $modalContainer.classList.toggle("active");
    })
);

getAllWorks().then((data) => {
    // Mise à jour de la galerie dans la modal
    createGalleryModalItems(data);
});

getAllWorks().then(() => {
    // Passage à la section d'ajout d'une photo dans la modal
    $modalElements.addPicture.addEventListener("click", () => {
        $modalElements.modalTitle.textContent = "Ajout Photo";
        $modalElements.galleryModal.style.display = "none";
        $modalElements.deleteGallery.style.display = "none";
        $modalElements.addPicture.style.display = "none";
        $modalElements.formAddPicture.style.display = "flex";
        $modalElements.backGallery.style.display = "block";
        $modalElements.barModal.style.display = "none";
    });

    // Retour à la galerie dans la modal avec mise à jour
    $modalElements.backGallery.addEventListener("click", () => {
        updateModalElements();

        getAllWorks().then((data) => {
            $modalElements.galleryModal.innerHTML = "";
            createGalleryModalItems(data);
        });
    });
});

// Suppression de toute la galerie et mise à jour de l'API, de la galerie dans la modal et de la galerie principale
$modalElements.deleteGallery.addEventListener("click", () => {
    getAllWorks()
        .then((data) => {
            return Promise.all(data.map((element) => deleteGalleryItem(element.id)));
        })
        .then(() => {
            getAllWorks().then((data) => {
                $modalElements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
                renderGallery(data);
            });
        });
});
