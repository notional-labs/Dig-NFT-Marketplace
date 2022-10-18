import { user } from "../../data/dummyData/user";
import axios from "axios";

const API = process.env.REACT_APP_MARKET_API

export const dummyLogin = () => {
    return user
}

export const dummyGetUserById = (id) => {
    return user
}

export const getUserFromAddress = async (address) => {
    try {
        const res = await axios.get(`${API}/users/${address}`)
        return  res.data && res.data.data
    }
    catch(e) {
        throw e
    }
}   

export const updateUser = async (user, address) => {
    try {
        await axios.put(`${API}/users/${address}/edit`, user)
    }
    catch (e) {
        throw e
    } 
}