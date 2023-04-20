import React, { Component } from "react";
import AssetService from "../services/AssetService";

class UpdateAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: "",
            assetId: "",
            serialNumber: "",
            dateReceived: "",
            fundedBy: "",
            modelNumber: "",
            quantity: "",
            unitPrice: "",
            purchasePrice: "",
            totalCostUsd: "",
            implementer: "",
            implementationPeriod: "",
            categories: "",
            location: "",
            custodian: "",
            condition: "",
            loading: false,
        };

        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeAssetIDHandler = this.changeAssetIDHandler.bind(this);
        this.changeManufacturerHandler = this.changeManufacturerHandler.bind(this);
        this.changeOtherBrandHandler = this.changeOtherBrandHandler.bind(this);
        this.changeModelHandler = this.changeModelHandler.bind(this);
        this.changeSerialnumberHandler = this.changeSerialnumberHandler.bind(this);
        this.changeDateReceivedHandler = this.changeDateReceivedHandler.bind(this);
        this.changePurchasedPriceHandler = this.changePurchasedPriceHandler.bind(this);
        this.handleFunderHandler = this.handleFunderHandler.bind(this);
        this.changeProjectHandler = this.changeProjectHandler.bind(this);
        this.handleConditionHandler = this.handleConditionHandler.bind(this);
        this.handleStatesHandler = this.handleStatesHandler.bind(this);
        this.changeFacilityHandler = this.changeFacilityHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.handleCustodianHandler = this.handleCustodianHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);

        this.updateAsset = this.updateAsset.bind(this);
    }

    componentDidMount() {
        AssetService.getAllAssetsById(this.state.id).then((res) => {
            let asset = res.data;
            this.setState({
                description: asset.description,
                assetId: asset.assetId,
                serialNumber: asset.serialNumber,
                dateReceived: asset.dateReceived,
                fundedBy: asset.fundedBy,
                modelNumber: asset.modelNumber,
                quantity: asset.quantity,
                unitPrice: asset.unitPrice,
                purchasePrice: asset.purchasePrice,
                totalCostUsd: asset.totalCostUsd,
                implementer: asset.implementer,
                implementationPeriod: asset.implementationPeriod,
                categories: asset.categories,
                location: asset.location,
                custodian: asset.custodian,
                condition: asset.condition,
                status: asset.status,
            });
        })
        // console.log(this.state.assignee);
    }


    updateAsset = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let asset = {
            // description: this.state.description,
            // assetId: this.state.assetId,
            // manufacturer: this.state.manufacturer,
            // otherBrand: this.state.otherBrand,
            // modelNumber: this.state.modelNumber,
            // serialNumber: this.state.serialNumber,
            // dateReceived: this.state.dateReceived,
            // purchasedPrice: this.state.purchasedPrice,
            // funder: this.state.funder,
            // project: this.state.project,
            condition: this.state.condition,
            location: this.state.location,
            custodian: this.state.custodian,
            // email: this.state.email,
            status: this.state.status,

        };
        // console.log("asset => " + JSON.stringify(asset));

        AssetService.updateAssets(asset, this.state.id).then((res) => {
            this.props.history.push("/assets");
        });
    };

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    };

    changeOtherBrandHandler = (event) => {
        this.setState({ otherBrand: event.target.value });
    };

    changeDateReceivedHandler = (event) => {
        this.state({ dateReceived: event.target.value });
    };

    changeAssetIDHandler = (event) => {
        this.setState({ assetId: event.target.value });
    };

    changeModelHandler = (event) => {
        this.setState({ modelNumber: event.target.value });
    };

    changePurchasedPriceHandler = (event) => {
        this.setState({ purchasedPrice: event.target.value })
    }
    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    };

    handleStatesHandler = (event) => {
        this.setState({ states: event.target.value });
    };

    changeFacilityHandler = (event) => {
        this.setState({ facility: event.target.value });
    };

    changeLocationHandler = (event) => {
        this.setState({ location: event.target.value });
    };

    handleConditionHandler = (event) => {
        this.setState({ condition: event.target.value });
    };

    handleFunderHandler = (event) => {
        this.setState({ funder: event.target.value });
    };

    handleCustodianHandler = (event) => {
        this.setState({ custodian: event.target.value });
    };

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    };

    // handlelocationHandler = (event) => {
    //     this.setState({ location: event.target.value });
    // };
    changeSerialnumberHandler = (event) => {
        this.setState({ serialNumber: event.target.value });
    };

    changeManufacturerHandler = (event) => {
        this.setState({ manufacturer: event.target.value });
    };

    changeProjectHandler = (event) => {
        this.setState({ project: event.target.value });
    };


    cancel() {
        this.props.history.push("/assets");
    }

    render() {
        const users = JSON.parse(localStorage.getItem('user'))?.userType;

        return (
            <>
                <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2">
                            <h3 className="text-center" style={{ marginTop: "25px", fontWeight: "bold" }}>Update Asset</h3>
                            <div className="card-body">
                                <form>
                                    <div className="container">
                                        <div className="form-group">
                                            <label style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "15px" }}>Description</label>
                                            <div className="col-sm-12">
                                                <input placeholder="Description" name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Asset ID </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Asset Id" name="assetid" className="form-control" value={this.state.assetId} onChange={this.changeAssetIDHandler} />
                                            </div>

                                            {/* <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Manufacturer</label>
                                            <div className="col-sm-12">
                                                <input name="manufacturer" className="form-control" value={this.state.manufacturer} onChange={this.changeManufacturerHandler} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Other Brand/Make </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Other Brand/Make" name="otherBrand" className="form-control" value={this.state.otherBrand} onChange={this.changeOtherBrandHandler} />
                                            </div> */}

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Model Number</label>
                                            <div className="col-sm-12">
                                                <input name="modelNumber" className="form-control" value={this.state.modelNumber} onChange={this.changeModelHandler} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Serial Number</label>
                                            <div className="col-sm-12">
                                                <input placeholder="Serial Number" name="serialNumber" className="form-control" value={this.state.serialNumber} onChange={this.changeSerialnumberHandler} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Date Received </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Date Received" name="dateReceived" className="form-control" value={this.state.dateReceived} onChange={this.changeDateReceivedHandler} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Funded By</label>
                                            <div className="col-sm-12">
                                                <input name="fundedBy" className="form-control" value={this.state.fundedBy} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Quantity </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Quantity" name="quantity" className="form-control" value={this.state.quantity} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Unit Price </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Unit Price" name="unitPrice" className="form-control" value={this.state.unitPrice} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Purchased Price(N) </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Purchased Price" name="purchasePrice" className="form-control" value={this.state.purchasePrice} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Total cost (USD) </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Total Cost in USD" name="totalCostUsd" className="form-control" value={this.state.totalCostUsd} />
                                            </div>

                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Category </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Category" name="categories" className="form-control" value={this.state.categories} />
                                            </div>
                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Asset Condition </label>
                                            <div className="col-sm-12">
                                                <input placeholder="Asset Condition" name="condition" className="form-control" value={this.state.condition} />
                                            </div>
                                            {
                                                users !== 'User' &&
                                                <div className="col-12" style={{ marginTop: "15px" }}>
                                                    <select className="form-select" onChange={this.handleConditionHandler}>
                                                        <option defaultValue>Select asset condition</option>
                                                        <option condition="1">A1 (New)</option>
                                                        <option condition="2">A2</option>
                                                        <option condition="3">A3</option>
                                                        <option condition="4">F1</option>
                                                        <option condition="5">F2</option>
                                                        <option condition="6">F3</option>
                                                    </select>
                                                </div>
                                            }


                                            {/* <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Facility</label>
                                            <div className="col-sm-12">
                                                <input name="facility" className="form-control" value={this.state.facility} onChange={this.changeFacilityHandler} />
                                            </div> */}


                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Location</label>
                                            <div className="col-sm-12">
                                                <input name="location" className="form-control" value={this.state.location} onChange={this.changeLocationHandler} />
                                            </div>


                                            <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Custodian</label>
                                            <div className="col-sm-12">
                                                <input name="assignee" className="form-control" value={this.state.custodian} onChange={this.handleAssigneeHandler} />
                                            </div>

                                            {/* <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Email</label>
                                            <div className="col-sm-12">
                                                <input name="email" type="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                                            </div> */}

                                            {/* <label style={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}>Email</label>
                                            <div className="col-sm-12">
                                                <input name="email" type="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                                            </div> */}

                                            <div className="col-12" style={{ marginTop: "15px" }}>
                                                <select className="form-select" onChange={this.changeStatusHandler}>
                                                    <option defaultValue>Select status</option>
                                                    <option checkedAsset="1">Deployed</option>
                                                    <option checkedAsset="2">Not Deployed</option>
                                                    <option checkedAsset="3">Returned</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className="form-row text-center" style={{ marginTop: "12px" }} >
                                            <div className="col-12">
                                                <button className="btn btn-success" onClick={this.updateAsset} >
                                                    {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                                                    Update Asset </button>
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

export default UpdateAsset;