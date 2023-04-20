import React, { Component } from "react";
import '../App.css'
import AssetService from "../services/AssetService";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, CloudUploadOutlined, CloudDownloadOutlined, AddCircleOutlineSharp, AccountBalanceOutlined, SearchOutlined, Update, UpdateOutlined, EditAttributesSharp } from '@material-ui/icons'
import { CSVLink } from "react-csv";
import axios from 'axios'
import { BaseURL } from "../services";
import InventoryService from "../services/InventoryService";

const headers = [
  // { label: "Id", key: "id" },
  { label: "Warehouse Name", key: "warehouseName" },
  { label: "Description", key: "description" },
  { label: "Batch No.", key: "batchNo" },
  { label: "Manufacture date", key: "manufactureDate" },
  { label: "Expiry date", key: "expiryDate" },
  { label: "Unit", key: "unit" },
  { label: "Stock State", key: "stockState" },
  { label: "Opening balance", key: "openingBalance" },
  { label: "Condition", key: "condition" },
  { label: "Quantity Received", key: "quantityReceived" },
  { label: "Closing Stock", key: "closingStock" },
  { label: "Stock On Hand", key: "stockOnHand" },
  { label: "Reporting Month", key: "reportingMonth" },
  { label: "Donor", key: "donor" }

];


class Consolidated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')).password,
      states: JSON.parse(localStorage.getItem('user')).states,
      userType: JSON.parse(localStorage.getItem('user')).userType,
      inventories: [],
      currentPage: 1,
      recordPerPage: 100,
      search: '',
      loading: false
    };

    this.csvLinkEl = React.createRef();
    this.form = React.createRef();

    // this.createAsset = this.createAsset.bind(this);
    this.editInventory = this.editInventory.bind(this);
    // this.deleteAsset = this.deleteAsset.bind(this);
    this.viewInventory = this.viewInventory.bind(this);
  }

  componentDidMount() {
    this.getInventoriesByStatesPagination(this.state.currentPage);

  }


  getInventoriesByStatesPagination(currentPage) {
    currentPage = currentPage - 1;
    axios.get(`${BaseURL}/inventories/${this.state.userType === 'User' ? this.state.states : ''}?page=${currentPage}&size=${this.state.recordPerPage}`)
      .then(response => response.data).then((data) => {
        this.setState({
          inventories: data.content,
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
        this.getInventoriesByStatesPagination(this.state.currentPage + 1);
      } else {
        this.searchInventory(this.state.currentPage + 1)
      }
    }
  };

  //Show Last Page
  showLastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
      if (!this.state.search) {
        this.getInventoriesByStatesPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
      else {
        this.searchInventory(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
    }
  };

  //Show First page
  showFirstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (!this.state.search) {
        this.getInventoriesByStatesPagination(firstPage);
      } else {
        this.searchInventory(firstPage)
      }
    }
  };

  //Show previous page
  showPrevPage = () => {
    let prevPage = 1
    if (this.state.currentPage > prevPage) {
      if (!this.state.search) {
        this.getInventoriesByStatesPagination(this.state.currentPage - prevPage);
      } else {
        this.searchInventory(this.state.currentPage - prevPage);
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
  searchInventory = (currentPage) => {
    currentPage = currentPage - 1;
    axios.get(`${BaseURL}/inventory/` + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
      .then(response => response.data).then((data) => {
        this.setState({
          inventories: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1
        });
      });
  };
  //Reset Search Box
  resetInventory = (currentPage) => {
    this.setState({ "search": '' });
    this.getInventoriesByStatesPagination(currentPage);
  };

  // deleteAsset(id) {
  //   this.setState({ open: true, assetId: id })
  // }

  deleteInventory(id) {
    const text = 'Are you sure you want to delete?'
    if (window.confirm(text) === true) {
      InventoryService.deleteInventory(id).then((res) => {
        this.setState({
          inventories: this.state.inventories.filter((inventory) => inventory.id !== id),
        });
      });
    }
  }


  // CRS-Bvnr-bSj9-rVGrW
  editInventory(id) {
    this.props.history.push(`/update/${id}`);
  }

  updateInventory(id) {
    this.props.history.push(`/update-invent/${id}`);
  }

  viewInventory(id) {
    this.props.history.push(`/view-inventory/${id}`);
  }

  // createAsset() {
  //   this.props.history.push("/create-asset");
  // }

  cancel() {
    this.props.history.push("/dashboard");
  }

  upload() {
    this.props.history.push("/upload-inventory");
  }

  render() {
    const { inventories, currentPage, totalPages, recordPerPage, search } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('user'))?.userType;
    const userType = user?.userType;
    const userLocation = user?.result?.states
    const userInventories = this.state?.inventories?.map((x) => x).filter((x) => x.states === userLocation)
    // const data = userType !== 'User' ? this.state.assets : userAssets;
    const data = userType !== 'User' ? this.state.inventories : userInventories;

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
          <div className="top" style={{ backgroundColor: "#008000" }}>
            <div style={{ marginTop: "20px" }} >
              <span className="logs">Consolidated Stock</span>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3">
              <input style={{ borderRadius: "12px", marginTop: "20px", marginRight: "15px", marginLeft: "40px" }} type="text" className="form-control" name="search" size="100" placeholder="Search by Warehouse name/ Description" value={search} onChange={this.searchBox} />
              <button style={{ borderRadius: "12px", marginTop: "15px", backgroundColor: "#82E0AA", borderColor: "#82E0AA", color: "#D5F5E3" }} type="button" name="search" className=" btn btn-outline-primary" onClick={this.searchInventory}><SearchOutlined /></button>
            </div>
            <div className="topRight">

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
            <thead style={{ textAlign: "center", fontSize: "12px" }}>
              <tr>
                <th>No.</th>
                <th>Warehouse Name</th>
                <th>Description</th>
                <th>Expiry Date</th>
                <th>Unit</th>
                <th>Stock State</th>
                <th>Stock On Hand</th>
                <th colSpan="4" style={{ backgroundColor: "wheat" }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center", fontSize: "11px" }}>
              {inventories.length === 0 ?
                <tr align="center"><td colSpan="20">No Record Found</td></tr> :
                data?.map((inventory, index) => (
                  <tr key={inventory?.id}>
                    <td>
                      {(recordPerPage * (currentPage - 1)) + index + 1}</td>
                    <td>{inventory.warehouseName}</td>
                    <td>{inventory.description}</td>
                    <td>{inventory.expiryDate}</td>
                    <td>{inventory.unit}</td>
                    <td>{inventory.stockState}</td>
                    <td>{inventory.stockOnHand}</td>
                    <td className="text-center" style={{ paddingLeft: "20px" }}><Link to={`/update/${inventory.id}`} className="edit"><UpdateOutlined /></Link></td>

                    {/* <td className="text-center" style={{ paddingLeft: "20px" }}><Link to={`/view-inventory/${inventory.id} `} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td> */}
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
            filename="consolidated_stock.csv"
            target="_blank"
            ref={this.csvLinkEl} />
        </div>
      </React.Fragment>
    )
  }
}
export default Consolidated;