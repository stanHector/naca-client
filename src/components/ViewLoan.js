
import React, { Component } from "react";
import AssetService from "../services/AssetService";

class ViewLoan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            asset: {
            },
        };
    }

    componentDidMount() {
        AssetService.getAssetById(this.state.id).then((res) => {
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
                <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center" style={{ margin: "15px", fontFamily: "cursive", fontWeight: "bold" }}>Asset Detail</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Company :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.company}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Item Name :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.itemName}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Category :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.category}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row" ></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Asset Tag :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.assetTag}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Serial Number :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.serialnumber}</td>
                                        </tr>
                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Manufacturer :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.manufacturer}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Model :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.model}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Status :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.status}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Location :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.location}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Asset condition :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.condition}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Firstname :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.firstname}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Lastname :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.lastname}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Email :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Checked Asset :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.asset.checkedAsset}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="container"> <p className="text- center" style={{ fontWeight: "bold", }}>Please read the terms of use below</p>
                                By signing, I acknowledge collecting the above asset stating it is in good state.
                                <p>I also hereby accept the asset declaration and management terms and condition.</p>
                                <p></p>
                                <p>Sign:-………………………………………………………………………………………………………………</p>
                                <p>Date:-……………………………………………………………………………………………………………… </p>
                                <p>Acknowledged By: -Name………………………………………………………………………………</p>
                                <p>Sign & Date: -…………………………………………………………………………………………………</p>
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

export default ViewLoan;
