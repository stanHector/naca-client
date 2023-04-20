import React, { useContext } from 'react'
import './sidebar.css'
import { People, VerifiedUser, ExitToApp, RecentActors, Report, LayersClearOutlined, LabelImportantOutlined } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../Auth'


const Sidebar = ({ id }) => {
    const user = JSON.parse(localStorage.getItem('user'))?.userType;
    const auth = useContext(Auth);
    const history = useHistory();

    const logOut = () => {
        auth.logout()
        history.push("/")
    }

    return (
        <div className="sidebar">
            <div className="sidbarWrapper">
                <div className="sidebarMenu">
                    <label className="sidebarTitle">Dashboard</label>
                    <ul className="sidebarList">
                        {/* <Link to={"/dashboard"} className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </Link> */}
                        {/* {
                            user !== 'User' &&
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                        } */}
                        {
                            user !== 'User' &&
                            <Link to={"/users"} className="sidebarListItem">
                                <People className="sidebarIcon" />
                                Users
                            </Link>
                        }
                        <Link to={"/assets"} className="sidebarListItem" id={id}>
                            <VerifiedUser className="sidebarIcon" />
                            Assets
                        </Link>

                        {/* <Link to={"/loan"} className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Asset Movement
                        </Link> */}

                        <Link to={"/items"} className="sidebarListItem">
                            <LabelImportantOutlined className="sidebarIcon" />
                            Items
                        </Link>

                        <Link to={"/dashboard"} className="sidebarListItem">
                            <LayersClearOutlined className="sidebarIcon" />
                            Loans
                        </Link>

                        <Link to={`/my-profile/${id}`} className="sidebarListItem">
                            <RecentActors className="sidebarIcon" />
                            Profile
                        </Link>
                    </ul>

                    <Link to={"#"} onClick={logOut} style={{
                        margin: "10px", backgroundColor: "#CE5300", borderColor: "antiquewhite", borderTopRightRadius: "15px",
                        borderBottomRightRadius: "15px"
                    }} className="btn btn-primary float-lg-start">
                        <ExitToApp />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;