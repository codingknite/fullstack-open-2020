import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data);
}

const create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, object) => {
    const request = axios.put(`${baseURL}/${id}`, object);
    return request.then(response => response.data)
}
 
const deleteItem = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}
export default { getAll, create, update, deleteItem } 