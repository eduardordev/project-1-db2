
import { doDelete, doGet, doPatch, doPost } from '../utils/api';



export const getDefaultObject = () => {
    return (
        {
            "nombre": "",
            "direccion": "",
            "telefono": "",
            "email": "",
            "responsable": "",
    
        }
    )
}

export const getInvoices = (page, filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/invoices/?".concat("page=".concat(page)).concat(filterStr);
    
    return doGet(route);
}

export const addClient = (data) => {
    let route = "/client/"
    let headers = { "Content-Type": "multipart/form-data" }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData, headers);
}

export const getClient = (id) => {
    let route = "/client/".concat(id)
    
    return doGet(route);
}

export const getClientList = () => {
    let route = "/client/get_clients_list/";
    
    return doGet(route);
}

export const deleteClient = (id) => {
    let route = "/client/".concat(id)
    
    return doDelete(route)
}

export const updateClient = (data, id) => {
    let route = "/client/".concat(id).concat("/")
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
                if(data[key] != null && data[key] !== ""){
                    formData.append(key, data[key])
                }
            });
    return doPatch(route, formData);
}

export const exportClient = () =>{
    let route = "/client/export";
    ;
    return doGet(route);
}