import axios from "axios"
export const axiosInstance=axios.create({
    baseURL :"https://gamewall.herokuapp.com/api/"
})