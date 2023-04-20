import React, { Component } from "react";
import './upload.css'
import { BaseURL } from '../../services/index'

class UploadInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedFile: null,
            loading: false,
        };
    }
    handleChange = (e) => {
        this.setState({
            ...this.state, selectedFile: e.target.files[0]
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const formData = new FormData();
        if (this.state.selectedFile) {

            formData.append(
                'files',
                this.state.selectedFile,
                this.state.selectedFile.name,
            );
            await fetch(`${BaseURL}/uploadInventory`, {
                method: 'POST',
                body: formData,
            });
            this.props.history.push("/inventories");
        } else {
            alert('Please upload a file!')
            this.setState({ loading: false })
        }
    };

    cancel() {
        this.props.history.push("/inventories");
    }

    render() {
        return (
            <>
                <div className="row d-flex justify-content-center mt-100">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="text-center" style={{ marginTop: "20px", marginBottom: "25px", fontFamily: "cursive", fontWeight: "bold" }}>
                                    <h3>Upload Inventory from excel file</h3>
                                </div>
                                <div className="card-block">
                                    <div class="custom-file mb-3 text-center" >
                                        <input onChange={this.handleChange} type="file" />
                                    </div>
                                    <div className="text-center m-t-20">
                                        <button style={{ backgroundColor: "#008000", borderColor: "#008000" }} className="btn btn-lg btn-primary btn-login" type="submit" disabled={this.state.loading}>
                                            {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                                            Upload Now
                                        </button>
                                        <button onClick={this.cancel.bind(this)} className="btn btn-outline-danger" style={{ margin: "30px" }} >Cancel Now</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default UploadInventory;