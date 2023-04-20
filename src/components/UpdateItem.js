import React, { Component } from "react";
import ItemService from "../services/ItemService";

class UpdateItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            date: "",
            states: "",
            location: "",
            description: "",
            quantity: "",
            requestedBy: "",
            requesterEmail: "",
            status: "",
            authorizedBy: "",

            loading: false,
        };

        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeRequestedByHandler = this.changeRequestedByHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeRequesterEmailHandler = this.changeRequesterEmailHandler.bind(this);
        this.changeAuthroizedByHandler = this.changeAuthroizedByHandler.bind(this);
        this.handleStatesHandler = this.handleStatesHandler.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItemById(this.state.id).then((res) => {
            let item = res.data;
            this.setState({
                date: item.date,
                location: item.location,
                description: item.description,
                states: item.states,
                quantity: item.quantity,
                requestedBy: item.requestedBy,
                requesterEmail: item.requesterEmail,
                status: item.status,
                authorizedBy: item.authorizedBy,
            });
        })
    }

    updateItem = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let item = {
            date: new Date().toLocaleString().slice(0, 10),
            location: this.state.location,
            states: this.state.states,
            description: this.state.description,
            quantity: this.state.quantity,
            requestedBy: this.state.requestedBy,
            requesterEmail: this.state.requesterEmail,
            status: this.state.status,
        };

        // console.log("item => " + JSON.stringify(item));
        ItemService.updateItem(item, this.state.id).then((res) => {
            this.props.history.push("/items");
        });
    };
    handleStatesHandler = (event) => {
        this.setState({ states: event.target.value });
    };


    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    };

    changeQuantityHandler = (event) => {
        this.setState({ quantity: event.target.value });
    };

    changeRequestedByHandler = (event) => {
        this.state({ requestedBy: event.target.value });
    };

    changeRequesterEmailHandler = (event) => {
        this.setState({ requesterEmail: event.target.value });
    };

    changeAuthroizedByHandler = (event) => {
        this.setState({ authorizedBy: event.target.value });
    };

    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    };

    changeLocationHandler = (event) => {
        this.setState({ location: event.target.value });
    };


    cancel() {
        this.props.history.push("/items");
    }

    render() {
        return (
            <>
                <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center" style={{ marginTop: "25px", fontFamily: "cursive", fontWeight: "bold" }}>Update Item</h3>
                            <div className="card-body">
                                <form>
                                    <div className="container">
                                        <div className="form-group">
                                            <label style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "15px" }}>Date</label>
                                            <div className="col-sm-12">
                                                <input placeholder="Date" name="date" className="form-control" value={this.state.date} />
                                            </div>
                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Description </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Description" name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                            </div>
                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Quantity </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Quantity" name="quantity" className="form-control" value={this.state.quantity} onChange={this.changeQuantityHandler} />
                                            </div>
                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Requested By </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Requested By" name="requestedBy" className="form-control" value={this.state.requestedBy} onChange={this.changeRequestedByHandler} />
                                            </div>
                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}> Requester Email </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Requester Email" name="requesterEmail" className="form-control" value={this.state.requesterEmail} onChange={this.changeRequesterEmailHandler} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Authorized By</label>
                                            <div className="col-sm-12">
                                                <input placeholder="Authorized By" name="authorizedBy" className="form-control" value={this.state.authorizedBy} onChange={this.changeAuthroizedByHandler} />
                                            </div>

                                            <div className="col-12" style={{ marginTop: "15px" }}>
                                                <label style={{ fontWeight: "bold" }}>Status</label>
                                                <select className="form-select" onChange={this.changeStatusHandler}>
                                                    <option defaultValue>Item status</option>
                                                    <option checkedAsset="1">Deployed</option>
                                                    <option checkedAsset="2">Returned</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12" style={{ marginTop: "10px" }} >
                                                <label style={{ fontWeight: "bold" }}>State</label>
                                                <select className="form-select" onChange={this.handleStatesHandler}>
                                                    <option defaultValue>Select state</option>
                                                    <option states="1">FCT</option>
                                                    <option states="2">Abia</option>
                                                    <option states="3">Adamawa</option>
                                                    <option states="4">Akwa-Ibom</option>
                                                    <option states="5">Anambra</option>
                                                    <option states="6">Bauchi</option>
                                                    <option states="7">Bayelsa</option>
                                                    <option states="8">Benue</option>\
                                                    <option states="9">Borno</option>
                                                    <option states="10">Cross-River</option>
                                                    <option states="11">Delta</option>
                                                    <option states="12">Ebonyi</option>
                                                    <option states="13">Edo</option>
                                                    <option states="14">Ekiti</option>
                                                    <option states="15">Enugu</option>
                                                    <option states="16">Gombe</option>
                                                    <option states="17">Imo</option>
                                                    <option states="18">Jigawa</option>
                                                    <option states="19">Kaduna</option>
                                                    <option states="20">Kano</option>
                                                    <option states="21">Katsina</option>
                                                    <option states="22">Kebbi</option>
                                                    <option states="23">Kogi</option>
                                                    <option states="24">Kwara</option>
                                                    <option states="25">Lagos</option>
                                                    <option states="26">Nasarawa</option>
                                                    <option states="27">Niger</option>
                                                    <option states="28">Ogun</option>
                                                    <option states="29">Ondo</option>
                                                    <option states="31">Oyo</option>
                                                    <option states="32">Plateau</option>
                                                    <option states="33">Rivers</option>
                                                    <option states="34">Sokoto</option>
                                                    <option states="35">Taraba</option>
                                                    <option states="36">Yobe</option>
                                                    <option states="37">Zamfara</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12" style={{ marginTop: "15px" }}>
                                            <input placeholder="Location" type="location" name="location" className="form-control" value={this.state.location} onChange={this.handlelocationHandler} />
                                        </div>

                                        <div className="form-row text-center" style={{ marginTop: "12px" }} >
                                            <div className="col-12">
                                                <button className="btn btn-primary" onClick={this.updateItem} >
                                                    {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                                                    Update Item</button>

                                                <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default UpdateItem;