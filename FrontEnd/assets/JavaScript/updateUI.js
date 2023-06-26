/**
 * Met à jour l'interface utilisateur si l'utilisateur est connecté (admin)
 */
const updateUI = () => {
    const $filter = document.querySelector("#js-filter-box");
    const $editBar = document.querySelector("#js-edit-mode");
    const $alignItems = document.querySelector("#introduction");
    const $buttonEditGallery = document.querySelector("#js-button-edit-gallery");
    const $buttonEditProfil = document.querySelector("#js-button-edit-profil");
    const $buttonEditDescription = document.querySelector("#js-button-edit-description");

    if (isLogged()) {
        $filter.style.display = "none";
        $editBar.style.display = "flex";
        $alignItems.style.alignItems = "inherit";
        $buttonEditDescription.style.display = "inline-flex";
        $buttonEditGallery.style.display = "inline-flex";
        $buttonEditProfil.style.display = "inline-flex";
    }
};
