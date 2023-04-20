
import React, { Component } from "react";
import ReportService from "../services/ReportService";

class ViewStockCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            report: {
            },
        };
    }

    componentDidMount() {
        ReportService.getAllReportById(this.state.id).then((res) => {
            this.setState({ report: res.data });
        });
    }

    print() {
        window.print();
    }
    cancel() {
        this.props.history.push("/stocks");
    }
    render() {

        return (
            <div>
                <div className="container" style={{ marginTop: "30px" }}>
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}>Stock Card</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Date :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.date}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Warehouse name:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.warehouseName}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Description:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.description}</td>
                                        </tr>

                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Expiry Date:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.expiryDate}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Unit:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.unit}</td>
                                        </tr>

                                       <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Stock State:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.stockState}</td>
                                        </tr> 
                                         

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Quantity issued in month one:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.quantityIssuedInMonthOne}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Quantity issued in month two:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.quantityIssuedInMonthTwo}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Quantity issued in month three:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.quantityIssuedInMonthThree}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Sum:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.sum}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Stock On Hand:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.stockOnHand}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>AMC:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.amc}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>MOS :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.mos}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Remark :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.report.remark}</td>
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

export default ViewStockCard;
