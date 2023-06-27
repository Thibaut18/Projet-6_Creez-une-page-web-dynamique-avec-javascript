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

// Gestion de la modal de la galerie

// Affichage/masquage de la modal
$modalTriggers.forEach(($trigger) =>
    $trigger.addEventListener("click", () => {
        $modalContainer.classList.toggle("active");
    })
);

/**
 * Met à jour la galerie et l'interface utilisateur.
 */
const updateGalleryAndUI = async () => {
    const data = await getAllWorks(); 
    updateModalElements(data); 
    setTimeout(() => {
        $preview.style.display = "none";
        $preview.src = "";
        $buttonUploadPhoto.style.display = "block";
        $textFormatImg.style.display = "block";
        $previewDeleteBtn.style.display = "none";

        $formAddPicture.reset();
        $submitBtn.setAttribute("disabled", "disabled");
        $submitBtn.classList.remove("active");
    }, 400);
};








