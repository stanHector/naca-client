import axios from "axios";

import { BaseURL } from "./index";

export const GetAssets = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/assets`)
    return data
  } catch (error) {
    return error.message
  }
}

class AssetService {
  getAssets() {
    return axios.get(`${BaseURL}/assets`);
  }

  getAllAssets() {
    return axios.get(`${BaseURL}/all-assets`)
  }

  getAllAssetsById(assetId) {
    return axios.get(`${BaseURL}/all-assets/` + assetId)
  }

  createAsset(asset) {
    return axios.post(`${BaseURL}/asset`, asset);
  }

  getAssetById(assetId) {
    return axios.get(`${BaseURL}/asset/` + assetId);
  }

  updateAsset(asset, assetId) {
    return axios.put(`${BaseURL}/asset/` + assetId, asset);
  }

  updateAssets(asset, assetId) {
    return axios.patch(`${BaseURL}/asset/` + assetId, asset);
  }

  deleteAsset(assetId) {
    return axios.delete(`${BaseURL}/asset/` + assetId);
  }

  downloadAsset() {
    return axios.get(`${BaseURL}/download`);
  }

}

export default new AssetService();