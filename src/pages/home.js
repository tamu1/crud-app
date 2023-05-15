import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
// import AuthContext from "../contexts/AuthContext";
import { AuthContext } from '../contexts/AuthContext';
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const loadEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const removeFunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch(`${process.env.REACT_APP_BASE_URL}/total-users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          alert('REMOVED successfully');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    let name = sessionStorage.getItem('name');
    console.log(name);
    let token = localStorage.getItem('token-info');
    console.log(token);
    
    if (!isLoggedIn && !token) {
      navigate('/login');
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/total-users`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isLoggedIn, navigate]);

  const logout = () => {
    localStorage.removeItem('token-info');
    setIsLoggedIn(false);
    navigate('/login');
  
  };

  return (
    <>
      <div className="header">
        <Link className="links home" to={'/home'}>Home</Link>
        {isLoggedIn ? (
          <Button variant="outlined" onClick={logout}>Logout</Button>
        ) : (
          <Link className="links" to={'/login'}>Login</Link>
        )}
      </div>
      <h1 className="text-align mt-20">Welcome to the dashboard page</h1>
      <div className="add-btn">
        <Link to="/add">Add data (+)</Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <div className="action-btn">
                  <div className="edit-btn" onClick={() => loadEdit(item.id)}>Edit</div>
                  <div className="delete-btn" onClick={() => removeFunction(item.id)}><DeleteIcon /></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
