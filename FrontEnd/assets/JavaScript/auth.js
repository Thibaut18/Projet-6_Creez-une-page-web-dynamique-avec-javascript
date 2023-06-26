const token = localStorage.getItem("token");

/**
 * Vérifie si l'utilisateur est connecté (admin)
 * @returns {boolean} - True si l'utilisateur est connecté, sinon False
 */
const isLogged = () => !!token;

/**
 * Déconnexion de l'utilisateur (admin)
 */
const logOut = () => {
    localStorage.clear("token");
    console.log("Déconnecté");
    window.location.reload();
};

/**
 * Met à jour le bouton de connexion/déconnexion
 */
const updateLoginButton = () => {
    const $loginButton = document.querySelector("#js-login-button");
    if (isLogged()) {
        $loginButton.href = "#";
        $loginButton.innerText = "logout";
        $loginButton.addEventListener("click", () => {
            logOut();
            $loginButton.innerText = "Connexion";
        });
    }
};

// Événement de chargement de la page
window.addEventListener("load", () => {
    updateLoginButton();
});
