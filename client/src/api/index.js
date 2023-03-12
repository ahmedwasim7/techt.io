import axios from 'axios'

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  return axios
}

export default setToken
