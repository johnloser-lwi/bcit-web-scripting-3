const jwt = require("jsonwebtoken");

// read the secret from the environment variable set in .env
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    // get the authorization header from the request
    const authHeader = req.headers["authorization"];

    // extract the token from the header: "Beaver <token>" -> split by space and take the second part
    const token = authHeader && authHeader.split(" ")[1];

    // if no token was provided, deny access
    if (!token) {
        return res.status(401).json({message: "Access denied"});
    }

    // verify the token using the secret, attach the decoded user data to the request if valid
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Invalid or expired token!"})
        }

        // make the decoded token payload available to the next route handler
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
