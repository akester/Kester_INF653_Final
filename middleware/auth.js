const jwt = require("jsonwebtoken");

const RequireUserAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        console.error('auth error: no token')
        return res.status(401).json({ message: "Authorization required." });
    }
    
    // Read the token out of the header
    const token = req.headers.authorization.split(' ')[1];

    //Authorization: 'Bearer TOKEN'
    if (!token) {
        console.error('auth error: no token')
        return res.status(401).json({ message: "Authorization required." });
    }

    //Decoding the token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken.role != 'user' && decodedToken.role != 'admin') {
        console.error('auth error: role does not match')
        return res.status(403).json({ message: "Unauthorized" });
    }

    next()
}

const RequireAdminAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        console.error('auth error: no token')
        return res.status(401).json({ message: "Authorization required." });
    }

    // Read the token out of the header
    const token = req.headers.authorization.split(' ')[1];

    //Authorization: 'Bearer TOKEN'
    if (!token) {
        console.error('auth error: no token')
        return res.status(401).json({ message: "Authorization required." });
    }

    //Decoding the token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken.role != 'admin') {
        console.error('auth error: role does not match')
        return res.status(403).json({ message: "Unauthorized" });
    }

    next()
}

module.exports = {
    RequireUserAuth,
    RequireAdminAuth,
}