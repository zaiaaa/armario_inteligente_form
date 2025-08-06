import axios from "axios";

const Api = axios.create({
    baseURL: "https://api-armario-inteligente.onrender.com",
})

export {Api}



