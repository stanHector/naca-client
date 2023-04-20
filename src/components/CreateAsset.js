import { event } from "jquery";
import React, { Component } from "react";
import AssetService from "../services/AssetService";

class CreatAsset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      assetId: "",
      serialNumber: "",
      dateReceived: "",
      fundedBy: "",
      modelNumber: "",
      quantity: "",
      unitPrice: "",
      purchasedPrice: "",
      totalCostUsd: "",
      implementer: "",
      implementationPeriod: "",
      categories: "",
      location: "",
      custodian: "",
      condition: "",
      status: "",
      loading: false,
    };

    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeAssetIDHandler = this.changeAssetIDHandler.bind(this);
    this.changeSerialnumberHandler = this.changeSerialnumberHandler.bind(this);
    this.changeDateReceivedHandler = this.changeDateReceivedHandler.bind(this);
    this.handleFunderHandler = this.handleFunderHandler.bind(this);
    this.changeModelHandler = this.changeModelHandler.bind(this);
    this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
    this.changeUnitPriceHandler = this.changeUnitPriceHandler.bind(this);
    this.changePurchasedPriceHandler = this.changePurchasedPriceHandler.bind(this);
    this.changeTotalCostUsdHandler = this.changeTotalCostUsdHandler.bind(this);
    this.changeImplementerHandler = this.changeImplementerHandler.bind(this);
    this.changeImplementationPeriodHandler = this.changeImplementationPeriodHandler.bind(this);
    this.changeCategoriesHandler = this.changeCategoriesHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.handleCustodianHandler = this.handleCustodianHandler.bind(this);
    this.handleConditionHandler = this.handleConditionHandler.bind(this);
    // this.changeStatusHandler = this.changeStatusHandler.bind(this);

    this.addAsset = this.addAsset.bind(this);
  }
  addAsset = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let asset = {
      description: this.state.description,
      assetId: this.state.assetId,
      serialNumber: this.state.serialNumber,
      dateReceived: this.state.dateReceived,
      fundedBy: this.state.fundedBy,
      modelNumber: this.state.modelNumber,
      quantity: this.state.quantity,
      unitPrice: this.state.unitPrice,
      purchasedPrice: this.state.purchasedPrice,
      totalCostUsd: this.state.totalCostUsd,
      implementer: this.state.implementer,
      implementationPeriod: this.state.implementationPeriod,
      categories: this.state.categories,
      location: this.state.location,
      custodian: this.state.custodian,
      condition: this.state.condition,

      // email: this.state.email,
      // status: this.state.status,


    };
    if (this.state.description) {
      if (this.state.assetId) {
        if (this.state.serialNumber) {
          if (this.state.dateReceived) {
            if (this.state.fundedBy) {
              if (this.state.modelNumber) {
                if (this.state.quantity) {
                  if (this.state.unitPrice) {
                    if (this.state.purchasedPrice) {
                      if (this.state.totalCostUsd) {
                        if (this.state.implementer) {
                          if (this.state.implementationPeriod) {
                            if (this.state.categories) {
                              if (this.state.location) {
                                if (this.state.condition) {
                                  AssetService.createAsset(asset).then((res) => {
                                    this.setState({ loading: false })
                                    this.props.history.push("/assets");
                                  });
                                } else {
                                  alert('Enter asset condition!')
                                  this.setState({ loading: false })
                                }

                              } else {
                                alert('Select location!')
                                this.setState({ loading: false })
                              }

                            } else {
                              alert('Enter category!')
                              this.setState({ loading: false })
                            }
                          }
                          else {
                            alert('Enter Implementation period!')
                            this.setState({ loading: false })
                          }

                        } else {
                          alert('Enter Implementer!')
                          this.setState({ loading: false })
                        }

                      } else {
                        alert('Enter total cost in USD!')
                        this.setState({ loading: false })
                      }
                    } else {
                      alert('Enter purchased Price!')
                      this.setState({ loading: false })
                    }

                  } else {
                    alert('Enter Unit Price!')
                    this.setState({ loading: false })
                  }

                } else {
                  alert('Enter Quantity!')
                  this.setState({ loading: false })
                }

              } else {
                alert('Select modelNumber!')
                this.setState({ loading: false })
              }
            } else {
              alert('Enter funder! ')
              this.setState({ loading: false })
            }


          } else {
            alert('Enter Date Received!')
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
      alert('Enter description!')
      this.setState({ loading: false })
    }

  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeAssetIDHandler = (event) => {
    this.setState({ assetId: event.target.value });
  };

  changeSerialnumberHandler = (event) => {
    this.setState({ serialNumber: event.target.value });
  };

  changeDateReceivedHandler = (event) => {
    this.setState({ dateReceived: event.target.value });
  };

  handleFunderHandler = (event) => {
    this.setState({ fundedBy: event.target.value });
  };


  changeModelHandler = (event) => {
    this.setState({ modelNumber: event.target.value });
  };

  changeQuantityHandler = (event) => {
    this.setState({ quantity: event.target.value });
  };

  changeUnitPriceHandler = (event) => {
    this.setState({ unitPrice: event.target.value });
  };


  changePurchasedPriceHandler = (event) => {
    this.setState({ purchasedPrice: event.target.value })
  }

  changeTotalCostUsdHandler = (event) => {
    this.setState({ totalCostUsd: event.target.value })
  }

  changeImplementerHandler = (event) => {
    this.setState({ implementer: event.target.value })
  }
  changeImplementationPeriodHandler = (event) => {
    this.setState({ implementationPeriod: event.target.value })
  }

  changeCategoriesHandler = (event) => {
    this.setState({ categories: event.target.value })
  }

  changeLocationHandler = (event) => {
    this.setState({ location: event.target.value });
  };


  handleCustodianHandler = (event) => {
    this.setState({ custodian: event.target.value });
  };


  handleConditionHandler = (event) => {
    this.setState({ condition: event.target.value });
  };


  // changeStatusHandler = (event) => {
  //   this.setState({ status: event.target.value });
  // };


  // changeFacilityHandler = (event) => {
  //   this.setState({ facility: event.target.value });
  // };



  // changeEmailHandler = (event) => {
  //   this.setState({ email: event.target.value });
  // };

  // handlelocationHandler = (event) => {
  //     this.setState({ location: event.target.value });
  // };


  // changeManufacturerHandler = (event) => {
  //   this.setState({ manufacturer: event.target.value });
  // };

  // changeProjectHandler = (event) => {
  //   this.setState({ project: event.target.value });
  // };

  cancel() {
    this.props.history.push("/assets");
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{ marginTop: "15px" }}>
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
                          <input placeholder="Serial Number" name="serialNumber" className="form-control" value={this.state.serialNumber} onChange={this.changeSerialnumberHandler} />
                        </div>

                        <div className="col-sm-12" >
                        <span style={{fontWeight:"lighter", fontSize:"12px"}}>Date Received</span>
                          <input placeholder="Date Received" type="date" name="dateReceived" className="form-control" value={this.state.dateReceived} onChange={this.changeDateReceivedHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="FundedBy" name="funder" className="form-control" value={this.state.funder} onChange={this.handleFunderHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Model Number" name="modelNumber" className="form-control" value={this.state.modelNumber} onChange={this.changeModelHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Quantity" name="quantity" className="form-control" value={this.state.quantity} onChange={this.changeQuantityHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Unit Price" name="unitPrice" className="form-control" value={this.state.unitPrice} onChange={this.changeUnitPriceHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Purchased Price" name="purchasedPrice" className="form-control" value={this.state.purchasedPrice} onChange={this.changePurchasedPriceHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Total Cost USD" name="totalCostUsd" className="form-control" value={this.state.totalCostUsd} onChange={this.changeTotalCostUsdHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Implementer" name="location" className="form-control" value={this.state.implementer} onChange={this.changeImplementerHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Implementation Period" name="location" className="form-control" value={this.state.implementationPeriod} onChange={this.changeImplementationPeriodHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Categories" name="location" className="form-control" value={this.state.categories} onChange={this.changeCategoriesHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Location" name="location" className="form-control" value={this.state.location} onChange={this.changeLocationHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Custodian" name="custodian" className="form-control" value={this.state.custodian} onChange={this.handleCustodianHandler} />
                        </div>

                        <div className="col-12" style={{ marginTop: "15px" }}>
                          <select className="form-select" onChange={this.handleConditionHandler}>
                            <option defaultValue>Asset Condition</option>
                            <option condition="1">A1(New)</option>
                            <option condition="2">A2</option>
                            <option condition="3">A3</option>
                            <option condition="4">F1</option>
                            <option condition="5">F2</option>
                            <option condition="6">F3</option>
                          </select>
                        </div>
                      </div>

                      {/* <div className="col-12" style={{ marginTop: "15px", marginBottom: "15px" }} >
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
                        </div> */}

                      {/* <div className="row">
                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Facility" name="facility" className="form-control" value={this.state.facility} onChange={this.changeFacilityHandler} />
                        </div>

                       
                      </div> */}
                      {/* <div className="row">
                       

                        <div className="col-sm-6" style={{ marginTop: "10px" }}>
                          <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                        </div>
                      </div> */}
                      {/* <div className="row">
                        <div className="col-12" style={{ marginTop: "15px" }}>
                          <select className="form-select" onChange={this.changeStatusHandler}>
                            <option defaultValue>Status</option>
                            <option checkedAsset="1">Deployed</option>
                            <option checkedAsset="2">Not Deployed</option>
                            <option checkedAsset="3">Returned</option>
                          </select>
                        </div>
                      </div> */}
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