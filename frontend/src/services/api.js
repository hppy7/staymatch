import axios from "https://cdn.skypack.dev/axios";

const API = axios.create({
    baseURL: "https://staymatch.onrender.com/api"
});

export default API;
