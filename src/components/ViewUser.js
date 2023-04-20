import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {

      },
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "15px",  fontWeight: "bold" }}>User Detail</h3>
              <div className="card-body" style={{ marginLeft: "15px", marginRight: "15px", fontFamily: "cursive" }}>
                <table class="table" >
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td style={{ fontSize: "20px", fontWeight: "bold" }}>Firstname :</td>
                      <td style={{ fontSize: "20px" }}>{this.state.user.firstname}</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td style={{ fontSize: "20px", fontWeight: "bold" }}>Lastname :</td>
                      <td style={{ fontSize: "20px" }}>{this.state.user.lastname}</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td style={{ fontSize: "20px", fontWeight: "bold" }}>Email :</td>
                      <td style={{ fontSize: "20px" }}>{this.state.user.email}</td>
                    </tr>

                    <tr>
                      <th scope="row" ></th>
                      <td style={{ fontSize: "20px", fontWeight: "bold" }}>Location :</td>
                      <td style={{ fontSize: "20px" }}>{this.state.user.states}</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td style={{ fontSize: "20px", fontWeight: "bold" }}>Role :</td>
                      <td style={{ fontSize: "20px" }}>{this.state.user.userType}</td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ marginBottom: "22px", alignSelf: "center" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUser;
