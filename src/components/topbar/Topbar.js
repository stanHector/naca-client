import React, { Component } from 'react'
import "./topbar.css"
import imgs from '../topbar/logfhi.png'
import { LocationCityOutlined, Person } from '@material-ui/icons'

class Topbar extends Component {

    cancel() {
        this.props.history.push("/");
    }
    render() {
        const userState = JSON.parse(localStorage.getItem('user'))?.states;
        const firstname = JSON.parse(localStorage.getItem('user'))?.firstname;
        const lastname = JSON.parse(localStorage.getItem('user'))?.lastname;
        return (

            <div className="topbar">
                <div className="topbarWrapper" style={{ width: "%" }}>
                    <div className="topLeft">
                        {/* <img src={imgs} alt="img-logo" className="topAvatar" /> */}
                        <span className="logo" style={{ margin: "10px", fontFamily: "Candara" }}>NACA-GlobalFund Asset and Inventory Management System</span>
                    </div>

                    <div className="topRight" >
                        <span className="logo1" style={{ margin: "22px", color: "white", fontWeight: "bolder" }}> <LocationCityOutlined style={{ color: "", marginRight: "12px" }} />{userState}</span>

                        <span style={{ color: "antiquewhite" , margin:"12px"}}>
                            <Person /> {firstname} {lastname} </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Topbar