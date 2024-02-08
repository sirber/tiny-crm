function fetchConfig() {
  return fetch('config.json')
    .then(response => {
      if (!response.ok) {
        throw ('Could not fetch config');
      }

      console.log("Config file found");
      const config = response.json();
      return config;
    });
}

export default fetchConfig;