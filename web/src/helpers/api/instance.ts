import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: `http://${process.env.REACT_APP_IPADDRESS_API}/`,
    timeout:30000
});

export const getInstance = (url: string , config: AxiosRequestConfig={}) =>{
    return instance.get(url , config)
}

export const postInstance = (url: string , data:any=null , config: AxiosRequestConfig={}) =>{
    return instance.post(url , data , config)
}

export const putInstance = (url: string , data:any=null , config: AxiosRequestConfig={}) =>{
    return instance.put(url , data , config)
}

export const deleteInstance = (url: string , config: AxiosRequestConfig={}) =>{
    return instance.delete(url , config)
}