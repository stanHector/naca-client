
import React, { Component } from "react";
import ItemService from "../services/ItemService";

class ViewItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            item: {
            },
        };
    }

    componentDidMount() {
        ItemService.getItemById(this.state.id).then((res) => {
            this.setState({ item: res.data });
        });
    }

    print() {
        window.print();
    }

    cancel() {
        this.props.history.push("/items");
    }
    render() {
        return (
            <div>
                <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center" style={{ margin: "15px", fontFamily: "cursive", fontWeight: "bold" }}>Item Detail</h3>
                            <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                                <table class="table" >
                                    <tbody>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Date :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.date}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Description :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.description}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Quantity :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.quantity}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row" ></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Requested By:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.requestedBy}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Requester Email:</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.requesterEmail}</td>
                                        </tr>
                                        <tr >
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Location :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.location}</td>                                    </tr>


                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Status :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.status}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>State :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.states}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Location :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.location}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td style={{ fontSize: "20px", fontWeight: "bold" }}>Authorized By :</td>
                                            <td style={{ fontSize: "20px" }}>{this.state.item.authorizedBy}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="container"><p>Please read the terms of use below. </p>
                                By signing, I acknowledge collecting the above asset stating it is in good state. I also hereby accept the asset declaration and management terms and condition.
                                <p></p>
                                <p>Sign:- ………………………………………………………………………………………………………………………………………………………………………………</p>
                                <p>Date:- ……………………………………………………………………………………………………………………………………………………………………………… </p>
                                <p>Acknowledged By Name : - ……………………………………………………………………………………………………………………</p>
                                <p>Sign & Date: - …………………………………………………………………………………………………………………………………………………………</p>
                            </div>
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
export default ViewItem;
