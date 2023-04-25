import React, { Component } from "react";
import UserService from "../../services/UserService";
import './userProfile.css';
import avatar from '../../assets/useravatar.png'

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: JSON.parse(localStorage.getItem('user'))?.id,
            firstname: JSON.parse(localStorage.getItem('user'))?.firstname,
            lastname: JSON.parse(localStorage.getItem('user'))?.lastname,
            email: JSON.parse(localStorage.getItem('user'))?.email,
            states: JSON.parse(localStorage.getItem('user'))?.states,
            userType: JSON.parse(localStorage.getItem('user'))?.userType,
            loading: false,
        };

        this.changePasswordlHandler = this.changePasswordlHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }


    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            this.setState({ user: res.data });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let user = {
            password: this.state.password,
        };
        if (this.state.password) {
            UserService.updateUsers(user, this.state.id).then((res) => {
                this.setState({ loading: false })
                this.props.history.push("/dashboard");

            });
        } else {
            alert("Password field must not be empty!")
            this.setState({ loading: false })
        }

    };

    changePasswordlHandler = (event) => {
        this.setState({ password: event.target.value });
    };

    cancel() {
        this.props.history.push("/dashboard");
    }

    render() {

        return (
            <React.Fragment>
                <div className="container" style={{ marginTop: "150px", padding: "50px" }}>
                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="account-settings">
                                        <div className="user-profile">
                                            <div className="user-avatar">
                                                <img src={avatar} alt="logo" />
                                            </div>
                                            <h5 className="user-name">{this.state.firstname}</h5>
                                            <h6 className="user-email" style={{ color: "#60C437" }}>{this.state.email}</h6>
                                        </div>
                                        <div className="about" style={{ justifyContent: "space-around" }}>
                                            <h5>Role</h5>
                                            <p style={{ color: "#60C437" }}>{this.state.userType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12, text-center">
                                            <h6 className="mb-2 text-primary" style={{ fontWeight: "bold" }}>Personal Details</h6>
                                        </div>
                                        <table class="table" >
                                            <tbody>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td style={{ fontSize: "20px", fontWeight: "bold" }}>Firstname :</td>
                                                    <td style={{ fontSize: "20px" }}>{this.state.firstname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td style={{ fontSize: "20px", fontWeight: "bold" }}>Lastname :</td>
                                                    <td style={{ fontSize: "20px" }}>{this.state.lastname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td style={{ fontSize: "20px", fontWeight: "bold" }}>Email :</td>
                                                    <td style={{ fontSize: "20px" }}>{this.state.email}</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row" ></th>
                                                    <td style={{ fontSize: "20px", fontWeight: "bold" }}>Location :</td>
                                                    <td style={{ fontSize: "20px" }}>{this.state.states}</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row" ></th>
                                                    <td style={{ fontSize: "20px", fontWeight: "bold" }}>Password :</td>
                                                    <input style={{ fontSize: "20px", marginRight: "50px", }} type="password" placeholder="Enter new password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordlHandler} />
                                                </tr>

                                            </tbody>
                                        </table>
                                        {/* <div className="col-6">
                                            <label style={{ marginLeft: "45px", fontWeight: "10px" }}>New password</label>
                                            <input style={{ marginLeft: "45px", }} type="password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordlHandler} />
                                        </div> */}

                                        <div className="form-row text-center" style={{ marginTop: "12px" }}>
                                            <div className="col-12">
                                                <button className="btn btn-outline-success" onClick={this.updateUser} disabled={this.state.loading}>
                                                    {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                                                    Change password
                                                </button>
                                                <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UserProfile