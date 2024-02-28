const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User")
async function auth(req, res, next) {
    try {
        const token = req.headers["token"];
        console.log("Received token:", token);
        const decodedToken = await jwt.verify(token, process.env.Jwt_SECRETKEY);
        const {_id } = decodedToken;
        if (_id){
            req.userId =_id;
            next();
        } else {
            res.status(401).send("Not authorized. Please log in to access this resource.");
        }
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).send({ error: "Authentication failed. Please try again." });
    }
}

module.exports = auth;
