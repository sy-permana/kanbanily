const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, checkPassword };