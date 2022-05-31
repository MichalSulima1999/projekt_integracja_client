import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axiosPrivate.get("/admin/users").then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <ul className="list-group">
      <li className="list-group-item list-group-item-primary">Users:</li>
      {users.map((user, i) => {
        return <li className="list-group-item" key={i}>Username: {user.username}, roles:
          {user.roles.map((role, i) => {
            return <span key={i}> {role}, </span>
          })}
        </li>
      })}
      <li className="list-group-item d-grid gap-2">
        <Link to="/admin/add_user" className="btn btn-primary">
          Add User
        </Link>
      </li>
    </ul>
  )
}

export default ShowUsers