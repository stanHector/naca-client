import React, { Component } from "react";
import UserService from "../services/UserService";
// import Topbar from "./topbar/Topbar";

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstname: "",
      lastname: "",
      email: "",
      userType: "",
      loading: false,
    };

    this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
    this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.handleSelectUserType = this.handleSelectUserType.bind(this);

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      let user = res.data;
      this.setState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        userType: user.userType,
        //   states: user.states
      });
    })
  }

  updateUser = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      userType: this.state.userType,
    };

    UserService.updateUser(user, this.state.id).then((res) => {
      this.props.history.push("/dashboard");
    });
  };

  changeFirstnameHandler = (event) => {
    this.setState({ firstname: event.target.value });
  };

  changeLastnameHandler = (event) => {
    this.setState({ lastname: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSelectUserType = (event) => {
    this.setState({ userType: event.target.value });
    console.log("usertype");
  };

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <React.Fragment>
        {/* <Topbar/> */}
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}>Update User</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <label style={{ marginTop: "10px" }}> First Name </label>
                      <div className="col-sm-12">
                        <input placeholder=" " name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstnameHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Last Name </label>
                      <div className="col-sm-12">
                        <input placeholder=" " name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastnameHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Email </label>
                      <div className="col-sm-12">
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                      </div>

                      {/* <label style={{ marginTop: "10px" }}> Password </label>
                      <div className="col-sm-12">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={this.state.password}
                          onChange={this.changePasswordlHandler}
                        />
                      </div> */}

                      <label style={{ marginTop: "10px" }}> UserType </label>
                      <div className="col-sm-12">
                        <input type="userType" name="userType" className="form-control" value={this.state.userType} />
                      </div>

                      <div className="col-12" style={{ marginTop: "15px" }}>
                        <label className="visually-hidden">UserType</label>

                        <select className="form-select" onChange={this.handleSelectUserType}>
                          <option defaultValue> Select UserType</option>
                          <option userType="1">Admin</option>
                          <option userType="2">User</option>
                        </select>
                      </div>

                      {/* <div
                        className="col-12"
                        style={{ marginTop: "45px", marginBottom: "45px" }}
                      >
                        <label
                          className="visually-hidden"
                        >
                          State
                        </label>
                        <select
                          className="form-select"
                          onChange={this.handleSelectUserStates}
                        >
  <option defaultValue>Select state</option>
                                                    <option states="1">FCT</option>
                                                    <option states="2">Abia</option>
                                                    <option states="3">Adamawa</option>
                                                    <option states="4">Akwa-Ibom</option>
                                                    <option states="5">Anambra</option>
                                                    <option states="6">Bauchi</option>
                                                    <option states="7">Bayelsa</option>
                                                    <option states="8">Benue</option>\
                                                    <option states="9">Borno</option>
                                                    <option states="10">Cross-River</option>
                                                    <option states="11">Delta</option>
                                                    <option states="12">Ebonyi</option>
                                                    <option states="13">Edo</option>
                                                    <option states="14">Ekiti</option>
                                                    <option states="15">Enugu</option>
                                                    <option states="16">Gombe</option>
                                                    <option states="17">Imo</option>
                                                    <option states="18">Jigawa</option>
                                                    <option states="19">Kaduna</option>
                                                    <option states="20">Kano</option>
                                                    <option states="21">Katsina</option>
                                                    <option states="22">Kebbi</option>
                                                    <option states="23">Kogi</option>
                                                    <option states="24">Kwara</option>
                                                    <option states="25">Lagos</option>
                                                    <option states="26">Nasarawa</option>
                                                    <option states="27">Niger</option>
                                                    <option states="28">Ogun</option>
                                                    <option states="29">Ondo</option>
                                                    <option states="31">Oyo</option>
                                                    <option states="32">Plateau</option>
                                                    <option states="33">Rivers</option>
                                                    <option states="34">Sokoto</option>
                                                    <option states="35">Taraba</option>
                                                    <option states="36">Yobe</option>
                                                    <option states="37">Zamfara</option>
                        </select>
                      </div> */}
                    </div>

                    <div className="form-row text-center" style={{ marginTop: "12px" }} >
                      <div className="col-12">
                        <button className="btn btn-primary" onClick={this.updateUser} disabled={this.state.loading} >
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Update User </button>
                        <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UpdateUser;
