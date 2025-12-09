import react, { useState } from "react";
import '../../styles/EditProfile.css'

function EditProfile(){

    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    function save(){
        alert("Details saved");
    }

    return(
        <div className="main-edit" >

            <h2>Edit profile</h2>

            <div>
              <div>
                <label>Name</label><br/>
                <input onChange={(e)=>setname(e.target.value)} /><br/><br/>
              </div>

              <div>
                <label>Address</label><br/>
                <input onChange={(e)=>setaddress(e.target.value)} /><br/><br/>
              </div>
            </div>

            <div>
              <div>
                <label>Phone</label><br/>
                <input onChange={(e)=>setphone(e.target.value)} /><br/><br/>
              </div>

              <div>
                <label>Email</label><br/>
                <input onChange={(e)=>setemail(e.target.value)} /><br/><br/>
              </div>
            </div>

            <div>
              <div>
                <label> Old Password</label><br/>
                <input onChange={(e)=>setpassword(e.target.value)} /><br/><br/>
              </div>

              <div>
                <label> New Password</label><br/>
                <input onChange={(e)=>setpassword(e.target.value)} /><br/><br/>
              </div>
            </div>

            <button onClick={save}>Save</button>

        </div>
    );
}

export default EditProfile;
