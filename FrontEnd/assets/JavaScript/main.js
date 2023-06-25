// Événement de chargement de la page
document.addEventListener("DOMContentLoaded", (event) => {
    const $uploadButton = document.querySelector("#uploadButton");

    if ($uploadButton) {
        $uploadButton.addEventListener("click", function () {
            $fileInput.click();
        });
    }
});


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

getAllCategories().then((data) => {
    generateCategoryOptions(data);
});
