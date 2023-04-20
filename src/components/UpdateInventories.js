import React, { Component } from "react";
import InventoryService from "../services/InventoryService";
import ReportService from "../services/ReportService";
// import Topbar from "./topbar/Topbar";

class UpdateInventories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      date: "",
      warehouseName: "",
      description: "",
      expiryDate: "",
      unit: "",
      stockState: "",
      quantityIssuedInMonthOne: "",
      quantityIssuedInMonthTwo: "",
      quantityIssuedInMonthThree: "",
      stockOnHand: "",
      remark: "",
      loading: false,
    };

    this.changeQuantityIssuedInMonthOneHandler = this.changeQuantityIssuedInMonthOneHandler.bind(this);
    this.changeQuantityIssuedInMonthTwoHandler = this.changeQuantityIssuedInMonthTwoHandler.bind(this);
    this.handleQuantityIssuedInMonthThree = this.handleQuantityIssuedInMonthThree.bind(this);
    this.changeRemarkHandler = this.changeRemarkHandler.bind(this);
    this.createReport = this.createReport.bind(this)
  }

  componentDidMount() {
    InventoryService.getInventoryById(this.state.id).then((res) => {
      let inventory = res.data;
      this.setState({
        warehouseName: inventory.warehouseName,
        description: inventory.description,
        unit: inventory.unit,
        stockState: inventory.stockState,
        expiryDate: inventory.expiryDate,
        stockOnHand: inventory.stockOnHand,
      });
    });
  }

  createReport = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let report = {
      date: new Date().toLocaleString().slice(0, 10),
      warehouseName: this.state.warehouseName,
      description: this.state.description,
      expiryDate: this.state.expiryDate,
      unit: this.state.unit,
      stockState: this.state.stockState,
      quantityIssuedInMonthOne: this.state.quantityIssuedInMonthOne,
      quantityIssuedInMonthTwo: this.state.quantityIssuedInMonthTwo,
      quantityIssuedInMonthThree: this.state.quantityIssuedInMonthThree,
      stockOnHand: this.state.stockOnHand,
      remark: this.state.remark,

    };
    // console.log("report => " + JSON.stringify(report));

    if (this.state.quantityIssuedInMonthOne) {
      if (this.state.quantityIssuedInMonthTwo) {
        if (this.state.quantityIssuedInMonthThree) {
          if (this.state.remark) {
            ReportService.createReport(report).then((res) => {
              this.props.history.push("/stocks");
            });
          } else {
            alert("Enter quantity issued in month three!")
            this.setState({ loading: false })
          }
        } else {
          alert("Enter quantity issued in month three!")
          this.setState({ loading: false })
        }
      } else {
        alert("Enter quantity issued in month two!")
        this.setState({ loading: false })
      }


    } else {
      alert("Enter quantity issued in month one!")
      this.setState({ loading: false })
    }

  };

  changeQuantityIssuedInMonthOneHandler = (event) => {
    this.setState({ quantityIssuedInMonthOne: event.target.value });
  };

  changeQuantityIssuedInMonthTwoHandler = (event) => {
    this.setState({ quantityIssuedInMonthTwo: event.target.value });
  };

  handleQuantityIssuedInMonthThree = (event) => {
    this.setState({ quantityIssuedInMonthThree: event.target.value });
  };

  // changeSumHandler = (event) => {
  //   this.setState({ sum: event.target.value });
  // };

  // changeAmcHandler = (event) => {
  //   this.setState({ amc: event.target.value });
  // };


  // changeMosHandler = (event) => {
  //   this.setState({ mos: event.target.value });
  // };

  changeRemarkHandler = (event) => {
    this.setState({ remark: event.target.value });
  };

  cancel() {
    this.props.history.push("/consolidated");
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "15px" }}>
          <div className="row">
            <div className="card col-md-8 offset-md-2 offset-md-2">
              <h3 className="text-center" style={{ marginTop: "25px", fontWeight: "bold" }}>Create Stock Report</h3>
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

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Expiry Date</label>
                      <div className="col-sm-12">
                        <input name="expiryDate" className="form-control" value={this.state.expiryDate} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Unit</label>
                      <div className="col-sm-12">
                        <input name="unit" className="form-control" value={this.state.unit} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Stock State</label>
                      <div className="col-sm-12">
                        <input name="Stock State" className="form-control" value={this.state.stockState} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Stock on hand</label>
                      <div className="col-sm-12">
                        <input name="Stock on hand" className="form-control" value={this.state.stockOnHand} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Quantity Issued In Month 1</label>
                      <div className="col-sm-12">
                        <input name="quantityIssuedInMonthOne" className="form-control" value={this.state.quantityIssuedInMonthOne} onChange={this.changeQuantityIssuedInMonthOneHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Quantity Issued In Month 2</label>
                      <div className="col-sm-12">
                        <input name="quantityIssuedInMonthTwo" className="form-control" value={this.state.quantityIssuedInMonthTwo} onChange={this.changeQuantityIssuedInMonthTwoHandler} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Quantity Issued In Month Three</label>
                      <div className="col-sm-12">
                        <input name="quantityIssuedInMonthThree" className="form-control" value={this.state.quantityIssuedInMonthThree} onChange={this.handleQuantityIssuedInMonthThree} />
                      </div>

                      <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Remark</label>
                      <div className="col-sm-12">
                        <textarea className="form-control" value={this.state.remark} onChange={this.changeRemarkHandler} />
                      </div>
                    </div>

                    <div className="form-row text-center" style={{ marginTop: "12px" }} >
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.createReport} >
                          {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                          Create stock report </button>
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
export default UpdateInventories;
