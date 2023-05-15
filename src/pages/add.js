
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddData = () => {
    const [id, ] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [formErrors, setFormErrors] = useState(false);
    const navigate = useNavigate();

    const handlenamechange = (e) =>{
        namechange(e.target.value)
    }
    const handleemailchange = (e) =>{
        emailchange(e.target.value)
    }
    const validateForm = () => {
        const errors = {
          name: name.trim() ? '' : 'Name is required',
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email address',
          
        };
    
        setFormErrors(errors);
    
        return Object.values(errors).every((error) => error === '');
      };
    

    const handlesubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
        const data = ({ name, email });

        fetch(`${process.env.REACT_APP_BASE_URL}/total-users`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((res) => {
                alert('saved successfully');
                navigate("/home");
            }).catch((err) => {
                console.log(err.message)
            })
        }

    }
    return (
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
                        <input value={name} 
                        // onChange={e => namechange(e.target.value)} 
                        onChange={handlenamechange}
                        className=""></input>
                    </div>
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                    <div className="form-group">
                        <label>Email</label>
                        <input  value={email} 
                        // onChange={e => emailchange(e.target.value)}
                        onChange={handleemailchange}
                         className=""></input>
                    </div>
                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                    <button className="btn-save mt-20 btn" type="submit">save</button>
                </form>
            </div>
        </>
    );

}
export default AddData