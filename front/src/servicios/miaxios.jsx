import axios from 'axios';

const miAxios = axios.create ({
	baseURL: 'http://localhost:3000'
})

export default miAxios;