import { initializeFilterButtons, initializeGalleryAndCategoriesButton } from "./Controller/galleryController.js";
import { controlLoginButton } from "./Controller/controllerAuth.js";
import { fetchWorks, addGalleryItem } from "./Model/modelModal.js";
import { $modalTriggers } from "./View/viewModal.js";//
import { updateModalElements } from "./View/viewGallery.js";
import { deleteGalleryItem } from "./Model/modelGallery.js";
import { token } from "./Model/modelAuth.js";//
import { isLogged } from "./Model/modelAuth.js";
import { logOut } from "./Model/modelAuth.js";
import { updateUI } from "./View/viewModal.js";//
import { updateLoginButton } from "./View/viewAuth.js";

const data = await fetchWorks();

initializeFilterButtons();
initializeGalleryAndCategoriesButton();
console.log(isLogged());
updateLoginButton(isLogged(), logOut());
console.log("dans l'index, avant controlelogbut");
controlLoginButton();
updateUI(isLogged());

//fetchWorks();


updateModalElements(data);


