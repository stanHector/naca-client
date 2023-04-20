import React, { Component } from "react";
import LoanService from "../services/LoanService";
// import Topbar from "../components/topbar/Topbar"

class CreateLoan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      equipmentType: "",
      model: "",
      location: "",
      serialnumber: "",
      date: "",
      expiryDate: "",
      acknowledgedBy: "",
      status: "",
      loading: false,
    };


    this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
    this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
    this.changeModelHandler = this.changeModelHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.handleSelectUserStates = this.handleSelectUserStates.bind(this);
    this.changeEquipmentTypeHandler = this.changeEquipmentTypeHandler.bind(this);
    this.changeSerialnumberHandler = this.changeSerialnumberHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeExpiryDateHandler = this.changeExpiryDateHandler.bind(this);

    this.addLoan = this.addLoan.bind(this);
  }
  addLoan = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    let loan = {
      userId: JSON.parse(localStorage.getItem('user'))?.id,
      acknowledgedBy: JSON.parse(localStorage.getItem('user'))?.firstname,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      equipmentType: this.state.equipmentType,
      model: this.state.model,
      location: this.state.location,
      serialnumber: this.state.serialnumber,
      status: this.state.status,
      date: new Date().toLocaleString().slice(0, 10),
      expiryDate: this.state.expiryDate.toLocaleString().slice(0, 10),

    };
    if (this.state.firstname) {
      if (this.state.lastname) {
        if (this.state.model) {
          if (this.state.email) {
            if (this.state.equipmentType) {
              if (this.state.location) {
                if (this.state.serialnumber) {
                  if (this.state.expiryDate) {
                    if (this.state.status) {
                      // console.log("loan => " + JSON.stringify(loan));
                      LoanService.createLoan(loan).then((res) => {
                        this.setState({ loading: false })
                        this.props.history.push("/loans");
                      });
                    } else {
                      alert("Please enter status!")
                      this.setState({ loading: false })
                    }

                  } else {
                    alert("Please enter a expiry date!")
                    this.setState({ loading: false })
                  }
                } else {
                  alert("Please enter a Serial number!")
                  this.setState({ loading: false })
                }
              } else {
                alert("Please enter a Location!")
                this.setState({ loading: false })
              }

            } else {
              alert("Please enter an Equipment type!")
              this.setState({ loading: false })
            }
          } else {
            alert("Please enter an email!")
            this.setState({ loading: false })
          }
        } else {
          alert("please enter a model!")
          this.setState({ loading: false })
        }
      } else {
        alert("Please enter last name!")
        this.setState({ loading: false })
      }
    } else {
      alert("Please enter first name!")
      this.setState({ loading: false })
    }
  };

  changeFirstnameHandler = (event) => {
    this.setState({ firstname: event.target.value });
  };

  changeLastnameHandler = (event) => {
    this.setState({ lastname: event.target.value });
  };

  changeModelHandler = (event) => {
    this.setState({ model: event.target.value });
  };
  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changeEquipmentTypeHandler = (event) => {
    this.setState({ equipmentType: event.target.value });
  };

  handleSelectUserStates = (event) => {
    this.setState({ location: event.target.value });
  };
  changeSerialnumberHandler = (event) => {
    this.setState({ serialnumber: event.target.value });
  };

  changeExpiryDateHandler = (event) => {
    this.setState({ expiryDate: event.target.value });
  };

  changeStatusHandler = (event) => {
    this.setState({ status: event.target.value });
  };


  cancel() {
    this.props.history.push("/loans");
  }

  render() {
    const userId = JSON.parse(localStorage.getItem('user')).id
    // console.log(userId)
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ marginTop: "15px", fontFamily: "cursive", fontWeight: "bold" }}> Create Loan</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6" style={{ marginTop: "10px" }} >
                          <input placeholder="Firstname" name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstnameHandler} />
                        </div>

                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Lastname" name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastnameHandler} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-dm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                        </div>

                        <div className="col-dm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Equipment type" name="equipmentType" className="form-control" value={this.state.equipmentType} onChange={this.changeEquipmentTypeHandler} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Serial number" name="serialnumber" className="form-control" value={this.state.serialnumber} onChange={this.changeSerialnumberHandler} />
                        </div>

                        <div className="col-md-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Model" name="model" className="form-control" value={this.state.model} onChange={this.changeModelHandler} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12" style={{ marginTop: "15px", marginBottom: "15px" }} >
                          <select className="form-select" onChange={this.handleSelectUserStates}>
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
                        </div>
                        <div className="col-sm-12">
                          <input type="date" name="expiryDate" className="form-control" value={this.state.expiryDate} onChange={this.changeExpiryDateHandler} />
                        </div>

                        <div className="col-12" style={{ marginTop: "15px" }}>
                          {/* <label style={{ fontWeight: "bold" }}>Asset Status</label> */}
                          <select className="form-select" onChange={this.changeStatusHandler}>
                            <option defaultValue>Select Status</option>
                            <option status="1">Deployed</option>
                            <option status="2">Returned</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-primary" onClick={this.addLoan} disabled={this.state.loading}>
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Add Loan
                        </button>

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

export default CreateLoan;