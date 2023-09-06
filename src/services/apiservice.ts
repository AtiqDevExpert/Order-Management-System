import axios from '../config/axios';

export const callPostApi = (endPoint:string, data:any) => {
    return axios.post(endPoint, data)
}

export const callGetApi = (endPoint:string) => {
    return axios.get(endPoint)
}

export const callGetApiWithCancel = (endPoint:string, config:any) => {
    return axios.get(endPoint, config)
}

export const callPutApi = (endPoint:string, data:any, config:any) => {
    return axios.put(endPoint, data, config)
}

export const callDeleteApi = (endPoint:string, data:any) => {
    return axios.delete(endPoint, data)
}