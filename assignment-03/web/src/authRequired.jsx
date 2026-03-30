import { Navigate } from "react-router-dom";

const authRequired = (Component) => {
    const AuthenticatedComponent = props => {
        const token = localStorage.getItem("token");

        if (!token) {
            return <Navigate to='/sign-up' />;
        }

        return <Component {...props}/>
    }

    return AuthenticatedComponent;
}

export default authRequired;
