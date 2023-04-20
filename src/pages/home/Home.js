import React from 'react';
import FeatureInfo from '../../components/featuredInfo/FeatureInfo';
import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'

const Home = ({ allAssets, assets, isLoading, items }) => {
    // console.log("assets: " + assets)
    
    return (
        <>
            <div className="home">
                <FeatureInfo allAssets={allAssets} isLoading={isLoading} items={items} />
                <WidgetLg assets={assets} isLoading={isLoading} />
                <WidgetSm />
            </div>
        </>
    );

}

export default Home;