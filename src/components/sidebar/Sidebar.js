import React, { useContext } from 'react'
import './sidebar.css'
import { People, VerifiedUser, ExitToApp, RecentActors, Report, CollectionsBookmark,HealingOutlined, LabelImportantOutlined, PostAddSharp, AssignmentSharp } from '@material-ui/icons'
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
                        {/* <Link to={"/assets"} className="sidebarListItem" id={id}>
                            <VerifiedUser className="sidebarIcon" />
                            General Assets
                        </Link> */}

                        <Link to={"/assets-list"} className="sidebarListItem" id={id}>
                            <AssignmentSharp className="sidebarIcon" />
                            Assets
                        </Link>

                        {/* <Link to={"/commodities-list"} className="sidebarListItem" id={id}>
                            <HealingOutlined className="sidebarIcon" />
                            Health Commodities
                        </Link> */}

                        {
                            user !== 'User' &&
                            <Link to={"/inventories"} className="sidebarListItem">
                                <Report className="sidebarIcon" />
                                Health Commodities
                            </Link>
                        }

                        {
                            user !== 'User' &&
                            <Link to={"/bincards"} className="sidebarListItem">
                                <PostAddSharp className="sidebarIcon" />
                                Bincard
                            </Link>
                        }

                        {
                            user !== 'User' &&
                            <Link to={"/consolidated"} className="sidebarListItem">
                                <CollectionsBookmark className="sidebarIcon" />
                                Consolidated Stock
                            </Link>
                        }

                        {
                            user !== 'User' &&
                            <Link to={"/stocks"} className="sidebarListItem">
                                <LabelImportantOutlined className="sidebarIcon" />
                                Stock Report
                            </Link>
                        }

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