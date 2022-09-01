import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const api_url = "http://localhost:8000/api/";
export default new (class AuthService {

  async isAdmin() {
    console.log("calling isAdmin");
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(api_url + "isAdmin", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async userByID(id) {
    let token = JSON.parse(localStorage.getItem("user")).access_token;

    console.log("calling userByID");

    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const res = await axios.get(api_url + "showTasks/" + id, data, config);
      console.log("hallo");
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async register(event) {
    console.log("calling register");
    let u = event.target[0].value;
    let e = event.target[1].value;
    let p = event.target[2].value;

    let data = null;
    let config = {
      params: {
        name: u,
        email: e,
        password: p,
      },
    };

    try {
      const res = await axios.post(api_url + "users", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async login(event) {
    console.log("calling login");
    let e = event.target[0].value;
    let p = event.target[1].value;

    let data = null;
    let config = {
      params: {
        email: e,
        password: p,
      },
    };
    try {
      const res = await axios.post(api_url + "login", data, config);
      if (res.data.access_token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    let token = JSON.parse(localStorage.getItem("user")).access_token;

    console.log("calling logout");

    let data = null;

    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(api_url + "logout", data, config);
      console.log("hallo");
      localStorage.removeItem("user");
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async me() {
    console.log("calling me");
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const res = await axios.post(api_url + "me", data, config);
      //console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async changeStatus(task,stat) {
    //console.log(stat);
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {
        ...task,
        status_change_to:stat,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    //console.log(config);
    try {
      console.log(task)
      const res = await axios.put(api_url + "changeStatus", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getTasks() {
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    console.log("calling getTasks");

    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const res = await axios.post(api_url + "showTasks", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers() {
    let token = JSON.parse(localStorage.getItem("user")).access_token;

    console.log("calling get Users");

    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const res = await axios.get(api_url + "users", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  
})();
