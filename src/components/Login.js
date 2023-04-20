import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import '../App.css';
import { BaseURL } from "../services/index";
import imgs from "../assets/nacass.jpg"
import img from "../assets/gf.png"
import img2 from "../assets/logos.png"

const App = (props) => {
    const [isloading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = JSON.parse(localStorage.getItem('users'))?.status;

    // console.log('Userprofile ' + user)
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true)
        const user = { email, password };

        try {
            const { data } = await axios.post(`${BaseURL}/login`,
                user)
            if (data.message === "Login Success!") {
                props.updateUser(data)
                localStorage.setItem('user', JSON.stringify(data))
                setIsLoading(false)
                history.push({
                    pathname: "/dashboard",
                    state: {
                        id: data.id
                    }
                })
            }
        } catch (error) {
            if (error.message === 'Request failed with status code 404') alert('User does not exist')
            else if (error.message === 'Request failed with status code 500') alert('Password Mismatch')
            else if (error.message === "Request failed with status code 403") alert('Error Occured!')
            else {
                alert('Network Error!')
                // console.log(error.message)
            }
            setIsLoading(false)
        }
    };

    //if there's a user show the message below
    // if (user) return <Dashboard />



    const myStyle = {
        // backgroundImage:
        // "url('https://reddingtonchalets.com/wp-content/uploads/2022/05/beach_resort_hotel_ghana_pool.jpg')",
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // backgroundColor: "#008000"
    };



    // if there's no user, show the login form
    return (
        <>
            <div style={myStyle}>
                <div className="container">
                    <div className="col-lg-10 col-xl-12 mx-auto" >
                        <div className="container" style={{ display: "flex", justifyContent: "center", marginTop: "100px", height:"150px" }}>
                            <img src={img} alt="img-logo" />
                            <img src={imgs} alt="img-logo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 col-xl-4 mx-auto" >
                            {/* <img src={img2} alt="img-logo"  /> */}
                            <div className="card flex-row my-3 border-0 shadow rounded-7 overflow-hidden">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5" style={{ fontWeight: "bolder", fontSize: "34px" }}>Login</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input style={{ marginTop: "20px" }} type="email" className="form-control" placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)} required />
                                            <label>Email address</label>
                                        </div>
                                        <hr />
                                        <div className="form-floating mb-3">
                                            <input style={{ marginTop: "20px" }} type="password" className="form-control" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)} required />
                                            <label>Password</label>
                                        </div>

                                        <div className="d-grid mb-2" >
                                            <button style={{
                                                backgroundColor: "#008000", borderColor: "#008000", borderTopRightRadius: "15px",
                                                borderBottomLeftRadius: "15px"
                                            }} className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit" disabled={isloading}>
                                                {isloading && <div className="spinner-border text-light" role="status"></div>}
                                                Login</button>
                                        </div>
                                        <hr className="my-4" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);

};

export default App;