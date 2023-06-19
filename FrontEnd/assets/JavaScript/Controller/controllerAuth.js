import { isLogged, logOut } from '../Model/modelAuth.js';
import { updateLoginButton } from '../View/viewAuth.js';

export const controlLoginButton = () => {
    window.addEventListener("load", () => {
        updateLoginButton(isLogged(), logOut);
    });
};