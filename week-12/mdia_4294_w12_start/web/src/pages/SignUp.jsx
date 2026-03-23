import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import bannerImage from '../assets/images/home-bg.jpg';

function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password do not match");
            return;
        }

        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.status !== 201) {
                    alert(data.message);
                    return;
                }

                navigate("/tapes");

            });
    };    

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className='container full-width banner'>
            <div className='grid-container banner__content'>
                <div className='col-12'>
                    <div className='card card--w-padding'>
                        <h1 className='h1'>Register</h1>
                        <form onSubmit={handleSubmit} className='form-group form--full'>
                            <div >
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    onChange={e => {
                                        setFormData({...formData, email: e.target.value})
                                    }}
                                />
                            </div>
                            <div >
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    onChange={e => {
                                        setFormData({...formData, password: e.target.value})
                                    }}
                                />
                            </div>
                            <div >
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    name="confirm-password" 
                                    onChange={e => {
                                        setFormData({...formData, confirmPassword: e.target.value})
                                    }}
                                />
                            </div>
                            <input type="submit" value="Register" className="button success"/>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp;