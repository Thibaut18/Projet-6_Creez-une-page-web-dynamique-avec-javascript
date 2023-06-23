import { isLogged, logOut } from "../Model/modelAuth.js";

export const updateLoginButton = (isLoggedIn, logoutAction) => {
    const $loginButton = document.querySelector("#js-login-button");
    const estConnecte = isLogged();
    if (estConnecte) {
        console.log("isLoggedIn est censé etre - true ===> isLoggedIn -" + estConnecte);
        $loginButton.href = "#";
        $loginButton.innerText = "logout";
        $loginButton.addEventListener("click", () => {
            console.log("a chaque clique sur le btn j écris ce message");
            logOut();
            /*console.log(localStorage.getItem("token"));
            localStorage.clear("token");
            console.log(localStorage.getItem("token"));
            window.location.reload();
            $loginButton.innerText = "Connexion"; */
        });
    }
};
