import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditData = () => {
    const {dataid} = useParams();
    // const [data,datachange] = useState({});
    const navigate=useNavigate();

    useEffect(()=>{
        fetch("http://localhost:3000/total-users/" + dataid).then((res)=>{
            return res.json();
        }).then((resp)=>{
            // datachange(resp);
            idchange(resp.id);
            namechange(resp.name);
            emailchange(resp.email);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");


    const handlesubmit=(e)=>{
        e.preventDefault();
        const data=({id,name,email});
      
        fetch("http://localhost:3000/total-users/" + dataid,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        })
        
        .then((res)=>{
            alert('saved successfully');
            navigate("/home");

          

        }).catch((err)=>{
            console.log(err.message)
        })

    }
    return(
        <>
        <h1 className="text-align">Edit data </h1>
        <div className="data">
            <form onSubmit={handlesubmit}>
            <div className="form-group">
            <label>Id</label>
            <input value={id} disabled="disabled" className=""></input>
            </div>
            <div className="form-group">
            <label>Name</label>
            <input value={name} onChange={e=>namechange(e.target.value)}  className=""></input>
            </div>
            <div className="form-group">
            <label>Email</label>
            <input required value={email} onChange={e=>emailchange(e.target.value)} className=""></input>
            </div>
            <button className="btn-save mt-20 btn" type="submit">save</button>
            </form>
          
            <div className="form-group">
       
            </div>
          
          
        </div>

        
        </>
    )
}

export default EditData;