import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { BaseURL } from "../services/index";
import '../App.css'


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
            if (error.message === 'Request failed with status code 404') alert('User does not exist');
            else if (error.message === 'Request failed with status code 500') alert('Password Mismatch')
            else if (error.message === "Request failed with status code 403") alert('Error Occured!');
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
        //         backgroundImage: 
        //  "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
        height: '100vh',
        marginTop: '-70px',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // backgroundColor: " #e67e22 "
    };

    // if there's no user, show the login form
    return (

        <div style={myStyle}>
            <div className="container" style={{ marginTop: "50px", padding: "50px" }}>
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginTop: "150px", padding: "50px" }}>

                        <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}>Login</h3>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="col-sm-12">
                                    <input className="form-control" type="text" value={email} placeholder="Email" onChange={({ target }) => setEmail(target.value)} />
                                </div>
                                <div>
                                    <div className="col-sm-12">
                                        <input style={{ marginTop: "20px" }} className="form-control" type="password" value={password} placeholder="Password" onChange={({ target }) => setPassword(target.value)} />
                                    </div>
                                </div>
                                <div className="form-row text-center" style={{ marginTop: "12px", }}>
                                    <div className="col-sm-12">
                                        <button className="btn btn-primary" type="submit" disabled={isloading} style={{
                                            margin: "10px", backgroundColor: "#CE5300", borderColor: "antiquewhite", borderTopRightRadius: "15px",
                                            borderBottomRightRadius: "15px"
                                        }}>
                                            {isloading && <div className="spinner-border text-light" role="status"></div>}
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

};

export default App;