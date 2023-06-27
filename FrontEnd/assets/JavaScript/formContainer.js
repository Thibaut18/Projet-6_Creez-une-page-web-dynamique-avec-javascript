const $preview = document.getElementById("preview");
const $buttonUploadPhoto = document.querySelector(".button-upload-photo");
const $textFormatImg = document.querySelector("#text-format-img");
const $previewDeleteBtn = document.querySelector("#js-delete-preview");

/**
 * Configure les gestionnaires d'événements pour la fenêtre modale (formulaire)
 */
const setupModalEventListeners = () => {
    // Gestionnaire d'événement pour ouvrir le formulaire d'ajout de photo
    $modalElements.addPicture.addEventListener("click", () => {
        $modalElements.modalTitle.textContent = "Ajout Photo";
        $modalElements.galleryModal.style.display = "none";
        $modalElements.deleteGallery.style.display = "none";
        $modalElements.addPicture.style.display = "none";
        $modalElements.formAddPicture.style.display = "flex";
        $modalElements.backGallery.style.display = "block";
        $modalElements.barModal.style.display = "none";
    });

    // Gestionnaire d'événement pour revenir à la galerie
    $modalElements.backGallery.addEventListener("click", async () => {
        await updateGalleryAndUI();
    });
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
$previewDeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
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
});

document.addEventListener("DOMContentLoaded", () => {
    const $uploadButton = document.querySelector("#uploadButton");

    if ($uploadButton) {
        $uploadButton.addEventListener("click", function () {
            $fileInput.click();
        });
    }
});

// Événement de changement de l'input de sélection de fichier pour la prévisualisation de l'image
$fileInput.addEventListener("change", previewImage);

// Fonction pour générer les options de catégories
function generateCategoryOptions(data) {
    const $categories = document.querySelector("#categorie");
    // Création des options du select à partir des catégories de l'API
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].id;
        option.textContent = data[i].name;
        $categories.appendChild(option);
    }
}

getAllCategories().then((data) => {
    generateCategoryOptions(data);
});

// Configure les gestionnaires d'événements pour la fenêtre modale
setupModalEventListeners();