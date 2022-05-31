import axios from 'axios'

const API_URL = `192.168.1.14`

const api = axios.create({
    baseURL: `http://${ API_URL }:8000/api/happy/`
})

export default api