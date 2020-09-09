const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if(!access_token) throw { name : 'AUTHENTICATION_FAILED' }
        else {
            const decode = verifyToken(access_token);
            const find = await User.findOne({
                where : {
                    email : decode.email
                }
            })
            if(!find) throw { name : 'AUTHENTICATION_FAILED' }
            else {
                req.loggedInUser = decode;
                next();
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;