import { elements } from '../Model/modelModal.js';

export const modalElements = {
    galleryModal: document.querySelector("#js-gallery-modal"),
    addPicture: document.querySelector("#js-add-picture"),
    modalTitle: document.querySelector("#js-modal-title"),
    deleteGallery: document.querySelector("#js-delete-gallery"),
    formAddPicture: document.querySelector("#js-form-add-img"),
    backGallery: document.querySelector("#js-back-to-gallery"),
    barModal: document.querySelector("#js-bar-modal"),
};

export const $errorTitle = document.querySelector(".bordertitle-error");
export const $errorTitleText = document.querySelector(".error-title-form");
export const $modalContainer = document.querySelector(".modal-container");
export const $modalTriggers = document.querySelectorAll(".modal-trigger");
export const $preview = document.getElementById("preview");
export const $buttonUploadPhoto = document.querySelector(".button-upload-photo");
export const $textFormatImg = document.querySelector("#text-format-img");
export const $previewDeleteBtn = document.querySelector("#js-delete-preview");
export const $fileInput = document.querySelector("#file-input");
export const $titreInput = document.getElementById("titre");
export const $categorieSelect = document.getElementById("categorie");
export const $submitBtn = document.querySelector(".confirm-button-form-add");

export const updateUI = (isLogged) => {
    const $filter = document.querySelector("#js-filter-box");
    const $editBar = document.querySelector("#js-edit-mode");
    const $alignItems = document.querySelector("#introduction");
    const $buttonEditGallery = document.querySelector("#js-button-edit-gallery");
    const $buttonEditProfil = document.querySelector("#js-button-edit-profil");
    const $buttonEditDescription = document.querySelector("#js-button-edit-description");

    if (isLogged) {
        $filter.style.display = "none";
        $editBar.style.display = "flex";
        $alignItems.style.alignItems = "inherit";
        $buttonEditDescription.style.display = "inline-flex";
        $buttonEditGallery.style.display = "inline-flex";
        $buttonEditProfil.style.display = "inline-flex";
    }
};

export const updateModalElements = () => {
    elements.modalTitle.textContent = "Galerie photo";
    elements.galleryModal.style.display = "flex";
    elements.deleteGallery.style.display = "block";
    elements.addPicture.style.display = "block";
    elements.formAddPicture.style.display = "none";
    elements.backGallery.style.display = "none";
    elements.barModal.style.display = "block";
};

export const renderCategories = (data) => {
    const categories = document.querySelector("#categorie");
    // Création des options du select à partir des catégories de l'API
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].id;
        option.textContent = data[i].name;
        categories.appendChild(option);
    }
};

export const resetPreview = () => {
    // Suppression de l'image de prévisualisation
    $preview.style.display = "none";
    $preview.src = "";
    $buttonUploadPhoto.style.display = "block";
    $textFormatImg.style.display = "block";
    $previewDeleteBtn.style.display = "none";

    // Réinitialisation du formulaire
    $formAddPicture.reset();
    $submitBtn.setAttribute("disabled", "disabled");
    $submitBtn.classList.remove("active");
};

export const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
        $preview.style.display = "block";
        $preview.src = URL.createObjectURL(file);
        $buttonUploadPhoto.style.display = "none";
        $textFormatImg.style.display = "none";
        $previewDeleteBtn.style.display = "inline-flex";
    } else {
        resetPreview();
    }
};

export const showErrorMessage = () => {
    // Ajout de la classe "active" aux messages d'erreur si le formulaire est vide
    $errorTitleText.classList.add("active");
    $errorTitle.classList.add("active");
};