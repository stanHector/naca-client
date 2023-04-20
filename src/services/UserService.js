import axios from "axios";

import { BaseURL } from './index'

class UserService {

  getUsers() {
    return axios.get(`${BaseURL}/users`);
  }

  createUser(user) {
    return axios.post(`${BaseURL}/user`, user);
  }

  getUserById(userId) {
    return axios.get(`${BaseURL}/user/` + userId);
  }

  updateUser(user, userId) {
    return axios.put(`${BaseURL}/user/` + userId, user);
  }

  updateUsers(user, userId) {
    return axios.patch(`${BaseURL}/user/` + userId, user);
  }

  deleteUser(userId) {
    return axios.delete(`${BaseURL}/user/` + userId);
  }

  getUser(userId) {
    return axios.get(`${BaseURL}/` + userId)
  }

}

export default new UserService();
