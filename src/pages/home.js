import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const navigate = useNavigate();
    const { dataid } = useParams();
    const [data, datachange] = useState("");
    const LoadEdit = (id) => {
        navigate("/edit/" + id)

    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:3000/total-users/" + id, {
                method: "DELETE",
            })
            .then((res) => {
                    alert('rEMOVED successfully');
                    window.location.reload();



                }).catch((err) => {
                    console.log(err.message)
                })

        }

    }
    useEffect(() => {
        let name = sessionStorage.getItem('name');
        if (name === '' || name === null) {
            navigate('/login');
        }
        fetch("http://localhost:3000/total-users").then((res) => {
            return res.json();
        }).then((resp) => {
            datachange(resp);

        }).catch((err) => {
            console.log(err.message);

        })

    }, []);
    return (
        <>
            <div className="header">
                <Link className="links home" to={'/Home'}>Home</Link>
                <Link className="links" to={'/login'}>Logout</Link>
            </div>
            <h1 className="text-align mt-20"> Welcome to dshboard page</h1>
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
                    {data &&
                        data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <div className="action-btn">
                                    <a className="edit-btn" onClick={() => { LoadEdit(item.id) }}>Edit</a>
                                    <a className="delete-btn" onClick={() => { Removefunction(item.id) }}><DeleteIcon /></a>

                                    </div>
                                
                                </td>



                            </tr>
                        ))
                    }

                </tbody>


            </table>

        </>

    );
}
export default Home