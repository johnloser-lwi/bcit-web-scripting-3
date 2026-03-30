import { Navigate } from "react-router-dom";

// higher-order component that wraps a page and redirects to sign-up if no token is found in localStorage
const authRequired = (Component) => {
    const AuthenticatedComponent = props => {
        const token = localStorage.getItem("token");

        // if there's no token the user is not logged in, send them to the sign-up page
        if (!token) {
            return <Navigate to='/sign-up' />;
        }

        // token exists, render the protected component as normal
        return <Component {...props}/>
    }

    return AuthenticatedComponent;
}

export default authRequired;
