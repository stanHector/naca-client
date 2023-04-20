import axios from "axios";

import { BaseURL } from "./index";

export const getInventories = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/inventories`)
    return data
  } catch (error) {
    return error.message
  }
}

class InventoryService {
  getInventories() {
    return axios.get(`${BaseURL}/inventories`);
  }

  createInventory(inventory) {
    return axios.post(`${BaseURL}/inventory`, inventory);
  }

  getInventoryById(inventoryId) {
    return axios.get(`${BaseURL}/invent/` + inventoryId);
  }

  createBincard(bincard) {
    return axios.post(`${BaseURL}/bincard`, bincard);
  }

  updateInventory(inventory, inventoryId) {
    return axios.patch(`${BaseURL}/inventories/` + inventoryId, inventory);
  }

  deleteInventory(inventoryId) {
    return axios.delete(`${BaseURL}/inventory/` + inventoryId);
  }
}

export default new InventoryService();