import React, { Component } from "react";
import '../App.css'
import axios from 'axios'
import { BaseURL } from "../services";


class AssetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')).password,
      states: JSON.parse(localStorage.getItem('user')).states,
      userType: JSON.parse(localStorage.getItem('user')).userType,
      assets: [],
      currentPage: 1,
      recordPerPage: 10,
    };
  }

  componentDidMount() {
    this.getAssetsByStatesPagination(this.state.currentPage);
  }


  getAssetsByStatesPagination(currentPage) {
    currentPage = currentPage - 1;
    axios.get(`${BaseURL}/assets/${this.state.userType === 'User' ? this.state.states : ''}?page=${currentPage}&size=${this.state.recordPerPage}`)
      .then(response => response.data).then((data) => {
        this.setState({
          assets: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1
        });
      });
  }

  //Writing All the pagination functions
  //Show Next page
  showNextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(this.state.currentPage + 1);
      }
    }
  };

  //Show Last Page
  showLastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
    }
  };

  //Show First page
  showFirstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(firstPage);
      }
    }
  };

  //Show previous page
  showPrevPage = () => {
    let prevPage = 1
    if (this.state.currentPage > prevPage) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(this.state.currentPage - prevPage);
      }
    }
  };

  //Search Box Method
  searchBox = (e) => {
    this.setState({
      //assigning value to event target
      [e.target.name]: e.target.value,
    });
  };

  //Search Method Logic
  searchAsset = (currentPage) => {
    currentPage = currentPage - 1;
    axios.get("http://localhost:8080/api/v1/assets/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
      .then(response => response.data).then((data) => {
        this.setState({
          assets: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1
        });
      });
  };

  render() {
    const { assets, currentPage, recordPerPage } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('user'))?.userType;
    const userType = user?.userType;
    const userLocation = user?.result?.states
    const userAssets = this.state?.assets?.map((x) => x).filter((x) => x.states === userLocation)
    const data = userType !== 'User' ? this.state.assets : userAssets;

    return (
      <React.Fragment>
        <div className="asset-list">
          <div className="top">
            <div style={{ marginTop: "20px" }} >
              <span className="logs">Assets</span>
            </div>

          </div>
          <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center", fontSize: "12px" }}>
              <tr>
                <th>No.</th>
                <th>Description</th>
                <th>AssetID</th>
                <th>Model</th>
                <th>SerialNumber</th>
                <th>State</th>
                <th>Custodian</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center", fontSize: "11px" }}>
              {assets.length === 0 ?
                <tr align="center"><td colSpan="20">No Record Found</td></tr> :
                data?.map((asset, index) => (
                  <tr key={asset?.id}>
                    <td>
                      {(recordPerPage * (currentPage - 1)) + index + 1}</td>
                    <td>{asset.description}</td>
                    <td>{asset.assetId}</td>
                    <td>{asset.model}</td>
                    <td>{asset.serialNumber}</td>
                    <td>{asset.states}</td>
                    <td>{asset.custodian}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}
export default AssetsList;