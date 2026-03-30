import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    // track all form fields in a single state object
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate passwords match on the client before sending to the server
        if (formData.password !== formData.confirmPassword) {
            alert("Password do not match");
            return;
        }

        // send the registration request to the api
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

                // if registration failed, show the error message from the server
                if (response.status !== 201) {
                    alert(data.message);
                    return;
                }

                // registration successful, redirect to sign in
                navigate("/sign-in");
            });
    };

    return (
        <main className="container">
            <div className="auth-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit} className="form-group">
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
                    <div>
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
                    <input type="submit" value="Register" className="button success" />
                </form>
                <p>Already have an account? <a href="/sign-in">Sign In</a></p>
            </div>
        </main>
    );
}

export default SignUp;
