import React, { Component } from "react";
import BinCardService from "../services/BinCardService";
import InventoryService from "../services/InventoryService";
// import Topbar from "./topbar/Topbar";

class UpdateBin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      date: "",
      nameOfArticle: "",
      purchaseOrderNumber: "",
      receivedQuantity: "",
      issuedTo: "",
      issuedQuantity: "",
      dispatchedLocation: "",
      balance: "",
      loading: false,
    };

    this.changeIssuedToHandler = this.changeIssuedToHandler.bind(this);
    this.changeIssuedQuantityHandler = this.changeIssuedQuantityHandler.bind(this);
    this.handleDispatchedLocation = this.handleDispatchedLocation.bind(this);
    // this.updateInventory = this.updateInventory.bind(this);
    this.createBin = this.createBin.bind(this)
  }

  componentDidMount() {
    InventoryService.getInventoryById(this.state.id).then((res) => {
      let inventory = res.data;
      this.setState({
        nameOfArticle: inventory.nameOfArticle,
        purchaseOrderNumber: inventory.purchaseOrderNumber,
        receivedQuantity: inventory.receivedQuantity,
        // inventoryId: inventory.id
        // userType: user.userType,
        //   states: user.states
      });
    })
  }

  createBin = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let bincard = {
      date: new Date().toLocaleString().slice(0, 10),
      nameOfArticle: this.state.nameOfArticle,
      purchaseOrderNumber: this.state.purchaseOrderNumber,
      receivedQuantity: this.state.receivedQuantity,
      issuedTo: this.state.issuedTo,
      issuedQuantity: this.state.issuedQuantity,
      dispatchedLocation: this.state.dispatchedLocation,
      balance: this.state.balance,
      inventoryId: this.state.id
    };
    console.log("bincard => " + JSON.stringify(bincard));

    if (this.state.issuedTo) {
      if (this.state.issuedQuantity) {
        if (this.state.dispatchedLocation) {
          // if (this.state.issuedQuantity > this.state.receivedQuantity) {
            // InventoryService.updateInventory(bincard, this.state.id).then((res) => {
            // });
            
            BinCardService.createBincard(bincard).then((res) => {
              this.props.history.push("/bincards");
           
          });
          // } else {
          //   alert("Issued Qunatity can not be greater than Recieved Quantity!")
          //   this.setState({ loading: false })
          // }
        } else {
          alert("Please enter Dispatched Location!")
          this.setState({ loading: false })
        }
      } else {
        alert("Please enter Issued Quantity!")
        this.setState({ loading: false })
      }
    } else {
      alert("Please enter Issued To!")
      this.setState({ loading: false })
    }
  };

  changeIssuedToHandler = (event) => {
    this.setState({ issuedTo: event.target.value });
  };

  changeIssuedQuantityHandler = (event) => {
    this.setState({ issuedQuantity: event.target.value });
  };

  handleDispatchedLocation = (event) => {
    this.setState({ dispatchedLocation: event.target.value });
  };

  // handleSelectUserType = (event) => {
  //   this.setState({ userType: event.target.value });
  //   console.log("usertype");
  // };

  cancel() {
    this.props.history.push("/inventories");
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-8 offset-md-2 offset-md-2">
              <h3 className="text-center" style={{ marginTop: "25px", fontWeight: "bold" }}>Create Bincard</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <label style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "15px" }}>Name of Article</label>
                      <div className="col-sm-12">
                        <input placeholder="Name Of Article" name="nameOfArticle" className="form-control" value={this.state.nameOfArticle} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Purchase Order Number </label>
                      <div className="col-sm-12">
                        <input placeholder="PO Number" name="purchaseOrderNumber" className="form-control" value={this.state.purchaseOrderNumber} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Received Quantity</label>
                      <div className="col-sm-12">
                        <input name="receivedQuantity" className="form-control" value={this.state.receivedQuantity} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Issued To</label>
                      <div className="col-sm-12">
                        <input placeholder="IssuedTo" name="issuedTo" className="form-control" value={this.state.issuedTo} onChange={this.changeIssuedToHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Issued Quantity</label>
                      <div className="col-sm-12">
                        <input name="issuedQuantity" className="form-control" value={this.state.issuedQuantity} onChange={this.changeIssuedQuantityHandler} />
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
export default UpdateBin;
