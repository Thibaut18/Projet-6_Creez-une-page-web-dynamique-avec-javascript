export const token = localStorage.getItem("token");

export const isLogged = () => !!token;

export const logOut = () => {
    localStorage.clear("token");
    window.location.reload();
};