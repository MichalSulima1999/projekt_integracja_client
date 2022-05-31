import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useInput from '../hooks/useInput';
import useToggle from "../hooks/useToggle";

import axios from "../api/axios";
axios.defaults.withCredentials = true;
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", ""); //useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle('persist', false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user);
    formData.append("password", pwd);

    try {
      const response = await axios.post(
        LOGIN_URL,
        formData,
        {
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        },
      );
      const accessToken = response?.data?.token;
      setAuth({ user, pwd, accessToken });

      //setUser("");
      resetUser();
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        console.log(err?.response.data);
        setErrMsg(err?.response.data);
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">
            Login:
          </label>
          <input
            className="form-control"
            type="text"
            id="login"
            ref={userRef}
            {...userAttribs}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </div>

        <button className="btn btn-primary">Sign in</button>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist" className="form-check-label">
            Trust this device
          </label>
        </div>
      </form>
      <p>
        Need an account?
        <br />
        <span className="line">
          <a href="/register">Sign up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
