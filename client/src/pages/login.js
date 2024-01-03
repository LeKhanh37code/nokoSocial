import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
 
  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="log-mid">
      <div className="container">
        <div className="forms">
          <div className="form login">
        
            <span className="log_title">nokoSocial</span>

            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="log-email"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={handleChangeInput}
                  value={email}
                />
                <i className="uil uil-envelope icon"></i>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div className="input-field">
                <label htmlFor="exampleInputPassword1">Password</label>

                {/* <div className="pass"> */}

                <input
                  type={typePass ? "text" : "password"}
                  className="password"
                  id="exampleInputPassword1"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                  placeholder="Enter your password"
                />
                <i className="uil uil-lock icon "></i>
                {/* <i className="uil uil-eye-slash showHidePw"></i> */}
                <span className="xin" onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </span>
              </div>

              {/* <span className="xin" onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                 </span> */}

              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input type="checkbox" />
                  <span className="text">Remember me</span>
                </div>

                <span className="text text-link">Forgot password?</span>
              </div>

              <div className="input-field button">
                <button
                  type="submit"
                  className="btn-log"
                  disabled={email && password ? false : true}
                >
                  Login
                </button>
              </div>

              <div className="login-signup">
                <span className="text">
                  Not a member?
                  <Link to="/register" className="text-link">
                    {" "}
                    Signup Now
                  </Link>
                </span>
              </div>
              {/* <p className="my-2">
                    You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
                </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
