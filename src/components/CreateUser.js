import React, { Component } from "react";
import UserService from "../services/UserService";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      project: "",
      password: "",
      userType: "",
      states: "",
      loading: false,
    };

    this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
    this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeProjectHandler = this.changeProjectHandler.bind(this);
    this.changePasswordlHandler = this.changePasswordlHandler.bind(this);
    this.handleSelectUserType = this.handleSelectUserType.bind(this);
    this.handleSelectUserStates = this.handleSelectUserStates.bind(this);
    this.handleDepartment = this.handleDepartment.bind(this);

    this.addUser = this.addUser.bind(this);
  }
  addUser = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      department: this.state.department,
      project: this.state.project,
      password: this.state.password,
      userType: this.state.userType,
      states: this.state.states,
    };
    // console.log("user => " + JSON.stringify(user));
    if (this.state.firstname) {
      if (this.state.lastname) {
        if (this.state.email && this.state.email) {

          if (this.state.password && this.state.password.length > 7) {
            if (this.state.userType) {
              if (this.state.states) {
                // if (this.state.project) {
                UserService.createUser(user).then((res) => {
                  this.setState({ loading: false })
                  this.props.history.push("/users");
                });
                // } else {
                //   alert("Please select a project!")
                // }
              }
              else {
                alert('Please enter select a state')
                this.setState({ loading: false })
              }
            } else {
              alert('Please select a Role');
              this.setState({ loading: false })
            }
          } else {
            alert('Please enter a valid password ')
            this.setState({ loading: false })
          }
        } else {
          alert('Please enter email ')
          this.setState({ loading: false })
        }
      } else {
        alert('Please enter lastname')
        this.setState({ loading: false })
      }
    } else {
      alert('Please enter firstname')
      this.setState({ loading: false })
    }

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

  changeProjectHandler = (event) => {
    this.setState({ project: event.target.value });
  };
  changePasswordlHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSelectUserType = (event) => {
    this.setState({ userType: event.target.value });
  };

  handleSelectUserStates = (event) => {
    this.setState({ states: event.target.value });
  };

  handleDepartment = (event) => {
    this.setState({ department: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  render() {

    const myStyle = {
      // backgroundImage:
      //     "url('https://reddingtonchalets.com/wp-content/uploads/2022/05/beach_resort_hotel_ghana_pool.jpg')",
      height: '100vh',
      backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      backgroundColor: "#008000"
    };

    return (
      <React.Fragment>
        {/* <div style={myStyle}> */}
          <div className="container" style={{ padding: "50px" }}>
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginTop: "150px", fontWeight: "bold" }}>
                <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}> Create User</h3>
                <div className="card-body">
                  <form>
                    <div className="container">
                      <div className="form-group">
                        <div className="col-sm-12" >
                          <input placeholder="First name" name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstnameHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastnameHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Email" type="email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Project" name="project" className="form-control" value={this.state.project} onChange={this.changeProjectHandler} />
                        </div>


                        <div className="col-12" style={{ marginTop: "10px" }}>
                          <select className="form-select" onChange={this.handleDepartment}>
                            <option defaultValue>Department</option>
                            <option department="1">Admin</option>
                            <option department="2">IT</option>
                            <option department="3">Facility</option>
                          
                          </select>
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Password" type="password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordlHandler} />
                        </div>

                        <div className="col-12" style={{ marginTop: "10px" }}>
                          <select className="form-select" onChange={this.handleSelectUserType}>
                            <option defaultValue>Select Role</option>
                            <option userType="1">Admin</option>
                            <option userType="2">User</option>
                          </select>
                        </div>

                        <div className="col-12" style={{ marginTop: "15px", marginBottom: "15px" }} >
                          <select className="form-select" onChange={this.handleSelectUserStates}>
                            <option defaultValue> Select state</option>
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
                        </div>
                      </div>
                      <div className="form-row text-center" style={{ marginTop: "12px" }}>
                        <div className="col-12">
                          <button className="btn btn-primary"style={{backgroundColor:"#008000", borderColor:"#008000"}} onClick={this.addUser} disabled={this.state.loading}>
                            {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                            Create User
                          </button>

                          <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateUser