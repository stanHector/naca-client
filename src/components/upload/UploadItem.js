import React, { Component } from "react";
import './upload.css'
import { BaseURL } from "../../services";

class UploadItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            selectedFile: null,
        };
    }
    handleChange = (e) => {
        this.setState({ ...this.state, selectedFile: e.target.files[0] });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.selectedFile) {
            formData.append(
                'files',
                this.state.selectedFile,
                this.state.selectedFile.name,
                this.setState({ loading: false })
            );
            await fetch(`${BaseURL}/uploadItem`, {
                method: 'POST',
                body: formData,
            });
            this.props.history.push("/items");
        } else {
            alert('Please upload a file!')
            this.setState({ loading: false })
        }
    };

    cancel() {
        this.props.history.push("/items");
    }

    render() {
        return (
            <>
                <div className="row d-flex justify-content-center mt-100">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="text-center" style={{ marginTop: "20px", marginBottom: "25px", fontFamily: "cursive", fontWeight: "bold" }}>
                                    <h3>Upload items from excel file</h3>
                                </div>
                                <div className="card-block">
                                    <div class="custom-file mb-3 text-center" >
                                        <input onChange={this.handleChange} type="file" />
                                    </div>
                                    <div className="text-center m-t-20">
                                        <button onClick={this.cancel.bind(this)} className="btn btn-outline-danger" style={{ margin: "30px" }} >Cancel Now</button>
                                        <button className="btn btn-primary" type="submit">Upload Now</button>
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

export default UploadItem;