import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import bannerImage from '../assets/images/home-bg.jpg';

function SignIn( ) {
	const navigate = useNavigate();

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (loginSuccess) {
            navigate("/tapes");
        }
    }, [loginSuccess]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/users/signin/", {
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
                if (response.status !== 200) {
                    alert(data.message);
                    return;
                }
                localStorage.setItem("token", data.token);
                setLoginSuccess(true);

            });
    };

    return (
        <main style={{ backgroundImage: `url(${bannerImage})` }} className='container full-width banner'>
            <div className='grid-container banner__content'>
                <div className='col-12'>
                    <div className='card card--w-padding'>
                        <h1 className='h1'>Sign In</h1>
                        <form className='form-group form--full' onSubmit={handleSubmit}>
                            <div>
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
                            <div>
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
                            <input type="submit" value="Sign In" className="button success"/>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;