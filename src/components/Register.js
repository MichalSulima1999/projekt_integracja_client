import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const REGISTER_URL = "/admin/user/register";

const Register = () => {
  const axiosPrivate = useAxiosPrivate();

  const userRef = useRef();
  const errRef = useRef();

  const[roles, setRoles] = useState([0]);

  const [validRole, setValidRole] = useState(false);
  const[role, setRole] = useState([]);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    getRoles();
  }, []);

  useEffect(() => {
    setValidName(user.length > 0);
  }, [user]);

  useEffect(() => {
    setValidRole(role.length > 0);
  }, [role]);

  useEffect(() => {
    setValidPwd(pwd.length > 0);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleChangeRolesSelect = e => {
    let value = Array.from(
      e.target.selectedOptions,
      (option) => Number(option.value)
    );
    console.log("updatedOptions", value);
    setRole(value);
  };

  const getRoles = async () => {
    await axiosPrivate.get("/admin/roles").then((res) => {
      setRoles(res.data);
      console.log(res.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd, roles: role })
      );
      console.log(JSON.stringify(response));
      setSuccess(true);
      // clear input fields
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else {
          setErrMsg(err?.response.data);
        }
        console.log(err.response);
        errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/admin/show_users">Return</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
            className="form-control"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
            />
              </div>

              <div className="mb-3">
          <label htmlFor="role">Role:</label>
          <select
            className="form-control"
            id="role"
            onChange={handleChangeRolesSelect}
            value={role}
            multiple={true}
            required
            aria-invalid={validRole ? "false" : "true"}
          >
            {roles.map(el => {
              return <option key={el.id} value={el.id}>{el.name}</option>
            })}
          </select>
        </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
            className="form-control"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
            />
              </div>

              <div className="mb-3">
            <label htmlFor="confirm_pwd" className="form-label">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
            className="form-control"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
            />
            </div>

            <button
            className="btn btn-primary"
              disabled={!validName || !validPwd || !validMatch || !validRole ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
