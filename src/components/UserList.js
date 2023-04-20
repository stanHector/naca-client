import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, AddCircleOutlineSharp, AccountBalanceOutlined, SearchOutlined } from '@material-ui/icons'
import '../App.css';
import axios from 'axios';
import UserService from "../services/UserService";
import { BaseURL } from '../services/index'


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      recordPerPage: 10,
      search: '',
    };

    this.createUser = this.createUser.bind(this);
    this.editUser = this.editUser.bind(this);
    // this.deleteUser = this.deleteUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
  }

  componentDidMount() {
    this.getUsersByPagination(this.state.currentPage);
  }
  getUsersByPagination(currentPage) {
    currentPage = currentPage - 1;
    axios.get(`${BaseURL}/users?page=/` + currentPage + "&size=" + this.state.recordPerPage)
      .then(response => response.data).then((data) => {
        this.setState({
          users: data.content,
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
        this.getUsersByPagination(this.state.currentPage + 1);
      } else {
        this.searchUser(this.state.currentPage + 1)
      }
    }
  };

  //Show Last Page
  showLastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
      if (!this.state.search) {
        this.getUsersByPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
      else {
        this.searchUser(Math.ceil(this.state.totalElements / this.state.recordPerPage));
      }
    }
  };
  //Show First page
  showFirstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (!this.state.search) {
        this.getUsersByPagination(firstPage);
      } else {
        this.searchUser(firstPage)
      }
    }
  };
  //Show previous page
  showPrevPage = () => {
    let prevPage = 1
    if (this.state.currentPage > prevPage) {
      if (!this.state.search) {
        this.getUsersByPagination(this.state.currentPage - prevPage);
      } else {
        this.searchUser(this.state.currentPage - prevPage);
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
  searchUser = (currentPage) => {
    currentPage = currentPage - 1;
    if (this.state.search) {
      axios.get(`${BaseURL}/users/` + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
        .then(response => response.data).then((data) => {
          this.setState({
            users: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number + 1
          });
        });
    } else {
      alert("Please enter search parameter!")
    }
  };
  //Reset Search Box
  resetUser = (currentPage) => {
    this.setState({ "search": '' });
    this.getUsersByPagination(currentPage);
  };

  deleteUser(id) {
    const text = 'Are you sure you want to delete user?'
    if (window.confirm(text) === true) {
      UserService.deleteUser(id).then((res) => {
        this.setState({
          users: this.state.users.filter((user) => user.id !== id),
        });
      });
    }
  }

  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  editUser(id) {
    this.props.history.push(`/update-user/${id}`);
  }

  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  createUser() {
    this.props.history.push("/create-user");

  }

  cancel() {
    this.props.history.push("/dashboard");
  }

  render() {

    const { users, currentPage, totalPages, recordPerPage, search } = this.state;

    return (
      <>
        <div className="list">
          <div className="row">
            {/* <div className="row"> */}
            <div className="top" style={{ backgroundColor: "#008000" }}>
              <div className="topLeft">
                {/* <img src={imgs} alt="img-logo" className="topAvatar" /> */}
                <span className="log" style={{ margin: "22px", }}>Users</span>
              </div>
              <div class="d-flex flex-row bd-highlight mb-3">
                <input style={{ borderRadius: "12px", marginTop: "20px", marginBottom: "6px", marginRight: "15px", height: "40px" }} type="text" className="form-control" name="search" size="100" placeholder="Search by email or firstname or state" value={search} onChange={this.searchBox} />
                <button style={{ borderRadius: "12px", marginTop: "15px", backgroundColor:"#82E0AA", borderColor:"#82E0AA", color:"#D5F5E3" }} type="button" name="search" className=" btn btn-outline-primary" onClick={this.searchUser}><SearchOutlined /></button>
                {/* <button style={{ borderRadius: "12px", marginTop: "15px", marginLeft: "10px" }} className=" btn btn-outline-danger" onClick={this.cancelSearch.bind(this)}><Cancel /></button> */}
              </div>

              <div className="topRight">
                <Link to={"/create-user"} style={{ margin: "10px", backgroundColor:"#82E0AA", borderColor:"#82E0AA", color:"#D5F5E3"  }} className="btn btn-primary float-lg-end">
                  <AddCircleOutlineSharp />
                  {/* Create User */}
                </Link>
                <div className="topRight">
                  <button style={{ marginRight: "8px",backgroundColor:"#82E0AA", borderColor:"#82E0AA", color:"#D5F5E3" }} className="btn btn-primary float-lg-end" onClick={this.cancel.bind(this)}>
                    <AccountBalanceOutlined />
                  </button>
                </div>
              </div>

            </div>
            <table className="table table-striped table-bordered">
              <thead style={{ textAlign: "center" }}>
                <tr >
                  {/* <th>Id</th> */}
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Project</th>
                  <th>State</th>
                  <th>Role</th>
                  <th colSpan="3">Action</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {
                  users.length === 0 ?
                    <tr align="center"><td colSpan="10">No Record Found</td></tr> :
                    this.state.users.map((user, index) => (
                      <tr key={user.id}>
                        {/* <td>{user.id}</td> */}
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.department}</td>
                        <td>{user.project}</td>
                        <td>{user.states}</td>
                        <td>{user.userType}</td>
                        <td className="text-center"><Link to={`/update-user/${user.id}`} className="fas fa-edit"><Edit /></Link></td>
                        <td className="text-center"><i onClick={() => this.deleteUser(user.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                        <td className="text-center"><Link to={`/view-user/${user.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>
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
          </div>

          {/* <div className="bottomRight">
            <button className="button-40" role="button"
              onClick={this.cancel.bind(this)}>Cancel</button>
          </div> */}
        </div>
      </>
    );
  }
}

export default UserList;
