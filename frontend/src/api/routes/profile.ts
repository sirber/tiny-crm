import axios from "axios";

const basePath = "/profile/";

export function getProfile() {
  return axios
    .get(basePath)
    .then((response) => response.data);
}