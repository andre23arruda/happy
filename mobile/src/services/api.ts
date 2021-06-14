import axios from 'axios'

const ROTA_API = `192.168.0.20`

const api = axios.create({
    baseURL: `http://${ ROTA_API }:8000/api/nlw/`
})

export default api