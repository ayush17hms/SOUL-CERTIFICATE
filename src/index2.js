import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./afterLogin.css";
import background from "./images/bg-01.jpg";


function Index2() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAdmin = (e) => {
    e.preventDefault();
    console.log("ADMIN: ", id,"PASSWORD: ", password);
    if (id === "ayushjha" && password === "123456") {
      navigate("/UserDetails");
    }else{
      alert("Incorrect id or password")
    }
  };

  return (
    <div className="limiter">
      <div
        className="container-login100"
        style={{ background: `url(${background})` }}
      >
        <div className="wrap-login100 p-t-30 p-b-50">
          <span className="login100-form-title p-b-41">ADMIN LOGIN</span>
          <form className="login100-form validate-form p-b-33 p-t-5">
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter username"
            >
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setId(e.target.value)}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xe82a;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xe80f;"
              ></span>
            </div>

            <div className="container-login100-form-btn m-t-32">
              <button
                className="login100-form-btn"
                onClick={(e) => handleAdmin(e)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index2;
