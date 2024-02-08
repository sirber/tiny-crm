import axios from "axios";

const basePath = "/auth/";

export function getSession() {
    return axios
        .get(basePath)
        .then((response) => response.data);
}

export function login(user: any) {
    return axios
        .post(basePath + "login", user)
        .then((response) => response.data);
}
