import React, { useContext } from 'react'
import './sidebar.css'
import { People, VerifiedUser, ExitToApp, RecentActors, Report, LayersClearOutlined, LabelImportantOutlined, PostAddSharp, CollectionsBookmark, LabelImportant, LabelOff } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../Auth'


const Sidebar = ({ id }) => {
    const user = JSON.parse(localStorage.getItem('user'))?.userType;
    // const department = JSON.parse(localStorage.getItem('user'))?.department;
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

                        {/* <Link to={"/assets"} className="sidebarListItem" id={id}>
                            <VerifiedUser className="sidebarIcon" />
                           Assets
                        </Link> */}

                        {/* <Link to={"/health-commodities"} className="sidebarListItem" id={id}>
                            <VerifiedUser className="sidebarIcon" />
                           Health Commodities
                        </Link> */}

                        <Link to={"/inventories"} className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Inventory
                        </Link>


                        <Link to={"/bincards"} className="sidebarListItem">
                            <PostAddSharp className="sidebarIcon" />
                            Bin card
                        </Link>

                        {
                            user !== 'User' &&
                            <Link to={"/consolidated"} className="sidebarListItem">
                                <CollectionsBookmark className="sidebarIcon" />
                                Consolidated Stock
                            </Link>
                        }

                        <Link to={"/stocks"} className="sidebarListItem">
                            <LabelImportantOutlined className="sidebarIcon" />
                            Stock Report
                        </Link>

                        <Link to={"/items"} className="sidebarListItem">
                            <LabelOff className="sidebarIcon" />
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
                        margin: "10px", backgroundColor: "#008000", borderColor: "antiquewhite", borderTopRightRadius: "15px",
                        borderBottomLeftRadius: "15px"
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