import React, { Component } from "react";
import '../App.css'
import AssetService from "../services/AssetService";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, CloudDownloadOutlined, AccountBalanceOutlined, SearchOutlined } from '@material-ui/icons'
import { CSVLink } from "react-csv";
import axios from 'axios'
import { BaseURL } from "../services";

const headers = [
  // { label: "Id", key: "id" },
  { label: "Description", key: "description" },
  { label: "AssetId", key: "assetId" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "OtherBrand/Make", key: "otherBrand" },
  { label: "Model Number", key: "modelNumber" },
  { label: "Serial Number", key: "serialNumber" },
  { label: "Date Received", key: "dateReceived" },
  { label: "Purchase Price(N)", key: "purchasePrice" },
  { label: "FundedBy", key: "funder" },
  { label: "Project", key: "project" },
  { label: "Condition", key: "condition" },
  { label: "State", key: "states" },
  { label: "Facility", key: "facility" },
  { label: "Location", key: "location" },
  { label: "Assignee", key: "assignee" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
];


class Asset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')).password,
      states: JSON.parse(localStorage.getItem('user')).states,
      userType: JSON.parse(localStorage.getItem('user')).userType,
      assets: [],
      currentPage: 1,
      recordPerPage: 500,
      search: '',
      loading: false
    };

    this.csvLinkEl = React.createRef();
    this.form = React.createRef();

    this.createAsset = this.createAsset.bind(this);
    this.editAsset = this.editAsset.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    this.viewAsset = this.viewAsset.bind(this);
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
      } else {
        this.searchAsset(this.state.currentPage + 1)
      }
    }
  };

  //Show Last Page
  showLastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
      else {
        this.searchAsset(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
    }
  };

  //Show First page
  showFirstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(firstPage);
      } else {
        this.searchAsset(firstPage)
      }
    }
  };

  //Show previous page
  showPrevPage = () => {
    let prevPage = 1
    if (this.state.currentPage > prevPage) {
      if (!this.state.search) {
        this.getAssetsByStatesPagination(this.state.currentPage - prevPage);
      } else {
        this.searchAsset(this.state.currentPage - prevPage);
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
    axios.get(`${BaseURL}/assets/${this.state.userType === 'User' ? this.state.search : ''}?page=${currentPage}&size=${this.state.recordPerPage}`)
      // axios.get(`${BaseURL}/assets/` + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
      .then(response => response.data).then((data) => {
        this.setState({
          assets: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1
        });
      });
  };

  //Reset Search Box
  resetAsset = (currentPage) => {
    this.setState({ "search": '' });
    this.getAssetsByStatesPagination(currentPage);
  };

  // deleteAsset(id) {
  //   this.setState({ open: true, assetId: id })
  // }

  deleteAsset(id) {
    const text = 'Are you sure you want to delete?'
    if (window.confirm(text) === true) {
      AssetService.deleteAsset(id).then((res) => {
        this.setState({
          assets: this.state.assets.filter((asset) => asset.id !== id),
        });
      });
    }
  }

  // CRS-Bvnr-bSj9-rVGrW
  editAsset(id) {
    this.props.history.push(`/update-asset/${id}`);
  }

  viewAsset(id) {
    this.props.history.push(`/view-asset/${id}`);
  }

  createAsset() {
    this.props.history.push("/create-asset");
  }

  cancel() {
    this.props.history.push("/dashboard");
  }

  upload() {
    this.props.history.push("/upload-asset");
  }

  render() {
    const { assets, currentPage, totalPages, recordPerPage, search } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('user'))?.userType;
    const userType = user?.userType;
    const userLocation = user?.result?.states
    const userAssets = this.state?.assets?.map((x) => x).filter((x) => x.states === userLocation);
    const mainAssets = this.state.assets?.map((x) => x).filter((x) => x.category === "Asset");

    const data = userType !== 'User' ? mainAssets : mainAssets;

    const downloadReport = async () => {
      this.setState({ data: data }, () => {
        setTimeout(() => {
          this.csvLinkEl.current.link.click();
        });
      });
    }

    return (
      <React.Fragment>

        <div className="asset-list">
          {/* <Topbar /> */}
          {/* <div className="row"> */}
          <div className="top" style={{ backgroundColor: "#CE5300" }}>
            <div style={{ marginTop: "20px" }} >
              <span className="logs">Assets</span>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3">
              <input style={{ borderRadius: "12px", marginTop: "20px", marginRight: "15px", marginLeft: "40px" }} type="text" className="form-control" name="search" size="100" placeholder="Search by Manufacturer or Assignee or Email or Description or SerialNumber or AssetID" value={search} onChange={this.searchBox} />
              <button style={{ borderRadius: "12px", marginTop: "15px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} type="button" name="search" className=" btn btn-outline-primary" onClick={this.searchAsset}><SearchOutlined /></button>
            </div>
            <div className="topRight">

              <button style={{ marginRight: "8px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} className="btn btn-primary float-lg-end" onClick={this.cancel.bind(this)}>
                <AccountBalanceOutlined />
              </button>

              <button style={{ marginRight: "8px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} className="btn btn-primary float-lg-end" onClick={downloadReport}>
                <CloudDownloadOutlined />
              </button>

            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center", fontSize: "12px" }}>
              <tr>
                <th>No.</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>AssetID</th>
                <th>SerialNumber</th>
                <th>Date Received</th>
                <th>FundedBy</th>
                <th>Model</th>
                <th>Purchase Price</th>
                <th>State</th>
                <th>Year of purchase </th>
                <th>Implementer</th>
                <th>Implemention Period</th>
                <th>Location</th>
                <th>Custodian</th>
                <th>Condition</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th colSpan="3">Actions</th>
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
                    <td>{asset.category}</td>
                    <td>{asset.type}</td>
                    <td>{asset.assetId}</td>
                    <td>{asset.serialNumber}</td>
                    <td>{asset.dateReceived}</td>
                    <td>{asset.funder}</td>
                    <td>{asset.model}</td>
                    <td>{asset.purchasePrice}</td>
                    <td>{asset.states}</td>
                    <td>{asset.yearOfPurchase}</td>
                    <td>{asset.implementer}</td>
                    <td>{asset.implementationPeriod}</td>
                    <td>{asset.location}</td>
                    <td>{asset.custodian}</td>
                    <td>{asset.condition}</td>
                    <td>{asset.emailAddress}</td>
                    <td>{asset.phone}</td>
                    <td>{asset.status}</td>

                    {/* <td className="text-center"><Link to={`/update-asset/${asset.id}`} className="edit"><Edit /></Link></td> */}
                    {/* {
                      users !== 'User' &&
                      <td className="text-center" style={{ paddingLeft: "20px" }}><i onClick={() => this.deleteAsset(asset.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                    } */}
                    <td className="text-center" style={{ paddingLeft: "20px" }}><Link to={`/view-asset/${asset.id} `} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="table">
            <div style={{ float: 'left', fontFamily: 'monospace', color: '#0275d8' }}>
              Page {currentPage} of {totalPages}
            </div>
            <div style={{ float: 'right' }}>
              <div className="clearfix"></div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1 ? true : false} onClick={this.showPrevPage}>Previous</a></li>
                  <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1 ? true : false} onClick={this.showFirstPage}>First</a></li>
                  <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages ? true : false} onClick={this.showNextPage}>Next</a></li>
                  <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages ? true : false} onClick={this.showLastPage}>Last</a></li>
                </ul>
              </nav>
            </div>
          </table>
          <CSVLink
            headers={headers}
            data={data}
            totalPages={totalPages}
            filename="assets.csv"
            target="_blank"
            ref={this.csvLinkEl} />
        </div>
      </React.Fragment>
    )
  }
}
export default Asset;