import React from "react";
import '../../styles/Profile.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <div className="main-profile">Loading profile...</div>;
    }

    return (
        <div className="main-profile" style={{padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>

            <div className="pic" style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" style={{width: '80px', height: '80px', borderRadius: '50%'}} alt="Profile" />
                <h2>{user.name || user.username || 'User'}</h2>
            </div>

            <div className="table" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>

                <div className="row" style={{display: 'flex', gap: '20px'}}>
                    <p className="label" style={{fontWeight: 'bold', width: '100px'}}>Username</p>
                    <p className="value">{user.username}</p>
                </div>

                <div className="row" style={{display: 'flex', gap: '20px'}}>
                    <p className="label" style={{fontWeight: 'bold', width: '100px'}}>Email</p>
                    <p className="value">{user.email}</p>
                </div>

                <div className="row" style={{display: 'flex', gap: '20px'}}>
                    <p className="label" style={{fontWeight: 'bold', width: '100px'}}>Role</p>
                    <p className="value" style={{background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem'}}>{user.role || 'USER'}</p>
                </div>

            </div>

            <div className="button" style={{marginTop: '30px'}}>
                <button 
                  onClick={() => navigate('/account/edit-profile')}
                  style={{padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}
                >
                  Edit profile
                </button>
            </div>

        </div> 
    );
}

export default Profile;