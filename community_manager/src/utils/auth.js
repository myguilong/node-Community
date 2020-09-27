export function getToken() {
    return localStorage.getItem("user_data");
}

export function setToken(token) {
    return localStorage.setItem("user_data", token);
}

export function removeToken() {
    return localStorage.removeItem("user_data");
}
