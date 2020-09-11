const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({
                name,
                email,
                password
            })
            res.status(200).json({
                msg: "register success",
                user: {
                  id: user.id,
                  name : user.name,
                  email: user.email
                }
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if(email && password) {
                const find = await User.findOne({
                    where : {
                        email : email.toLowerCase()
                    }
                })
                if(!find) throw { name: 'LOGIN_FAILED' };
                const comparePass = checkPassword(password, find.password);
                if(!comparePass) throw { name: 'LOGIN_FAILED' };
                else {
                    const payload = {
                        id : find.id,
                        email : find.email
                    }
                    const token = generateToken(payload);
                    res.status(200).json({
                        name : find.name,
                        email : find.email,
                        access_token : token
                    })
                }
            } else throw { name : 'FORM_INPUT_ERROR' }
        } catch (err) {
            next(err);
        }
    }

    static async googleSign (req, res, next) {
        try {
            const { id_token } = req.body
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload();
            const user = await User.findOne({
                where : {
                    email : payload.email
                }
            })
            if(user) {
                const access_token = generateToken({
                    id : user.id,
                    email : user.email
                })
                res.status(200).json({ 
                    name : payload.name,
                    email : payload.email,
                    access_token
                 })
            } else {
                const newUser = await User.create({
                    name : payload.name,
                    email : payload.email,
                    password : 'd391pbcr6jsci3pg4n19jho4h5usuk5m'
                })
                const access_token = generateToken({
                    id : newUser.id,
                    email : newUser.email
                })
                res.status(200).json({ 
                    name : payload.name,
                    email : payload.email,
                    access_token
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;