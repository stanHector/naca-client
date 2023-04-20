import React, { Component } from "react";
import UserService from "../services/UserService";
import '../App.css';
import axios from 'axios';
import { BaseURL } from '../services/index'

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            recordPerPage: 5,
        };

        this.createUser = this.createUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
    }

    componentDidMount() {
        this.getUsersByPagination(this.state.currentPage);
    }
    getUsersByPagination(currentPage) {
        currentPage = currentPage - 1;
        axios.get(`${BaseURL}/users?page=` + currentPage + "&size=" + this.state.recordPerPage)
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
            this.getUsersByPagination(this.state.currentPage + 1);
        }
    };

    //Show Last Page
    showLastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            this.getUsersByPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
        }
    };
    //Show First page
    showFirstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.getUsersByPagination(firstPage);
        }
    };
    //Show previous page
    showPrevPage = () => {
        let prevPage = 1
        if (this.state.currentPage > prevPage) {
            this.getUsersByPagination(this.state.currentPage - prevPage);
        }
    };

    deleteUser(id) {
        UserService.deleteUser(id).then(() => {
            this.setState({
                users: this.state.users.filter((user) => user.id !== id),
            });
        });
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
        const { users } = this.state;

        return (
            <>
                <div className="asset-list">
                    <div className="top" >
                        <div className="topLeft">
                            <span className="logs" style={{ fontSize: "20px" }}>Users</span>
                        </div>

                    </div>
                    <table className="table table-striped table-bordered">
                        <thead style={{ textAlign: "center", fontSize: "13px" }}>
                            <tr >
                                {/* <th>#</th> */}
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>State</th>
                                <th>Role</th>
                                <th>Project</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center", fontSize: "12px" }}>
                            {users.length === 0 ?
                                <tr align="center"><td colSpan="6">No Record Found</td></tr> :

                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.states}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.project}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </>
        );
    }
}

export default UsersList;
