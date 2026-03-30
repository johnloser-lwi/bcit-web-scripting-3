import { useState } from 'react';

function SignIn({ handleLogin }) {
    // track email and password input
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // send the login request to the api
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
            .then(response => response.json())
            .then(data => {
                // store the jwt token in localStorage so it can be sent with future requests
                localStorage.setItem('token', data.jwt);
                // notify the app that the user is now logged in
                handleLogin();
            });
    };

    return (
        <main className="container">
            <div className="auth-form">
                <h2>Sign In</h2>
                <form className="form-group" onSubmit={handleSubmit}>
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
                    <input type="submit" value="Sign In" className="button success" />
                </form>
                <p>Don't have an account? <a href="/sign-up">Register</a></p>
            </div>
        </main>
    );
}

export default SignIn;
