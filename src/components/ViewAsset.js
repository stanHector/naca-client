
import React, { Component } from "react";
import AssetService from "../services/AssetService";

class ViewAsset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            asset: {
            },
        };
    }

    componentDidMount() {
        AssetService.getAllAssetsById(this.state.id).then((res) => {
            this.setState({ asset: res.data });
        });
    }

    print() {
        window.print();
    }
    cancel() {
        this.props.history.push("/assets");
    }
    render() {
        return (
            <div>
                <div className="container" style={{ marginTop: "15px" }}>
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center" style={{ margin: "15px",  fontWeight: "bold" }}>Asset Detail</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Description :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.description}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>AssetID :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.assetId}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>SerialNumber :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.serialNumber}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>ModelNumber:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.modelNumber}</td>
                                        </tr>

                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Date Received :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.dateReceived}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Funded By :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.fundedBy}</td>
                                        </tr>
                                      
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Quantity :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.quantity}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Unit Price:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.unitPrice}</td>
                                        </tr>
                                       
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Asset condition :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.condition}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Category :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.categories}</td>
                                        </tr>
                                        {/* <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Status :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.status}</td>
                                        </tr> */}
                                        {/* <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>State :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.states}</td>
                                        </tr> */}
                                        {/* <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Facility :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.facility}</td>
                                        </tr> */}
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Location :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.location}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Custodian :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.custodian} {this.state.asset.lastname}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Email :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.email}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="container"> <p className="text- center" style={{ fontWeight: "bold", }}>Please read the terms of use below</p>
                                By signing, I acknowledge collecting the above asset stating it is in good state.
                                <p>I also hereby accept the asset declaration and management terms and condition.</p>
                                <p></p>
                                <p>Sign:- ………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………</p>
                                <p>Date:- ……………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………… </p>
                                <p>Acknowledged By Name:- ………………………………………………………………………………………………………………………………………………………………………………………………</p>
                                <p>Sign & Date:- ……………………………………………………………………………………………………………………………………………………………………………………………………………………………………</p>
                            </div>
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

export default ViewAsset;
