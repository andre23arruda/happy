// Altere http://192.168.0.12:8000 para o endereço da sua API

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.12:8000/api/nlw/'
    // baseURL: 'http://localhost:8000/api/nlw/'
})

export default api