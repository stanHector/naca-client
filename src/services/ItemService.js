import axios from "axios";

import { BaseURL } from "./index";

export const GetItems = async () => {
    try {
        const { data } = await axios.get(`${BaseURL}/items`)
        return data
    } catch (error) {
        return error.message
    }
}

class ItemService {
    getItems() {
        return axios.get(`${BaseURL}/items`);
    }

    getAllItems() {
        return axios.get(`${BaseURL}/all-items`);
    }
    createItem(item) {
        return axios.post(`${BaseURL}/item`, item);
    }

    getItemById(itemId) {
        return axios.get(`${BaseURL}/item/` + itemId);
    }

    updateItem(item, itemId) {
        return axios.put(`${BaseURL}/item/` + itemId, item);
    }

    deleteItem(itemId) {
        return axios.delete(`${BaseURL}/item/` + itemId);
    }
}

export default new ItemService();