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

//   getAllAssets() {
//     return axios.get(`${BaseURL}/all-assets`)
//   }

//   getAllAssetsById(assetId) {
//     return axios.get(`${BaseURL}/all-assets/` + assetId)
//   }

  createInventory(inventory) {
    return axios.post(`${BaseURL}/inventory`, inventory);
  }

  getInventoryById(inventoryId) {
    return axios.get(`${BaseURL}/invent/` + inventoryId);
  }

  // getAllInventoriesById(inventoryId) {
  //   return axios.get(`${BaseURL}/all-inventories/` + inventoryId)
  // }


  createBincard(bincard) {
    return axios.post(`${BaseURL}/bincard`, bincard);
  }

  updateInventory(inventory, inventoryId) {
    return axios.put(`${BaseURL}/inventory/` + inventoryId, inventory);
  }

//   updateAssets(asset, assetId) {
//     return axios.put(`${BaseURL}/assets/` + assetId, asset);
//   }

  deleteInventory(inventoryId) {
    return axios.delete(`${BaseURL}/inventory/` + inventoryId);
  }

//   downloadAsset() {
//     return axios.get(`${BaseURL}/download`);
//   }

}

export default new InventoryService();