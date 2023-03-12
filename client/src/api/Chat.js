import setToken from './index'

const END_POINT = process.env.REACT_APP_SERVER_URL + '/api/chat/'
const axios = setToken(localStorage.getItem('jwt'))

export const getRooms = () => axios.get(END_POINT)
export const joinRoom = data => axios.post(END_POINT + 'join', data)
export const leaveRoom = data => axios.post(END_POINT + 'leave', data)
export const addRoom = data => axios.post(END_POINT , data)
export const getJoinedRooms = () => axios.get(END_POINT + 'myrooms')

