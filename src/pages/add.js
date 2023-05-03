
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddData = () => {
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        const data=({name,email});
      
        fetch("http://localhost:3000/total-users",{
            method:"POST",
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
        <h1 className="text-align">Add data </h1>
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
    );

}
export default AddData