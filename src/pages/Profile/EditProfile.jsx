import React, { useState, useEffect } from "react";
import '../../styles/EditProfile.css'
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

function EditProfile() {
    const { user, updateUserContext } = useAuth();
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || user.name || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
        }
    }, [user]);

    const save = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            // The backend's updateUser method only accepts fullName, phone, and address 
            // for modification. It explicitly ignores email, username, and password changes.
            const payload = { ...user, fullName, phone, address };
            const res = await api.put(`/users/${user.id}`, payload);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            
            // Assume the backend responds with the updated entity, or fallback to the payload
            const serverData = res.data.data !== undefined ? res.data.data : res.data;
            const updatedData = { ...user, ...payload, ...(serverData && serverData.id ? serverData : {}) };
            
            if (updateUserContext) {
                updateUserContext(updatedData);
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="main-edit" style={{padding: '20px', background: 'white', borderRadius: '8px'}}>

            <h2 style={{marginBottom: '20px'}}>Edit Profile</h2>

            {message.text && (
                <div style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce3', color: message.type === 'error' ? '#991b1b' : '#166534' }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={save} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Full Name</label>
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e)=>setFullName(e.target.value)} 
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}
                  required
                />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Phone</label>
                <input 
                  type="text"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)} 
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}
                />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Address</label>
                <textarea 
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)} 
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', minHeight: '80px'}}
                />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Username (Cannot be changed)</label>
                <input 
                  type="text"
                  value={username}
                  disabled
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed'}}
                />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Email (Cannot be changed)</label>
                <input 
                  type="email"
                  value={email}
                  disabled
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed'}}
                />
              </div>

              <div style={{marginTop: '10px'}}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold'}}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>

        </div>
    );
}

export default EditProfile;
