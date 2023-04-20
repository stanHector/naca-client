import React, { Component } from "react";
import '../App.css'
import ItemService from "../services/ItemService";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, CloudDownloadOutlined, AddCircleOutlineSharp, AccountBalanceOutlined, SearchOutlined, CloudUploadOutlined } from '@material-ui/icons'
import { CSVLink } from "react-csv";
import axios from 'axios'
// import { BaseURL } from "../services";

const headers = [
    // { label: "Id", key: "id" },
    { label: "Date", key: "date" },
    { label: "Description", key: "description" },
    { label: "Quantity", key: "quantity" },
    { label: "Requested by", key: "requestedBy" },
    { label: "Requester email", key: "requesterEmail" },
    { label: "Status", key: "status" },
    { label: "Conditon", key: "condition" },
    { label: "Location", key: "location" },
    { label: "Authorized by", key: "authorizedBy" },

];

class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')).password,
            states: JSON.parse(localStorage.getItem('user')).states,
            userType: JSON.parse(localStorage.getItem('user')).userType,
            items: [],
            currentPage: 1,
            recordPerPage: 100,
            search: '',
        };

        this.csvLinkEl = React.createRef();

        this.createItem = this.createItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.viewItem = this.viewItem.bind(this);
    }

    componentDidMount() {
        this.getItemsByStatesPagination(this.state.currentPage);
    }


    getItemsByStatesPagination(currentPage) {
        currentPage = currentPage - 1;
        // axios.get(`${BaseURL}/items/${this.state.userType === 'User' ? this.state.states : ''}?page=${currentPage}&size=${this.state.recordPerPage}`)
        axios.get("http://localhost:8080/api/v1/items/" + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
            .then(response => response.data).then((data) => {
                this.setState({
                    items: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    }


    //Writing All the pagination functions
    //Show Next page
    showNextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            if (!this.state.search) {
                this.getItemsByStatesPagination(this.state.currentPage + 1);
            } else {
                this.searchItem(this.state.currentPage + 1)
            }
        }
    };

    //Show Last Page
    showLastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            if (!this.state.search) {
                this.getItemsByStatesPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
            }
            else {
                this.searchItem(Math.ceil(this.state.totalElements / this.state.recordPerPage));
            }
        }
    };

    //Show First page
    showFirstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (!this.state.search) {
                this.getItemsByStatesPagination(firstPage);
            } else {
                this.searchItem(firstPage)
            }
        }
    };

    //Show previous page
    showPrevPage = () => {
        let prevPage = 1
        if (this.state.currentPage > prevPage) {
            if (!this.state.search) {
                this.getItemsByStatesPagination(this.state.currentPage - prevPage);
            } else {
                this.searchItem(this.state.currentPage - prevPage);
            }
        }
    };

    //Search Box Method
    searchBox = (e) => {
        this.setState({
            //assigning value to event target
            [e.target.name]: e.target.value,
        });
    };

    //Search Method Logic
    searchItem = (currentPage) => {
        currentPage = currentPage - 1;
        axios.get("http://localhost:8080/api/v1/items/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.recordPerPage)
            .then(response => response.data).then((data) => {
                this.setState({
                    items: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    //Reset Search Box
    resetItem = (currentPage) => {
        this.setState({ "search": '' });
        this.getItemsByStatesPagination(currentPage);
    };

    // deleteItem(id) {
    //     ItemService.deleteItem(id).then((res) => {
    //         this.setState({
    //             items: this.state.items.filter((item) => item.id !== id),
    //         });
    //     });
    // }

    deleteItem(id) {
        const text = 'Are you sure you want to delete?'
        if (window.confirm(text) === true) {
            ItemService.deleteItem(id).then((res) => {
                this.setState({
                    items: this.state.items.filter((item) => item.id !== id),
                });
            });
        }
    }
    editItem(id) {
        this.props.history.push(`/update-item/${id}`);
    }

    viewItem(id) {
        this.props.history.push(`/view-item/${id}`);
    }

    createItem() {
        this.props.history.push("/create-item");
    }

    cancel() {
        this.props.history.push("/dashboard");
    }


    upload() {
        this.props.history.push("/upload-item");
      }
    


    render() {
        const { items, currentPage, totalPages, recordPerPage, search } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        const users = JSON.parse(localStorage.getItem('user'))?.userType;
        const userType = user?.userType;
        const userStates = user?.result?.states;
        const userItems = this.state?.items?.map((x) => x)?.filter((x) => x.states === userStates)
        const data = userType !== 'User' ? this.state.items : userItems
        const stateItems = items.map((x) => x).filter((x) => x.states === userStates);

        const downloadReport = async () => {
            this.setState({ data: data }, () => {
                setTimeout(() => {
                    this.csvLinkEl.current.link.click();
                });
            });
        }


        return (
            <div className="asset-list">
                {/* <Topbar /> */}
                {/* <div className="row"> */}
                <div className="top" style={{ backgroundColor: "#CE5300" }}>
                    <div style={{ marginTop: "20px" }} >
                        <span className="logs">Items</span>
                    </div>
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <input style={{ borderRadius: "12px", marginTop: "20px", marginRight: "15px", marginLeft: "40px" }} type="text" className="form-control" name="search" size="100" placeholder="Search by Requester email" value={search} onChange={this.searchBox} />
                        <button style={{ borderRadius: "12px", marginTop: "15px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} type="button" name="search" className=" btn btn-outline-primary" onClick={this.searchItem}><SearchOutlined /></button>
                    </div>
                    <div className="topRight">

                        <button style={{ marginRight: "8px", margin: "10px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} className="btn btn-primary float-lg-end" onClick={this.createItem.bind(this)}>
                            <AddCircleOutlineSharp />
                        </button>

                        {/* {
                            users !== 'User' &&
                            <button style={{ marginRight: "8px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} className="btn btn-primary float-lg-end" onClick={this.upload.bind(this)}>
                                <CloudUploadOutlined />
                            </button>} */}

                        <button style={{ marginRight: "8px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} className="btn btn-primary float-lg-end" onClick={this.cancel.bind(this)}>
                            <AccountBalanceOutlined />
                        </button>

                        <button style={{ marginRight: "8px", backgroundColor: "antiquewhite", borderColor: "antiquewhite", color: "chocolate" }} className="btn btn-primary float-lg-end" onClick={downloadReport}>
                            <CloudDownloadOutlined />
                        </button>
                    </div>
                </div>

                <table className="table table-striped table-bordered">
                    <thead style={{ textAlign: "center", fontSize: "13px" }}>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>State</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Requested by</th>
                            <th>Requester email</th>
                            <th>Status</th>
                            <th>Condition</th>
                            <th>Authorized by</th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center", fontSize: "12px" }}>
                        {items.length === 0 ?
                            <tr align="center"><td colSpan="12">No Record Found</td></tr> :
                            data?.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{(recordPerPage * (currentPage - 1)) + index + 1}</td>
                                    {/* <td>{item.id}</td>  */}
                                    <td>{item.date}</td>
                                    <td>{item.states}</td>
                                    <td>{item.location}</td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.requestedBy}</td>
                                    <td>{item.requesterEmail}</td>
                                    <td>{item.status}</td>
                                    <td>{item.condition}</td>
                                    <td>{item.authorizedBy}</td>
                                    <td className="text-center"><Link to={`/update-item/${item.id}`} className="edit"><Edit /></Link></td>
                                    {users !== 'User' &&
                                        <td className="text-center"><i onClick={() => this.deleteItem(item.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                                    } <td className="text-center"><Link to={`/view-item/${item.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>

                                </tr>
                            ))}
                    </tbody>
                </table>

                <table className="table">
                    <div style={{ float: 'left', fontFamily: 'monospace', color: '#0275d8' }}>
                        Page {currentPage} of {totalPages}
                    </div>
                    <div style={{ float: 'right' }}>
                        <div className="clearfix"></div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1 ? true : false} onClick={this.showPrevPage}>Previous</a></li>
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1 ? true : false} onClick={this.showFirstPage}>First</a></li>
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages ? true : false} onClick={this.showNextPage}>Next</a></li>
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages ? true : false} onClick={this.showLastPage}>Last</a></li>
                            </ul>
                        </nav>
                    </div>
                </table>

                <CSVLink
                    headers={headers}
                    filename="items.csv"
                    data={data}
                    ref={this.csvLinkEl} />

            </div>)
    }
}

export default ItemsList;