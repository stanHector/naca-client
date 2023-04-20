import axios from "axios";

import { BaseURL } from "./index";

export const GetBinCards = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/bincards`)
    return data
  } catch (error) {
    return error.message
  }
}

class BinCardService {
  getBincards() {
    return axios.get(`${BaseURL}/bincards`);
  }

//   getAllAssets() {
//     return axios.get(`${BaseURL}/all-assets`)
//   }

  getAllBincardById(bincardId) {
    return axios.get(`${BaseURL}/bincard/` + bincardId)
  }

  createBincard(bincard) {
    return axios.post(`${BaseURL}/bincard`, bincard);
  }

  getBincardById(bincardId) {
    return axios.get(`${BaseURL}/bincard/` + bincardId);
  }

//   updateAsset(asset, assetId) {
//     return axios.patch(`${BaseURL}/asset/` + assetId, asset);
//   }

//   updateAssets(asset, assetId) {
//     return axios.put(`${BaseURL}/assets/` + assetId, asset);
//   }

//   deleteAsset(assetId) {
//     return axios.delete(`${BaseURL}/asset/` + assetId);
//   }

//   downloadAsset() {
//     return axios.get(`${BaseURL}/download`);
//   }

}

export default new BinCardService();