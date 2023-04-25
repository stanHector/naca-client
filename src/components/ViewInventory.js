
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
                <div className="container" style={{ marginTop: "150px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}>Detail</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Date Of Purchase :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.dateOfPurchase}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Source :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.source}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Name Of Article :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.nameOfArticle}</td>
                                        </tr>

                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Batch No :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.batchNo}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Purchase Order Number :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.purchaseOrderNumber}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Received Quantity:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.inventory.receivedQuantity}</td>
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
