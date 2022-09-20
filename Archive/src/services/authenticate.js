import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_url = "http://localhost:8000/api/";

export default new (class AuthService {
  async isAdmin() {

    // var config = {
    //     method: 'post',
    //     url: '127.0.0.1:8000/api/me',
    //     headers: { 
    //       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY2MTI1NzI5NiwiZXhwIjoxNjYxMjYwODk2LCJuYmYiOjE2NjEyNTcyOTYsImp0aSI6Ikc3a1RXd0xzNndXQ1NWM1kiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.M09W0MplrLiAR60PKwMTWsL9giGRAgCwOzHueZ6eVHI', 
    //     },

    //   };
    //   console.log(axios(config));

    // console.log("hello");
    let token = JSON.parse(localStorage.getItem("user")).access_token;


    let data = null;
    let config = {
      params: {
        email:"bob",
      },
      headers:{
        Authorization: 'Bearer '+token,
      }
    }
    try {
      const res = await axios.post(api_url + "test",data,config)
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);

      console.log(err);
    }
  }

  async login(event) {
    let e = event.target[0].value;
    let p = event.target[1].value;

    let data = null;
    let config = {
      params: {
        email: e,
        password: p,
      }
    }
    try {
      const res = await axios.post(api_url + "login",data,config);
      if (res.data.access_token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res;
    } catch (err) {
      console.log("gggg");

      console.log(err);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(event) {
    let u = event.target[0].value;
    let e = event.target[1].value;
    let p = event.target[2].value;

    try {
      const res = await axios.post(api_url + "users", null, {
        params: {
          name: u,
          email: e,
          password: p,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
})();
