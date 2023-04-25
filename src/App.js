import React, { useState, useCallback } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Auth } from "./components/Auth"


import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import ViewUser from "./components/ViewUser";
import CreateAsset from "./components/CreateAsset";
import AssetList from "./components/AssetList";
import Dashboard from './components/Dashboard';
import { history } from '../src/history'
import UpdateAsset from "./components/UpdateAsset";
import ViewAsset from "./components/ViewAsset";
import UsersList from "./components/UsersList"
import AssetsList from "./components/AssetsList";
import Login from "./components/Login"
import UserProfile from './components/userProfile/UserProfile'
import UploadAsset from './components/upload/UploadAsset';
import CreateLoan from './components/CreateLoan'
import CreateItem from './components/CreateItem'
import ItemsList from './components/ItemsList'
import UpdateItem from './components/UpdateItem'
import ViewItem from './components/ViewItem'
import UploadItem from './components/upload/UploadItem'
import InventoryList from './components/InventoryList'
import UpdateInventory from './components/UpdateInventory';
import BincardList from './components/BincardList';
import UploadInventory from './components/upload/UploadInventory';
import ViewBinCard from './components/ViewBinCard';
import ViewInventory from './components/ViewInventory';

import UpdateInvent from './components/UpdateInvent';
import Consolidated from './components/Consolidated';
import UpdateInventories from './components/UpdateInventories';
import Report from './components/Report';
import ViewStockCard from './components/ViewStockCard';
import LoanList from "./components/LoanList"
import ViewLoan from "./components/ViewLoan"
import Asset from './components/Asset';
import HealthCommodities from './components/HealthCommodities';


function App() {
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let route;
  if (isLoggedIn) {
    route = (
      <Switch>
        <Route exact path="/" component={() => (<Login user={user} updateUser={updateUser} />)}></Route>
        <Route path="/all-users" component={UsersList}></Route>
        <Route path="/all-assets" component={AssetsList}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/users" component={UserList}></Route>
        <Route path="/create-user" component={CreateUser}></Route>
        <Route path="/update-user/:id" component={UpdateUser}></Route>
        <Route path='/view-user/:id' component={ViewUser}></Route>
        <Route path="/assets" component={AssetList}></Route>
        <Route path="/create-asset" component={CreateAsset}></Route>
        <Route path="/update-asset/:id" component={UpdateAsset}></Route>
        <Route path='/view-asset/:id' component={ViewAsset}></Route>
        <Route path='/my-profile/:id' component={UserProfile}></Route>
        <Route path='/upload-asset' component={UploadAsset}></Route>
        <Route path= '/upload-inventory' component={UploadInventory}></Route>
        <Route path='/upload-item' component={UploadItem}></Route>
        <Route path='/create-loan' component={CreateLoan}></Route>
        <Route path='/create-item' component={CreateItem}></Route>
        <Route path='/items' component={ItemsList}></Route>
        <Route path='/loans' component={LoanList}></Route>
        <Route path="/update-item/:id" component={UpdateItem}></Route>
        <Route path='/view-item/:id' component={ViewItem}></Route>
        <Route path='/view-loan/:id' component={ViewLoan}></Route>
        <Route path='/inventories' component={InventoryList}></Route>
        <Route path='/view-inventory/:id' component={ViewInventory}></Route>
        <Route path='/update-inventory/:id' component={UpdateInventory}></Route>
        <Route path="/bincards" component={BincardList}></Route>
        <Route path='/view-bincard/:id' component={ViewBinCard}></Route>
        <Route path='/assets-list' component={Asset}></Route>
        <Route path='/commodities-list' component={HealthCommodities}></Route>
        <Route path='/update/:id' component={UpdateInventories}></Route>
        <Route path='/update-invent/:id' component={UpdateInvent}></Route>

        <Route path='/view-stock/:id' component={ViewStockCard}></Route>
        <Route path='/consolidated' component={Consolidated}></Route>
        <Route path='/stocks' component={Report}></Route>

        {/* <Redirect to="/"/> */}
      </Switch>
    )
  } else {
    route = (
      <Switch>
        <Route exact path="/" component={() => (<Login user={user} updateUser={updateUser} />)}></Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  const updateUser = useCallback((newUser) => {
    setUser(newUser);
    if (newUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])


  const logout = useCallback(
    () => {
      localStorage.removeItem("user")
      setIsLoggedIn(false)
    }, [])



  return (

    <Auth.Provider value={{ isLoggedIn: isLoggedIn, logout: logout, updateUser: updateUser }}>

      <div>
        {/* <Topbar /> */}
        <BrowserRouter history={history}>
          {/* <Route exact path="/" component={<ULogin user={user} updateUser={updateUser}/>}></Route> */}
          <div >
            {route}
          </div>
        </BrowserRouter>
      </div>
    </Auth.Provider>
  );
}

export default App;
