import React, { Component } from "react";
import '../App.css'
import LoanService from "../services/LoanService";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, CloudDownloadOutlined, AddCircleOutlineSharp, AccountBalanceOutlined, SearchOutlined } from '@material-ui/icons'
import { CSVLink } from "react-csv";
import axios from 'axios'

const headers = [
  // { label: "Id", key: "id" },
  { label: "Firstname", key: "firstname" },
  { label: "Lastname", key: "lastname" },
  { label: "Email", key: "email" },
  { label: "Equipment type", key: "equipmentType" },
  { label: "Serial number", key: "serialnumber" },
  { label: "Model", key: "model" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Location", key: "location" },
  { label: "Expiry date", key: "expiryDate" },
  { label: "Acknowledged by", key: "acknowledgedBy" },
];

class LoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: JSON.parse(localStorage.getItem('user')).state,
      userType: JSON.parse(localStorage.getItem('user')).userType,
      loans: [],
      currentPage: 1,
      recordPerPage: 100,
      search: '',
    };

    this.csvLinkEl = React.createRef();

    this.createLoan = this.createLoan.bind(this);
    // this.editAsset = this.editAsset.bind(this);
    this.deleteLoan = this.deleteLoan.bind(this);
    // this.viewAsset = this.viewAsset.bind(this);
  }

  componentDidMount() {
    // this.getLoansByPagination(this.state.currentPage);
    this.getLoansByStatesPagination(this.state.currentPage);
  }


  getLoansByStatesPagination(currentPage) {
    currentPage = currentPage - 1;
    axios.get(`http://localhost:8080/api/v1/loans/${this.state.userType === 'User' ? this.state.states : ''}?page=${currentPage}&size=${this.state.recordPerPage}`)
      .then(response => response.data).then((data) => {
        this.setState({
          loans: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1
        });
      });
  }

  getLoansByPagination(currentPage) {
    currentPage = currentPage - 1;
    axios.get("http://localhost:8080/api/v1/loans?page=" + currentPage + "&size=" + this.state.recordPerPage)
      .then(response => response.data).then((data) => {
        this.setState({
          loans: data.content,
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
        this.getLoansByPagination(this.state.currentPage + 1);
      } else {
        this.searchLoan(this.state.currentPage + 1)
      }
    }
  };

  //Show Last Page
  showLastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
      if (!this.state.search) {
        this.getLoansByPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
      else {
        this.searchLoan(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
    }
  };
  //Show First page
  showFirstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (!this.state.search) {
        this.getLoansByPagination(firstPage);
      } else {
        this.searchLoan(firstPage)
      }
    }
  };

  //Show previous page
  showPrevPage = () => {
    let prevPage = 1
    if (this.state.currentPage > prevPage) {
      if (!this.state.search) {
        this.getLoansByPagination(this.state.currentPage - prevPage);
      } else {
        this.searchLoan(this.state.currentPage - prevPage);
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
  searchLoan = (currentPage) => {
    currentPage = currentPage - 1;
    axios.get("http://localhost:8080/api/v1/loans/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
      .then(response => response.data).then((data) => {
        this.setState({
          loans: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1
        });
      });
  };

  //Reset Search Box
  resetLoan = (currentPage) => {
    this.setState({ "search": '' });
    this.getLoansByStatesPagination(currentPage);
  };

  deleteLoan(id) {
    LoanService.deleteLoan(id).then((res) => {
      this.setState({
        loans: this.state.loans.filter((loan) => loan.id !== id),
      });
    });
  }


  createLoan() {
    this.props.history.push("/create-loan");
  }


  cancel() {
    this.props.history.push("/dashboard");
  }



  render() {
    const { loans, currentPage, totalPages, recordPerPage, search } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('user'))?.userType;
    const userType = user?.userType;
    const userLocation = user?.result?.states
    const userLoans = this.state?.loans?.map((x) => x).filter((x) => x.location === userLocation)
    const data = userType !== 'User' ? this.state.loans : userLoans;

    const downloadReport = async () => {
      this.setState({ data: data }, () => {
        setTimeout(() => {
          this.csvLinkEl.current.link.click();
        });
      });
    }
    console.log(userType,
         userLocation,
      userType, loans, data)

    return (
      <React.Fragment>
        <div className="asset-list">
          {/* <Topbar /> */}
          {/* <div className="row"> */}
          <div className="top">
            <div style={{ marginTop: "20px" }} >
              <span className="logs">Loans</span>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3">
              <input style={{ borderRadius: "12px", marginTop: "20px", marginRight: "15px", marginLeft: "40px" }} type="text" className="form-control" name="search" size="100" placeholder="Search by serial number or status or email" value={search} onChange={this.searchBox} />
              <button style={{ borderRadius: "12px", marginTop: "15px" }} type="button" name="search" className=" btn btn-outline-primary" onClick={this.searchLoan}><SearchOutlined /></button>
            </div>
            <div className="topRight">

              <button style={{ marginRight: "8px", margin: "10px" }} className="btn btn-primary float-lg-end" onClick={this.createLoan.bind(this)}>
                <AddCircleOutlineSharp />
              </button>

              {/* <button style={{ marginRight: "8px" }} className="btn btn-primary float-lg-end" onClick={this.upload.bind(this)}>
                <CloudUploadOutlined />
              </button> */}

              <button style={{ marginRight: "8px" }} className="btn btn-primary float-lg-end" onClick={this.cancel.bind(this)}>
                <AccountBalanceOutlined />
              </button>

              <button style={{ marginRight: "8px" }} className="btn btn-primary float-lg-end" onClick={downloadReport}>
                <CloudDownloadOutlined />
              </button>
            </div>
          </div>

          <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center", fontSize: "13px" }}>
              <tr>
                <th>No.</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Model</th>
                <th>Serial number</th>
                <th>Acknowledged by</th>
                <th>Location</th>
                <th>Date</th>
                <th>Expiry date</th>
                <th>Status</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center", fontSize: "12px" }}>
              {loans.length === 0 ?
                <tr align="center"><td colSpan="15">No Record Found</td></tr> :
                data?.map((loan, index) => (
                  <tr key={loan.id}>
                    <td>{(recordPerPage * (currentPage - 1)) + index + 1}</td>
                    <td>{loan.firstname}</td>
                    <td>{loan.lastname}</td>
                    <td>{loan.email}</td>
                    <td>{loan.model}</td>
                    <td>{loan.serialnumber}</td>
                    <td>{loan.acknowledgedBy}</td>
                    <td>{loan.location}</td>
                    <td>{loan.date}</td>
                    <td>{loan.expiryDate}</td>
                    <td>{loan.status}</td>
                    <td className="text-center"><Link to={`/update-loan/${loan.id}`} className="edit"><Edit /></Link></td>
                    {users !== 'User' &&
                      <td className="text-center"><i onClick={() => this.deleteLoan(loan.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                    }
                    <td className="text-center"><Link to={`/view-loan/${loan.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>
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
            filename="loans.csv"
            data={data}
            ref={this.csvLinkEl} />
          {/* </div> */}
        </div>
      </React.Fragment>
    )

  }
}

export default LoanList;