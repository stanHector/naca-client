import React, { Component } from 'react'
import "./topbar.css"
import imgs from '../topbar/Nacaas.png'
import img from '../topbar/logos.png'
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
                        <img src={imgs} alt="img-logo" className="topAvatar" />
                        <span className="logo" style={{ margin: "22px", fontFamily: "Candara", marginLeft: "50px", color:"#F8F9F9" , fontSize:"30px"}}>NACA - Global Fund Inventory & Asset Management System</span>
                        <img src={img} alt="img-logo" className="topAvatar" style={{height:"35px"}} />
                    </div>

                    <div className="topRight" >
                        <span className="logo1" style={{ margin: "22px", color: "#F8F9F9", fontWeight: "bolder" }}> <LocationCityOutlined style={{ color: "#F8F9F9", marginRight: "12px" }} />{userState}</span>

                        <span style={{ color: "#F8F9F9" , margin:"12px"}}>
                            <Person /> {lastname} {firstname}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Topbar