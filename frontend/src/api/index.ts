import axios from "axios";

export default {
  configureApi(apiUrl: string) {
    axios.defaults.withCredentials = true;

    if (!apiUrl) {
      return;
    }

    axios.defaults.baseURL = apiUrl;
  },
};
