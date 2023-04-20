
import React, { Component } from "react";
import BinCardService from "../services/BinCardService";

class ViewBinCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            bincard: {
            },
        };
    }

    componentDidMount() {
        BinCardService.getAllBincardById(this.state.id).then((res) => {
            this.setState({ bincard: res.data });
        });
    }

    print() {
        window.print();
    }
    cancel() {
        this.props.history.push("/bincards");
    }
    render() {

        return (
            <div>
                <div className="container" style={{ marginTop: "30px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}>Bincard Detail</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Date :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.date}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Warehouse name:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.warehouseName}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Description:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.description}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Batch Number:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.batchNo}</td>
                                        </tr>

                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Manufacture Date:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.manufactureDate}</td>
                                        </tr>
                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Expiry Date:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.expiryDate}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Opening Balance:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.openingBalance}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Closing Stock:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.closingStock}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Issued To:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.issuedTo}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Dispatched Location :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.dispatchedLocation}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Email :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.bincard.issuedToEmail}</td>
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

export default ViewBinCard;
