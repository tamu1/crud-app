import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const Home= () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        let name=sessionStorage.getItem('name');
        if(name==='' || name===null){
            navigate('/login');

        }

    },[]);
    return(
        <>
           <div className="header">
            <Link className="links home" to={'/Home'}>Home</Link>
            <Link  className="links" to={'/login'}>Logout</Link>
        </div>
        <h1> welcome to dshboard page</h1>
        </>
     
    );
}
export default Home