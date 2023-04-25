import React from 'react'
import './featuredInfo.css'


export default function FeatureInfo({ isLoading, allAssets, items }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const states = JSON.parse(localStorage.getItem('user'))?.states;
    const allStateAsset = allAssets?.map((state) => state.states)?.filter((x) => x === user?.states)
    const totalDeployedAsset = allAssets?.map((x) => x.category)?.filter((x) => x === 'Asset');
    const totalHeealthCommodities = allAssets?.map((x) => x.category)?.filter((x) => x === 'Health Commodities');

    const stateAsset = allAssets.map((x) => x).filter((x) => x.states === states);
    const totalStateDeployedAsset = stateAsset.map((x) => x.category).filter((x) => x === 'Asset');
    const healthCommodities = stateAsset.map((x) => x.category).filter((x) => x === 'Health Commodities');

    // const usersCount = items?.map((state) => state.states)?.filter((x) => x === user?.states)
    // const totalDeployedItems = items?.map((x) => x.status)?.filter((x) => x === 'Deployed');

    // const stateItem = items.map((x) => x).filter((x) => x.states === states);
    // const itemsDeployCount = stateItem.map((x) => x.status).filter((x) => x === 'Deployed');

    return (

        <>
            {/* {
                user !== 'User' && */}
            <div className='featured'>
                {/* <div className="featuredItem" style={{ backgroundColor: "#0EEEBE" }}>
                        <span className="featuredTitle"><PeopleOutline /> Users</span>
                        <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                            <span className="featuredMoney">{user?.length}</span>
                        </div>
                    </div> */}

                <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "#9FE2BF " }}>
                    {
                        isLoading ? (<div className="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            :
                            (<>
                                <span className="featuredTitle">General</span>
                                <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                    <span className="featuredMoney">{user?.userType === "Admin" ? allAssets?.length : allStateAsset?.length}</span>

                                </div>
                            </>)
                    }
                </div>
                <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "#40E0D0" }}>
                    {
                        isLoading ? (<div className="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            : (<>
                                <span className="featuredTitle">Total Assets</span>
                                <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                    <span className="featuredMoney">{user?.userType === "Admin" ? totalDeployedAsset?.length : totalStateDeployedAsset?.length}</span>

                                </div>
                            </>)
                    }
                </div>

                <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "#6495ED" }}>
                    {
                        isLoading ? (<div className="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            : (
                                <>
                                    <span className="featuredTitle">Total Health Commodites</span>
                                    <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                        <span className="featuredMoney">{user?.userType === "Admin" ? totalHeealthCommodities?.length : healthCommodities?.length}</span>
                                    </div>
                                </>
                            )
                    }
                </div>

                {/* <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "#CCCCFF" }}>
                    {
                        isLoading ? (<div className="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            : (
                                <>
                                    <span className="featuredTitle">Total Items</span>
                                    <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                        <span className="featuredMoney">{user?.userType === "Admin" ? items?.length : totalItems?.length}</span>
                                    </div>
                                </>
                            )
                    }
                </div> */}

                {/* <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "#f5eef8" }}>
                    {
                        isLoading ? (<div className="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            : (
                                <>
                                    <span className="featuredTitle">Total Loaned Items</span>
                                    <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                        <span className="featuredMoney">{user?.userType === "Admin" ? brokenAssets?.length : brokenAssetsCount?.length}</span>
                                    </div>
                                </>
                            )
                    }
                </div> */}
            </div>
            {/* } */}
        </>
    )
}