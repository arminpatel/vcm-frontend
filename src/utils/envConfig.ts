interface Config {
  apiUrl: string;
}

const config: Config = {
  apiUrl: import.meta.env.PROD
    ? "https://vcm-backend-production.up.railway.app"
    : "http://127.0.0.1:8000",
};

export default config;
