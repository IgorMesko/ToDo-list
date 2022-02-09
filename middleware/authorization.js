const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization;
        const token = authHeaders && authHeaders.split(' ')[1];
        
        if(token == null) {
            res.sendStatus(401);
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) {
                    throw new Error('нет доступа.');
                };
                req.user = user;
                next();
            });
        };
    } catch (error) {
        res.sendStatus(403);
    };
};

module.exports = authToken;