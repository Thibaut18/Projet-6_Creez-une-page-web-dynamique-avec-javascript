// Événement de chargement de la page
document.addEventListener("DOMContentLoaded", (event) => {
    const $uploadButton = document.querySelector("#uploadButton");

    if ($uploadButton) {
        $uploadButton.addEventListener("click", function () {
            $fileInput.click();
        });
    }
});

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

    $previewDeleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deletePreview();
});

// Événement de changement de l'input de sélection de fichier pour la prévisualisation de l'image
$fileInput.addEventListener("change", previewImage);

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

fetchCategories().then((data) => {
    generateCategoryOptions(data);
});
