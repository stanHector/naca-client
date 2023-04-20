import React, { Component } from "react";
import BinCardService from "../services/BinCardService";
import InventoryService from "../services/InventoryService";
// import Topbar from "./topbar/Topbar";

class UpdateInvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      // date: "",
      warehouseName: "",
      description: "",
      batchNo: "",
      manufactureDate: "",
      expiryDate: "",
      openingBalance: "",
      closingStock: "",
      stockOnHand: "",
      reportingMonth: "",
      donor: "",
      loading: false,

    };

    // this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeManufactureDateHandler = this.changeManufactureDateHandler.bind(this);
    this.changeOpeningBalanceHandler = this.changeOpeningBalanceHandler.bind(this);
    this.changeClosingStockHandler = this.changeClosingStockHandler.bind(this);
    this.changeStockOnHandHandler = this.changeStockOnHandHandler.bind(this);
    this.changeReportingMonthHandler = this.changeReportingMonthHandler.bind(this);
    this.changeExpiryDateHandler = this.changeExpiryDateHandler.bind(this);
    this.updateInventory = this.updateInventory.bind(this)
  }

  componentDidMount() {
    InventoryService.getInventoryById(this.state.id).then((res) => {
      let inventory = res.data;
      this.setState({
        warehouseName: inventory.warehouseName,
        batchNo: inventory.batchNo,
        description: inventory.description,
        manufactureDate: inventory.manufactureDate,
        expiryDate: inventory.expiryDate,
        openingBalance: inventory.openingBalance,
        closingStock: inventory.closingStock,
        // receivedQuantity: inventory.receivedQuantity,
        stockOnHand: inventory.stockOnHand,
        reportingMonth: inventory.reportingMonth,

      });
    });
  }

  updateInventory = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let inventory = {
      // date: new Date().toLocaleString().slice(0, 10),
      manufactureDate: this.state.manufactureDate,
      openingBalance: this.state.openingBalance,
      closingStock: this.state.closingStock,
      reportingMonth: this.state.reportingMonth,
      stockOnHand: this.state.stockOnHand,
    };
  
    InventoryService.updateInventory(inventory, this.state.id).then((res) => {
      this.props.history.push("/inventories");
    });

  };

  changeManufactureDateHandler = (event) => {
    this.setState({ manufactureDate: event.target.value });
  };

  changeOpeningBalanceHandler = (event) => {
    this.setState({ openingBalance: event.target.value });
  };

  changeClosingStockHandler = (event) => {
    this.setState({ closingStock: event.target.value });
  };

  changeStockOnHandHandler = (event) => {
    this.setState({ stockOnHand: event.target.value });
  };

  changeReportingMonthHandler = (event) => {
    this.setState({ reportingMonth: event.target.value });
  };


  changeExpiryDateHandler = (event) => {
    this.setState({ expiryDate: event.target.value });
  };
  

  cancel() {
    this.props.history.push("/inventories");
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-8 offset-md-2 offset-md-2">
              <h3 className="text-center" style={{ marginTop: "25px", fontWeight: "bold" }}>Update Inventory</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <label style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "15px" }}>Warehouse Name</label>
                      <div className="col-sm-12">
                        <input placeholder="Warehouse Name" name="warehouseName" className="form-control" value={this.state.warehouseName} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Description </label>
                      <div className="col-sm-12">
                        <input placeholder="Description" name="description" className="form-control" value={this.state.description} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Batch No</label>
                      <div className="col-sm-12">
                        <input name="batchNo" className="form-control" value={this.state.batchNo} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Manufacture Date</label>
                      <div className="col-sm-12">
                        <input name="manufactureDate" className="form-control" value={this.state.manufactureDate} onChange={this.changeManufactureDateHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Expiry Date</label>
                      <div className="col-sm-12">
                        <input name="expiryDate" className="form-control" value={this.state.expiryDate} onChange={this.changeExpiryDateHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Opening Balance</label>
                      <div className="col-sm-12">
                        <input name="openingBalance" className="form-control" value={this.state.openingBalance}  onChange={this.changeOpeningBalanceHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Closing Stock</label>
                      <div className="col-sm-12">
                        <input name="closingStock" className="form-control" value={this.state.closingStock} onChange={this.changeClosingStockHandler} />
                      </div>

                    </div>

                    <div className="form-row text-center" style={{ marginTop: "12px" }} >
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.createBin} >
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Update Inventory</button>
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
export default UpdateInvent;
