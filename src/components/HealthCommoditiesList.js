import React, { Component } from "react";
import '../App.css'
import AssetService from "../services/AssetService";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, CloudUploadOutlined, CloudDownloadOutlined, AddCircleOutlineSharp, AccountBalanceOutlined, SearchOutlined } from '@material-ui/icons'
import { CSVLink } from "react-csv";
import axios from 'axios'
import { BaseURL } from "../services";

const headers = [
  // { label: "Id", key: "id" },
  { label: "Description", key: "description" },
  { label: "AssetId", key: "assetId" },
  { label: "Serial Number", key: "serialNumber" },
  { label: "Date Received", key: "dateReceived" },
  { label: "Funded By", key: "fundedBy" },
  { label: "Model Number", key: "modelNumber" },
  { label: "Quantity", key: "quantity" },
  { label: "Unit Price", key: "unitPrice" },
  { label: "Purchase Price(N)", key: "purchasePrice" },
  { label: "Total Cost (USD)", key: "totalCostUsd" },
  { label: "Implementer", key: "implementer" },
  { label: "Implementation Period", key: "implementationPeriod" },
  { label: "Categories", key: "categories" },
  { label: "Location", key: "location" },
  { label: "Custodian", key: "custodian" },
  { label: "Condition", key: "condition" },
  { label: "State", key: "states" },
  // { label: "Facility", key: "facility" },
  { label: "Location", key: "location" },
  { label: "Email", key: "email" },
  { label: "Phone Number", key: "phone" },
  // { label: "Grant", key: "grnatBy" },
  // { label: "Status", key: "status" }
];

// const customStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     backgroundColor: 'rgba(0, 0, 0, .5)',
//     transition: 'opacity .2s ease',
//   },
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };


class HealthCommoditiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')).password,
      states: JSON.parse(localStorage.getItem('user')).states,
      userType: JSON.parse(localStorage.getItem('user')).userType,
      assets: [],
      currentPage: 1,
      recordPerPage: 100,
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
    axios.get(`${BaseURL}/assets/` + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
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
    const states = JSON.parse(localStorage.getItem('user'))?.states
    const userType = user?.userType;
    const userLocation = user?.result?.states
    const userAssets = this.state?.assets?.map((x) => x).filter((x) => x.states === states);
    const data = userType !== 'User' ? this.state.assets : userAssets;

    console.log("State::: " + states)
    console.log("Location:::  " + userLocation)

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
          <div className="top" style={{ backgroundColor: "#008000" }}>
            <div style={{ marginTop: "20px" }} >
              <span className="logs">Health Commondities</span>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3">
              <input style={{ borderRadius: "12px", marginTop: "20px", marginRight: "15px", marginLeft: "150px" }} type="text" className="form-control" name="search" size="55" placeholder="Search by Custodian/Email/fundedBy/implementer/AssetId" value={search} onChange={this.searchBox} />
              <button style={{ borderRadius: "12px", marginTop: "15px", marginBottom: "5px", backgroundColor: "#82E0AA", borderColor: "#82E0AA", color: "#D5F5E3" }} type="button" name="search" className=" btn btn-outline-primary" onClick={this.searchAsset}><SearchOutlined /></button>
            </div>
           <div className="topRight">
              {
                users !== 'User' &&
                <button style={{ marginRight: "8px", margin: "10px", backgroundColor: "#82E0AA", borderColor: "#82E0AA", color: "#D5F5E3" }} className="btn btn-primary float-lg-end" onClick={this.createAsset.bind(this)} >
                  <AddCircleOutlineSharp />
                </button>
              }
              {
                users !== 'User' &&
                <button style={{ marginRight: "8px", backgroundColor: "#82E0AA", borderColor: "#82E0AA", color: "#D5F5E3" }} className="btn btn-primary float-lg-end" onClick={this.upload.bind(this)}>
                  <CloudUploadOutlined />
                </button>}

              <button style={{ marginRight: "8px", backgroundColor: "#82E0AA", borderColor: "#82E0AA", color: "#D5F5E3" }} className="btn btn-primary float-lg-end" onClick={this.cancel.bind(this)}>
                <AccountBalanceOutlined />
              </button>
              {
                users !== 'User' &&
                <button style={{ marginRight: "8px", backgroundColor: "#82E0AA", borderColor: "#82E0AA", color: "#D5F5E3" }} className="btn btn-primary float-lg-end" onClick={downloadReport}>
                  <CloudDownloadOutlined />
                </button>
              }
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center", fontSize: "10px" }}>
              <tr>
                <th>No.</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>AssetId /Reg no.</th>
                <th>SerialNumber/chassis no.</th>
                <th>Date Received</th>
                <th>Funder</th>
                <th>Model</th>
                <th>Quantity</th>
                <th>Unit cost</th>
                <th>Total cost</th>
                <th>Total cost(USD)</th>
                <th>Year of purchase</th>
                <th>Implementer</th>
                <th>Implementation period</th>
                <th>State</th>
                <th>Location</th>
                <th>Custodian</th>
                <th>Condition</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center", fontSize: "10px" }}>
              {assets.length === 0 ?
                <tr align="center"><td colSpan="23">No Record Found</td></tr> :
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
                    <td>{asset.fundedBy}</td>
                    <td>{asset.model}</td>
                    <td>{asset.quantity}</td>
                    <td>{asset.unitPrice}</td>
                    <td>{asset.purchasePrice}</td>
                    <td>{asset.totalCostUsd}</td>
                    <td>{asset.yearOfPurchase}</td>
                    <td>{asset.implementer}</td>
                    <td>{asset.implementationPeriod}</td>
                    <td>{asset.states}</td>
                    <td>{asset.location}</td>
                    <td>{asset.custodian}</td>
                    <td>{asset.condition}</td>
                    <td>{asset.email}</td>
                    <td>{asset.phone}</td>
                    <td>{asset.status}</td>

                    <td className="text-center"><Link to={`/update-asset/${asset.id}`} className="edit"><Edit /></Link></td>
                    {
                      users !== 'User' &&
                      <td className="text-center" style={{ paddingLeft: "20px" }}><i onClick={() => this.deleteAsset(asset.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                    }
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
            data={assets}
            totalPages={totalPages}
            filename={"commodities.csv"}
            target="_blank"
            ref={this.csvLinkEl}
          />
        </div>
      </React.Fragment>
    )
  }
}
export default HealthCommoditiesList;