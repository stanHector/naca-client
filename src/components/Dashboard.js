import React, {useEffect, useState} from 'react'
import Sidebar from './sidebar/Sidebar';
import '../App.css'
import Home from '../pages/home/Home'
import Topbar from '../components/topbar/Topbar'

import AssetService, {GetAssets} from '../services/AssetService'
import ItemService from '../services/ItemService';

const Dashboard = (props) => {
    const [assets, setAsset] = useState([])
    const [allAssets, setAllAssets] = useState([])
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        GetAssets().then((res) => {
            // console.log("response : " + res);
            setAsset(res.data)
            setLoading(false)
        });
    }, [])

    useEffect(() => {
        // setLoading(true)
        let isMounted = true
        AssetService.getAllAssets().then((res) => {
            // console.log("response : " + res);
                        // setAllAsset(res)
            // console.log("the all assets >>" + JSON.stringify(res))
            setLoading(false)
            if (isMounted) {
                setAllAssets(res.data)}; 
        });
        return () => { isMounted = false };
    }, [])

    useEffect(() => {
        // setLoading(true)
        let isMounted = true
        ItemService.getAllItems().then((res) => {
            // console.log("response : " + res);
                        // setAllAsset(res)
            // console.log("the all assets >>" + JSON.stringify(res))
            setLoading(false)
            if (isMounted) {
                setItems(res.data)}; 
        });
        return () => { isMounted = false };
    }, [])

    return (
        
        <>
        <Topbar/>
            <div className="container1">
                <Sidebar id={props?.location?.state?.id} />
                <Home isLoading={isLoading} assets={assets} allAssets={allAssets} items={items} />
            </div>
        </>
    )
}
export default Dashboard;