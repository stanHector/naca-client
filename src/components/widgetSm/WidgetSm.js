// import { Dashboard } from '@material-ui/icons';
import React from 'react';
import UsersList from '../UsersList';
import './widgetSm.css'

const WidgetSm = () => {
    const user = JSON.parse(localStorage.getItem('user'))?.userType;
    return (
        <> {
            user !== 'User' &&
            <div className="widgetSm">
                <UsersList />
            </div>
        }
        </>
    );

}

export default WidgetSm;