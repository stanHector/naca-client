import React from 'react'
import AssetsList from '../AssetsList';
import './widgetLg.css'

const WidgetLg = ({ isLoading, assets }) => {

    return (
        <div className="widgetLg">
            <AssetsList tickets={assets} isLoading={isLoading} />
        </div>
    );
}

export default WidgetLg;