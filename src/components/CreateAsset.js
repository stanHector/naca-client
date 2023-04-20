import React, { Component } from "react";
import AssetService from "../services/AssetService";

class CreatAsset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      assetId: "",
      manufacturer: "",
      otherBrand: "",
      modelNumber: "",
      serialNumber: "",
      dateReceived: "",
      purchasedPrice: "",
      funder: "",
      project: "",
      condition: "",
      states: "",
      facility: "",
      location: "",
      assignee: "",
      email: "",
      status: "",
      loading: false,
    };

    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeAssetIDHandler = this.changeAssetIDHandler.bind(this);
    this.changeManufacturerHandler = this.changeManufacturerHandler.bind(this);
    this.changeOtherBrandHandler = this.changeOtherBrandHandler.bind(this);
    this.changeModelHandler = this.changeModelHandler.bind(this);
    this.changeSerialnumberHandler = this.changeSerialnumberHandler.bind(this);
    this.changeDateReceivedHandler = this.changeDateReceivedHandler.bind(this);
    this.changePurchasedPriceHandler = this.changePurchasedPriceHandler.bind(this);
    this.handleFunderHandler = this.handleFunderHandler.bind(this);
    this.changeProjectHandler = this.changeProjectHandler.bind(this);
    this.handleConditionHandler = this.handleConditionHandler.bind(this);
    this.handleStatesHandler = this.handleStatesHandler.bind(this);
    this.changeFacilityHandler = this.changeFacilityHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.handleAssigneeHandler = this.handleAssigneeHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);

    this.addAsset = this.addAsset.bind(this);
  }
  addAsset = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let asset = {
      description: this.state.description,
      assetId: this.state.assetId,
      manufacturer: this.state.manufacturer,
      otherBrand: this.state.otherBrand,
      modelNumber: this.state.modelNumber,
      serialNumber: this.state.serialNumber,
      dateReceived: this.state.dateReceived,
      purchasedPrice: this.state.purchasedPrice,
      funder: this.state.funder,
      project: this.state.project,
      condition: this.state.condition,
      states: this.state.states,
      facility: this.state.facility,
      location: this.state.location,
      assignee: this.state.assignee,
      email: this.state.email,
      status: this.state.status,

    };
    if (this.state.description) {
      if (this.state.otherBrand) {
        if (this.state.funder) {
          if (this.state.assetId) {
            if (this.state.serialNumber) {
              if (this.state.location) {
                if (this.state.manufacturer) {
                  if (this.state.modelNumber) {
                    if (this.state.status) {
                      if (this.state.facility) {
                        if (this.state.condition) {
                          if (this.state.states) {
                            if (this.state.dateReceived) {
                              if (this.state.purchasedPrice) {
                                AssetService.createAsset(asset).then((res) => {
                                  this.setState({ loading: false })
                                  this.props.history.push("/assets");
                                });
                              } else {
                                alert('Enter purchased Price!')
                              }
                            } else {
                              alert('Enter Date Received!')
                              this.setState({ loading: false })
                            }
                          } else {
                            alert('Enter state!')
                            this.setState({ loading: false })
                          }
                        } else {
                          alert('Enter asset condition!')
                          this.setState({ loading: false })
                        }
                      } else {
                        alert('Enter facility!')
                        this.setState({ loading: false })
                      }
                    }
                    else {
                      alert('Select status!')
                      this.setState({ loading: false })
                    }
                  } else {
                    alert('Select modelNumber!')
                    this.setState({ loading: false })
                  }
                } else {
                  alert('Select Manufacturer!')
                  this.setState({ loading: false })
                }
              } else {
                alert('Select location!')
                this.setState({ loading: false })
              }
            } else {
              alert('Enter Serial number!');
              this.setState({ loading: false })
            }
          } else {
            alert('Enter AssetID! ')
            this.setState({ loading: false })
          }
        } else {
          alert('Enter funder! ')
          this.setState({ loading: false })
        }
      } else {
        alert('Enter other brand!')
        this.setState({ loading: false })
      }
    } else {
      alert('Enter description!')
      this.setState({ loading: false })
    }

  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeOtherBrandHandler = (event) => {
    this.setState({ otherBrand: event.target.value });
  };

  changeDateReceivedHandler = (event) => {
    this.setState({ dateReceived: event.target.value });
  };

  changeAssetIDHandler = (event) => {
    this.setState({ assetId: event.target.value });
  };

  changeModelHandler = (event) => {
    this.setState({ modelNumber: event.target.value });
  };

  changePurchasedPriceHandler = (event) => {
    this.setState({ purchasedPrice: event.target.value })
  }

  changeStatusHandler = (event) => {
    this.setState({ status: event.target.value });
  };

  handleStatesHandler = (event) => {
    this.setState({ states: event.target.value });
  };

  changeFacilityHandler = (event) => {
    this.setState({ facility: event.target.value });
  };

  changeLocationHandler = (event) => {
    this.setState({ location: event.target.value });
  };

  handleConditionHandler = (event) => {
    this.setState({ condition: event.target.value });
  };

  handleFunderHandler = (event) => {
    this.setState({ funder: event.target.value });
  };

  handleAssigneeHandler = (event) => {
    this.setState({ assignee: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  // handlelocationHandler = (event) => {
  //     this.setState({ location: event.target.value });
  // };
  changeSerialnumberHandler = (event) => {
    this.setState({ serialNumber: event.target.value });
  };

  changeManufacturerHandler = (event) => {
    this.setState({ manufacturer: event.target.value });
  };

  changeProjectHandler = (event) => {
    this.setState({ project: event.target.value });
  };

  cancel() {
    this.props.history.push("/assets");
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ marginTop: "15px", fontWeight: "bold" }}> Create Asset</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      {/* <label style={{ marginTop: "10px" }}> First Name </label> */}

                      <div className="row">
                        <div className="col-sm-12">
                          <input placeholder="Description" name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Asset Id" name="assetid" className="form-control" value={this.state.assetId} onChange={this.changeAssetIDHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Manufacturer" name="manufacturer" className="form-control" value={this.state.manufacturer} onChange={this.changeManufacturerHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Other Brand/Make" name="otherBrand" className="form-control" value={this.state.otherBrand} onChange={this.changeOtherBrandHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="ModelNumber" name="modelNumber" className="form-control" value={this.state.modelNumber} onChange={this.changeModelHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Serial Number" name="serialNumber" className="form-control" value={this.state.serialNumber} onChange={this.changeSerialnumberHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Date Received" name="dateReceived" className="form-control" value={this.state.dateReceived} onChange={this.changeDateReceivedHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="FundedBy" name="funder" className="form-control" value={this.state.funder} onChange={this.handleFunderHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Purchased Price" name="purchasedPrice" className="form-control" value={this.state.purchasedPrice} onChange={this.changePurchasedPriceHandler} />
                        </div>

                        <div className="col-12" style={{ marginTop: "15px" }}>
                          <select className="form-select" onChange={this.handleConditionHandler}>
                            <option defaultValue>Asset Condition</option>
                            <option condition="1">A1</option>
                            <option condition="2">A2</option>
                            <option condition="3">A3</option>
                            <option condition="4">F1</option>
                            <option condition="5">F2</option>
                            <option condition="6">F3</option>
                          </select>
                        </div>

                        <div className="col-12" style={{ marginTop: "15px", marginBottom: "15px" }} >
                          <select className="form-select" onChange={this.handleStatesHandler}>
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
                      </div>
                      <div className="row">
                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Facility" name="facility" className="form-control" value={this.state.facility} onChange={this.changeFacilityHandler} />
                        </div>

                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Location" name="location" className="form-control" value={this.state.location} onChange={this.changeLocationHandler} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Assignee fullname" name="assignee" className="form-control" value={this.state.assignee} onChange={this.handleAssigneeHandler} />
                        </div>

                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12" style={{ marginTop: "15px" }}>
                          <select className="form-select" onChange={this.changeStatusHandler}>
                            <option defaultValue>Status</option>
                            <option checkedAsset="1">Deployed</option>
                            <option checkedAsset="2">Not Deployed</option>
                            <option checkedAsset="3">Returned</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-primary" onClick={this.addAsset} disabled={this.state.loading}>
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Add Asset
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
export default CreatAsset