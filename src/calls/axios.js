import axios from "axios";

// export let BASE = "http://192.168.43.151:8000/api";
// export let BASE = "http://127.0.0.1:8000";
export let BASE  = "https://habiapi.elthedlegal.com";

axios.defaults.baseURL  = BASE + "/api";

export default axios;