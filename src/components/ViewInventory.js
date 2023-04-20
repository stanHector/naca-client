
import React, { Component } from "react";
import InventoryService from "../services/InventoryService";

class ViewInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            inventory: {
            },
        };
    }

    componentDidMount() {
        InventoryService.getInventoryById(this.state.id).then((res) => {
            this.setState({ inventory: res.data });

        });
    }

    print() {
        window.print();
    }
    cancel() {
        this.props.history.push("/inventories");
    }

    render() {

        return (
            <div>
                <div className="container" style={{ marginTop: "30px" }}>
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}>Inventory Detail</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Warehouse name :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.warehouseName}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Description :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.description}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Batch Number :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.batchNo}</td>
                                        </tr>

                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Manufacture Date:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.manufactureDate}</td>
                                        </tr>
                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Expiry Date :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.expiryDate}</td>
                                        </tr>

                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Unit :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.unit}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Stock State :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.stockState}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Opening Balance:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.openingBalance}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Quantity Received:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.quantityReceived}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Closing Stock:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.closingStock}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Stock On Hand:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.stockOnHand}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Reporting Month:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.reportingMonth}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Donor:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.donor}</td>
                                        </tr>


                                    </tbody>
                                </table>

                            </div>
                            {/* <div className="container"> <p className="text- center" style={{ fontWeight: "bold", }}>Please read the terms of use below</p>
                                By signing, I acknowledge collecting the above asset stating it is in good state.
                                <p>I also hereby accept the asset declaration and management terms and condition.</p>
                                <p></p>
                                <p>Sign:- ………………………………………………………………………………………………………………………………………………………………………………</p>
                                <p>Date:- ……………………………………………………………………………………………………………………………………………………………………………… </p>
                                <p>Acknowledged By Name:- …………………………………………………………………………………………………………………………</p>
                                <p>Sign & Date:- ……………………………………………………………………………………………………………………………………………………………</p>
                            </div> */}
                            <br></br>
                            <br></br>
                            <div className="text-center">
                                <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ marginBottom: "22px", alignSelf: "center" }}>Cancel</button>
                                <button className="btn  btn-primary" onClick={this.print} style={{ marginBottom: "22px", marginLeft: "22px", alignSelf: "center" }}>Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewInventory;
