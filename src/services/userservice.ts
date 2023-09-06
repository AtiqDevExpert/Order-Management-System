import jwt_decode from 'jwt-decode';
import { retrieveItem, saveItem, removeItem } from '../config/storage';
import * as apiService from './apiservice';
import * as constants from '../constants/apis';

export const isLoggedIn = () => {
    let userDetails:any = getUserDetails();
    if (userDetails && userDetails.store_id && userDetails.store_id != "") {
        return true;
    } else {
        return false;
    }
}

export const getPrinterReference = () => {
    let itemPrinter = retrieveItem("PRINTER_REFERENCE");
    if(itemPrinter == null || itemPrinter == undefined){
        return ""
    }else{
        return itemPrinter
    }
}

export const savePrinterReference = (printerRef:string) => {
    saveItem("PRINTER_REFERENCE",printerRef)
    // let itemPrinter = retrieveItem("PRINTER_REFERENCE");
    // if(itemPrinter == null || itemPrinter == undefined){
    //     return ""
    // }else{
    //     return itemPrinter
    // }
}

export const getUserDetails = () => {
    let token = retrieveItem("ACCESS_TOKEN");
    try {
        let decoded:any = jwt_decode(token);
        if (decoded) {
            return decoded;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

export const setAccessToken = (accessToken:string) => {
    return saveItem("ACCESS_TOKEN", accessToken);
}


export const getAccessToken = () => {
    let token = retrieveItem("ACCESS_TOKEN");
    if (token && token != "" && token != null) {
        return token;
    } else {
        return "";
    }
}

export const removeAccessToken = () => {
    return removeItem("ACCESS_TOKEN");
}

export const getStoreId = () => {
    let userDetails = getUserDetails();
    if (userDetails && userDetails.store_id) {
        return userDetails.store_id;
    } else {
        return "";
    }
}

export const getStoreStatus = () => {
    let userDetails = getUserDetails();
    if (userDetails && userDetails.store_status) {
        return userDetails.store_status == "open"? true: false;
    } else {
        return false;
    }
}


export const getName = () => {
    let userDetails = getUserDetails();
    if (userDetails && userDetails.name) {
        return userDetails.name;
    } else {
        return "";
    }
}

export const getEmail = () => {
    let userDetails = getUserDetails();
    if (userDetails && userDetails.email) {
        return userDetails.email;
    } else {
        return "";
    }
}

export const getMobileNumber = () => {
    let userDetails = getUserDetails();
    if (userDetails && userDetails.mobile) {
        return userDetails.mobile;
    } else {
        return "";
    }
}

export const setPresignPreference = (presignPreference:string) => {
    return saveItem("PRESIGNIN_PREFERENCE", presignPreference);
}


export const getPresignPreference = () => {
    return retrieveItem("PRESIGNIN_PREFERENCE");
}



export const setFirebaseToken = (firebaseToken:string) => {
    return saveItem("FIREBASE_TOKEN", firebaseToken);
}


export const getFirebaseToken = () => {
    return retrieveItem("FIREBASE_TOKEN");
}

export const removeFirebaseToken = () => {
    return removeItem("FIREBASE_TOKEN");
}