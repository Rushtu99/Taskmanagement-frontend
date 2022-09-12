import axios from "axios";
import moment from "moment";

const api_url = "http://localhost:8000/api/";
export default new (class AuthService {
  async verifyEmail() {
    console.log("verifying Email");
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/email/verify",
        data,
        config
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async verifyEmailReq() {
    console.log("calling verify Email");
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/email/request-verification",
        data,
        config
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async resetPassword(e) {
    console.log("calling reset password");
    let email = e.target[0].value;
    let password = e.target[1].value;
    let password_confirmation = e.target[2].value;

    const urlToken = new URL(window.location.href);
    const token = urlToken.searchParams.get("token");

    let data = null;

    let config = {
      params: {
        password,
        password_confirmation,
        token,
        email,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/password/reset",
        data,
        config
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async resetPasswordReq(e) {
    console.log("calling reset password");
    console.log(e);
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {
        email: e,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/password/reset-request",
        data,
        config
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

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

    console.log(u);
    console.log(e);
    console.log(p);

    let data = null;
    let config = {
      params: {
        name: u,
        email: e,
        password: p,
        role: 1,
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

  
    const res = await axios.post(api_url + "me", data, config);
    return res;
  }

  async changeStatus(task, stat) {
    //console.log(stat);
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {
        ...task,
        status_change_to: stat,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    //console.log(config);
    try {
      console.log(task);
      const res = await axios.post(api_url + "changeStatus", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async changeRole(role, to) {
    //console.log(stat);
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let data = null;
    let config = {
      params: {
        to,
        role_change_to: role,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    //console.log(config);
    try {
      //console.log(config)
      const res = await axios.post(api_url + "changeRole", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async captcha(ref) {
    let data = null;
    let config = {
      params: {
        ref,
      },
      headers: {
        Authorization: "Bearer ",
      },
    };
    try {
      const res = await axios.post(api_url + "captcha", data, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async createTask(title,due_date,desc, to) {
    let token = JSON.parse(localStorage.getItem("user")).access_token;

    console.log("calling create task");
   

    let data = null;
    let config = {
      params: {
        title,
        due_date: moment(due_date).utc().format("YYYY-MM-DD HH:mm:ss"),
        desc,
        assigned_to: to,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(api_url + "createTask", data, config);
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
    const res = await axios.post(api_url + "showTasks", data, config);
    return res;
  }

  async deleteTask(id){
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    console.log("calling deleteTask");

    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.post(api_url + 'deleteTask/' + id, data, config);
    return res;
  }

  async getAllTasks() {
    let token = JSON.parse(localStorage.getItem("user")).access_token;
    console.log("calling getAllTasks");

    let data = null;
    let config = {
      params: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    };
      let res = await axios.post(api_url + "showAllTasks", data, config);
      console.log(res);
      return res;
  }

  async getAllUsers() {
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
