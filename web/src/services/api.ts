import axios from 'axios'

// Altere para sua ROTA_API
const ROTA_API = '192.168.0.12'

const api = axios.create({
    baseURL: `http://${ ROTA_API }:8000/api/nlw/`
})

export default api