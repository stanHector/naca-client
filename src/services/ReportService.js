import axios from "axios";

import { BaseURL } from "./index";

export const GetReports = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/reports`)
    return data
  } catch (error) {
    return error.message
  }
}

class ReportService {
  getReports() {
    return axios.get(`${BaseURL}/reports`);
  }

//   getAllAssets() {
//     return axios.get(`${BaseURL}/all-assets`)
//   }

  getAllReportById(reportId) {
    return axios.get(`${BaseURL}/report/` + reportId)
  }

  createReport(report) {
    return axios.post(`${BaseURL}/report`, report);
  }

  getReportById(reportId) {
    return axios.get(`${BaseURL}/report/` + reportId);
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

export default new ReportService();