import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const LOCAL = process.env.REACT_APP_LOCAL


const api = axios.create({
    baseURL: `http${ LOCAL ? '' : 's'}://${ API_URL }/api/`
})

export default api