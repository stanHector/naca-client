import React, { Component } from "react";
import ItemService from "../services/ItemService"

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            description: "",
            quantity: "",
            states: "",
            location: "",
            requestedBy: "",
            requesterEmail: "",
            status: "",
            condition: "",
            authorizedBy: "",
            loading: false,
        }

        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeRequestByHandler = this.changeRequestByHandler.bind(this);
        this.changeQuatityHandler = this.changeQuatityHandler.bind(this);
        this.changeRequesterEmail = this.changeRequesterEmail.bind(this);
        // this.handleStatesHandler = this.handleStatesHandler.bind(this);
        this.handlelocationHandler = this.handlelocationHandler.bind(this);
        this.handleConditionHandler = this.handleConditionHandler.bind(this);

        this.addItem = this.addItem.bind(this);
    }

    addItem = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let item = {
            userId: JSON.parse(localStorage.getItem('user'))?.id,
            date: new Date().toLocaleString().slice(0, 10),
            authorizedBy: JSON.parse(localStorage.getItem('user'))?.firstname,
            location: this.state.location,
            states: JSON.parse(localStorage.getItem('user'))?.states,
            description: this.state.description,
            requestedBy: this.state.requestedBy,
            quantity: this.state.quantity,
            condition: this.state.condition,
            requesterEmail: this.state.requesterEmail,
            status: this.state.status,
        };

        // console.log("item => " + JSON.stringify(item));
        if (this.state.requesterEmail) {
            if (this.state.location) {
                if (this.state.description) {
                    if (this.state.quantity) {
                        if (this.state.condition) {
                            if (this.state.requestedBy) {
                                // if (this.state.states) {
                                    ItemService.createItem(item).then((res) => {
                                        if (res === 'Request failed with status code 500') {
                                            alert('Network error')
                                            this.setState({ loading: false })
                                        } else {
                                            this.setState({ loading: false })
                                            this.props.history.push("/items");
                                        }
                                        console.log({ res });
                                    });

                                // } else {
                                //     alert("Select state")
                                //     this.setState({ loading: false })
                                // }
                            } else {
                                alert("Enter requester name")
                                this.setState({ loading: false })
                            }

                        } else {
                            alert("Enter condition")
                            this.setState({ loading: false })
                        }

                    } else {
                        alert("Enter quantity")
                        this.setState({ loading: false })
                    }

                } else {
                    alert("Enter description")
                    this.setState({ loading: false })
                }
            } else {
                alert("Enter location!")
                this.setState({ loading: false })
            }
        } else {
            alert("Enter requester email")
            this.setState({ loading: false })
        }
    };

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    };

    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    };


    // handleStatesHandler = (event) => {
    //     this.setState({ states: event.target.value });
    // };

    handleConditionHandler = (event) => {
        this.setState({ condition: event.target.value });
    };

    changeRequestByHandler = (event) => {
        this.setState({ requestedBy: event.target.value });
    };

    handlelocationHandler = (event) => {
        this.setState({ location: event.target.value });
    };

    changeQuatityHandler = (event) => {
        this.setState({ quantity: event.target.value });
    };

    changeRequesterEmail = (event) => {
        this.setState({ requesterEmail: event.target.value });
    };

    cancel() {
        this.props.history.push("/items");
    }

    render() {

        return (
            <React.Fragment>
                <div className="col-lg-12" style={{ marginTop: "150px", }}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center" style={{ margin: "10px", fontWeight: "bolder" }}> Add Item</h3>
                            <div className="card-body">
                                <form>
                                    <div className="container">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input placeholder="Description" name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                                </div>

                                                <div className="col-md-6">
                                                    <input placeholder="Requested By" name="requestedBy" className="form-control" value={this.state.requestedBy} onChange={this.changeRequestByHandler} />
                                                </div></div>
                                            <div className="row">
                                                <div className="col-md-6" style={{ marginTop: "15px" }}>
                                                    <input placeholder="Requester Email" type="email" name="requesterEmail" className="form-control" value={this.state.requesterEmail} onChange={this.changeRequesterEmail} />
                                                </div>

                                                <div className="col-md-6" style={{ marginTop: "15px" }}>
                                                    <input placeholder="Quantity" type="number" name="quantity" className="form-control" value={this.state.quantity} onChange={this.changeQuatityHandler} />
                                                </div>
                                            </div>
                                            {/* <div className="row">
                                                <div className="col-md-12" style={{ marginTop: "15px", marginBottom: "15px" }} >
                                                    <select className="form-select" onChange={this.handleStatesHandler}>
                                                        <option defaultValue> Select state</option>
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
                                            </div> */}
                                            <div className="row" style={{ marginTop: "15px" }}>
                                                <div className="col-md-12" >
                                                    <input placeholder="Location" type="location" name="location" className="form-control" value={this.state.location} onChange={this.handlelocationHandler} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12" style={{ marginTop: "15px" }}>
                                                    <select className="form-select" onChange={this.handleConditionHandler}>
                                                        <option defaultValue>Item Condition</option>
                                                        <option condition="1">A1</option>
                                                        <option condition="2">A2</option>
                                                        <option condition="3">A3</option>
                                                        <option condition="4">F1</option>
                                                        <option condition="5">F2</option>
                                                        <option condition="6">F3</option>
                                                    </select>
                                                </div>

                                                <div className="col-12" style={{ marginTop: "15px" }} >
                                                    <select className="form-select" onChange={this.changeStatusHandler}>
                                                        <option defaultValue>Select Status</option>
                                                        <option link="1">Deployed</option>
                                                        <option link="2">Returned</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row text-center" style={{ marginTop: "12px" }}>
                                            <div className="col-12" style={{ marginTop: "15px" }}>
                                                <button className="btn btn-primary" onClick={this.addItem}>
                                                    {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                                                    Add Item</button>
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

export default CreateItem;