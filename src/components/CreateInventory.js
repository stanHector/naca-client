import { event } from "jquery";
import React, { Component } from "react";
import AssetService from "../services/AssetService";
import InventoryService from "../services/InventoryService";

class CreatInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warehouseName: "",
      description: "",
      batchNo: "",
      manufactureDate: "",
      expiryDate: "",
      unit: "",
      stockState: "",
      openingBalance: "",
      quantityReceived: "",
      closingStock: "",
      stockOnHand: "",
      reportingMonth: "",
      donor: "",
    };


    this.changeWarehouseHandler = this.changeWarehouseHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeBatchNoHandler = this.changeBatchNoHandler.bind(this);
    this.changeManufactureDateHandler = this.changeManufactureDateHandler.bind(this);
    this.handleExpiryDateHandler = this.handleExpiryDateHandler.bind(this);
    this.changeUnitHandler = this.changeUnitHandler.bind(this);
    this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
    this.changeStockOnHandHandler = this.changeStockOnHandHandler.bind(this);
    this.changeStockStateHandler = this.changeStockStateHandler.bind(this);
    this.changeOpeningBalanceHandler = this.changeOpeningBalanceHandler.bind(this);
    this.changeQuantityReceivedHandler = this.changeQuantityReceivedHandler.bind(this);
    this.changeClosingStockHandler = this.changeClosingStockHandler.bind(this);
    this.changeReportingMonthHandler = this.changeReportingMonthHandler.bind(this);
    this.changeDonorHandler = this.changeDonorHandler.bind(this);


    this.addInventory = this.addInventory.bind(this);
  }
  addInventory = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let inventory = {
      warehouseName: this.state.warehouseName,
      description: this.state.description,
      batchNo: this.state.batchNo,
      manufactureDate: this.state.manufactureDate,
      expiryDate: this.state.expiryDate,
      unit: this.state.unit,
      stockState: this.state.stockState,
      unitPrice: this.state.unitPrice,
      openingBalance: this.state.openingBalance,
      quantityReceived: this.state.quantityReceived,
      closingStock: this.state.closingStock,
      stockOnHand: this.state.stockOnHand,
      reportingMonth: this.state.reportingMonth,
      donor: this.state.donor,

    };
    if (this.state.description) {
    //   if (this.state.otherBrand) {
    //     if (this.state.funder) {
    //       if (this.state.assetId) {
    //         if (this.state.serialNumber) {
    //           if (this.state.location) {
    //             if (this.state.manufacturer) {
    //               if (this.state.modelNumber) {
    //                 if (this.state.status) {
    //                   if (this.state.facility) {
    //                     if (this.state.condition) {
    //                       if (this.state.states) {
    //                         if (this.state.dateReceived) {
    // if (this.state.purchasedPrice) {
    InventoryService.createInventory(inventory).then((res) => {
      this.setState({ loading: false })
      this.props.history.push("/inventories");
    });
    // } else {
    //   alert('Enter purchased Price!')
    //   this.setState({ loading: false })
    // }
    //                         } else {
    //                           alert('Enter Date Received!')
    //                           this.setState({ loading: false })
    //                         }
    //                       } else {
    //                         alert('Enter state!')
    //                         this.setState({ loading: false })
    //                       }
    //                     } else {
    //                       alert('Enter asset condition!')
    //                       this.setState({ loading: false })
    //                     }
    //                   } else {
    //                     alert('Enter facility!')
    //                     this.setState({ loading: false })
    //                   }
    //                 }
    //                 else {
    //                   alert('Select status!')
    //                   this.setState({ loading: false })
    //                 }
    //               } else {
    //                 alert('Select modelNumber!')
    //                 this.setState({ loading: false })
    //               }
    //             } else {
    //               alert('Select Manufacturer!')
    //               this.setState({ loading: false })
    //             }
    //           } else {
    //             alert('Select location!')
    //             this.setState({ loading: false })
    //           }
    //         } else {
    //           alert('Enter Serial number!');
    //           this.setState({ loading: false })
    //         }
    //       } else {
    //         alert('Enter AssetID! ')
    //         this.setState({ loading: false })
    //       }
    //     } else {
    //       alert('Enter funder! ')
    //       this.setState({ loading: false })
    //     }
    //   } else {
    //     alert('Enter other brand!')
    //     this.setState({ loading: false })
    //   }
    } else {
      alert('Enter description!')
      this.setState({ loading: false })
    }

  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeWarehouseHandler = (event) => {
    this.setState({ warehouseName: event.target.value });
  };

  changeBatchNoHandler = (event) => {
    this.setState({ batchNo: event.target.value });
  };

  changeManufactureDateHandler = (event) => {
    this.setState({ manufactureDate: event.target.value });
  };

  handleExpiryDateHandler = (event) => {
    this.setState({ expiryDate: event.target.value });
  };


  changeModelHandler = (event) => {
    this.setState({ modelNumber: event.target.value });
  };

  changeQuantityHandler = (event) => {
    this.setState({ quantity: event.target.value });
  };

  changeUnitHandler = (event) => {
    this.setState({ unit: event.target.value });
  };


  changeStockStateHandler = (event) => {
    this.setState({ stockState: event.target.value })
  }

  changeOpeningBalanceHandler = (event) => {
    this.setState({ openingBalance: event.target.value })
  }

  changeQuantityReceivedHandler = (event) => {
    this.setState({ quantityReceived: event.target.value })
  }
  changeClosingStockHandler = (event) => {
    this.setState({ closingStock: event.target.value })
  }

  changeReportingMonthHandler = (event) => {
    this.setState({ reportingMonth: event.target.value })
  }

  changeStockOnHandHandler = (event) => {
    this.setState({ stockOnHand: event.target.value })
  }

  changeDonorHandler = (event) => {
    this.setState({ donor: event.target.value });
  };

  cancel() {
    this.props.history.push("/inventories");
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{ marginTop: "15px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ marginTop: "15px", fontWeight: "bold" }}> Create Inventory</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      {/* <label style={{ marginTop: "10px" }}> First Name </label> */}

                      <div className="row">
                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Warehouse Name" name="warehouseName" className="form-control" value={this.state.warehouseName} onChange={this.changeWarehouseHandler} />
                        </div>
                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Description" name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Batch Number" name="batchNo" className="form-control" value={this.state.batchNo} onChange={this.changeBatchNoHandler} />
                        </div>

                        <div className="col-sm-12">
                          <span style={{ fontWeight: "lighter", fontSize: "12px" }}>Manufactured Date</span>
                          <input placeholder="Manufactured Date " type="date" name="manufactureDate" className="form-control" value={this.state.manufactureDate} onChange={this.changeManufactureDateHandler} />
                        </div>

                        <div className="col-sm-12">
                          <span style={{ fontWeight: "lighter", fontSize: "12px" }}>Expiry Date</span>
                          <input placeholder="Expiry Date " type="date" name="expiryDate" className="form-control" value={this.state.expiryDate} onChange={this.handleExpiryDateHandler} />
                        </div>
                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Unit" name="unit" className="form-control" value={this.state.unit} onChange={this.changeUnitHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Stock State" name="stockState" className="form-control" value={this.state.stockState} onChange={this.changeStockStateHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Opening Balance" name="openingBalance" className="form-control" value={this.state.openingBalance} onChange={this.changeOpeningBalanceHandler} />
                        </div>


                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Quantity Received" name="quantityReceived" className="form-control" value={this.state.quantityReceived} onChange={this.changeQuantityReceivedHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Closing Stock" name="closingStock" className="form-control" value={this.state.closingStock} onChange={this.changeClosingStockHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Stock on hand" name="stockOnHand" className="form-control" value={this.state.stockOnHand} onChange={this.changeStockOnHandHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Reporting Month" name="reportingMonth" className="form-control" value={this.state.reportingMonth} onChange={this.changeReportingMonthHandler} />
                        </div>

                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                          <input placeholder="Donor" name="donor" className="form-control" value={this.state.donor} onChange={this.changeDonorHandler} />
                        </div>

                      </div>

                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-primary" onClick={this.addInventory} disabled={this.state.loading}>
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Add Inventory
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
export default CreatInventory