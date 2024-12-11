const jwt = require('jsonwebtoken')

const Verifytoken = (req, res,next) => {
    try {
        var token = req.headers.authorization.split(" ")[1];
        console.log(token);

        const decoded = jwt.verify(token, 'secret')
        console.log(decoded)
        req.user = decoded
        next()
       

    } catch (error) {
        console.log(error);
    }
}


module.exports = Verifytoken