const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "Access Denied, not a valid user" });
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: "Token is Invalid" });
    }
}

module.exports = auth;
