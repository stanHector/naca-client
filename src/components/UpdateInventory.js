import React, { Component } from "react";
import BinCardService from "../services/BinCardService";
import InventoryService from "../services/InventoryService";

class UpdateInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      date: "",
      warehouseName: "",
      description: "",
      batchNo: "",
      manufactureDate: "",
      expiryDate: "",
      openingBalance: "",
      closingStock: "",
      issuedTo: "",
      quantityIssued: "",
      issuedToEmail: "",
      phone: "",
      dispatchedLocation: "",
      balance: "",
      phone: "",
      loading: false,
    };

    this.changeIssuedToHandler = this.changeIssuedToHandler.bind(this);
    this.changeIssuedQuantityHandler = this.changeIssuedQuantityHandler.bind(this);
    this.handleDispatchedLocation = this.handleDispatchedLocation.bind(this);
    this.changeIssuedToEmailHandler = this.changeIssuedToEmailHandler.bind(this);
    this.changePhonelHandler = this.changePhonelHandler.bind(this);
    this.createBin = this.createBin.bind(this)
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
        receivedQuantity: inventory.receivedQuantity,
      });
    });
  }

  createBin = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let bincard = {
      date: new Date().toLocaleString().slice(0, 10),
      warehouseName: this.state.warehouseName,
      description: this.state.description,
      batchNo: this.state.batchNo,
      manufactureDate: this.state.manufactureDate,
      expiryDate: this.state.expiryDate,
      openingBalance: this.state.openingBalance,
      closingStock: this.state.closingStock,
      issuedTo: this.state.issuedTo,
      issuedToEmail: this.state.issuedToEmail,
      phone: this.state.phone,
      quantityIssued: this.state.quantityIssued,
      dispatchedLocation: this.state.dispatchedLocation,
      inventoryId: this.state.id
    };
    // console.log("bincard => " + JSON.stringify(bincard));

    if (this.state.issuedTo) {
      if (this.state.quantityIssued) {
        if (this.state.dispatchedLocation) {
          if (this.state.issuedToEmail) {
            if (this.state.phone) {
              if (this.state.quantityIssued >= 0) {
                // if (this.state.issuedQuantity < this.state.receivedQuantity) {
                BinCardService.createBincard(bincard).then((res) => {
                  this.props.history.push("/bincards");
                });

                // } else {
                //   alert("Issued quantity must not be greater than received quantity!")
                //   this.setState({ loading: false })
                // }
              } else {
                alert("Issued Quantity must be a greater than zero!")
                this.setState({ loading: false })
              }


            } else {
              alert("Please enter phone number!")
              this.setState({ loading: false })
            }
          } else {
            alert("Enter email of the receiver!")
            this.setState({ loading: false })
          }
        } else {
          alert("Please enter dispatched location!")
          this.setState({ loading: false })
        }
      } else {
        alert("Please enter issued quantity!")
        this.setState({ loading: false })
      }
    } else {
      alert("Please enter issued to!")
      this.setState({ loading: false })
    }
  };

  changeIssuedToHandler = (event) => {
    this.setState({ issuedTo: event.target.value });
  };

  changeIssuedQuantityHandler = (event) => {
    this.setState({ quantityIssued: event.target.value });
  };

  changeIssuedToEmailHandler = (event) => {
    this.setState({ issuedToEmail: event.target.value });
  };

  handleDispatchedLocation = (event) => {
    this.setState({ dispatchedLocation: event.target.value });
  };

  changePhonelHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  cancel() {
    this.props.history.push("/inventories");
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "15px"}}>
          <div className="row">
            <div className="card col-md-8 offset-md-2 offset-md-2">
              <h3 className="text-center" style={{ marginTop: "25px", fontWeight: "bold" }}>Create Bincard</h3>
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
                        <input name="manufactureDate" className="form-control" value={this.state.manufactureDate} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Expiry Date</label>
                      <div className="col-sm-12">
                        <input name="expiryDate" className="form-control" value={this.state.expiryDate} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Opening Balance</label>
                      <div className="col-sm-12">
                        <input name="openingBalance" className="form-control" value={this.state.openingBalance} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Closing Stock</label>
                      <div className="col-sm-12">
                        <input name="closingStock" className="form-control" value={this.state.closingStock} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Issued To</label>
                      <div className="col-sm-12">
                        <input placeholder="IssuedTo" name="issuedTo" className="form-control" value={this.state.issuedTo} onChange={this.changeIssuedToHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Issued Quantity</label>
                      <div className="col-sm-12">
                        <input name="issuedQuantity" className="form-control" value={this.state.quantityIssued} onChange={this.changeIssuedQuantityHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Issued To Email</label>
                      <div className="col-sm-12">
                        <input name="issuedToEmail" className="form-control" value={this.state.issuedToEmail} onChange={this.changeIssuedToEmailHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Phone Number</label>
                      <div className="col-sm-12">
                        <input name="phone" className="form-control" value={this.state.phone} onChange={this.changePhonelHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Dispatched Location</label>
                      <div className="col-sm-12">
                        <input name="Dispatched Location" className="form-control" value={this.state.dispatchedLocation} onChange={this.handleDispatchedLocation} />
                      </div>
                    </div>

                    <div className="form-row text-center" style={{ marginTop: "12px" }} >
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.createBin} >
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Create Bincard </button>
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
export default UpdateInventory;
