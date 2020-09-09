const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let errors = [];

    switch(err.name) {
        case 'SequelizeValidationError' :
            statusCode = 400;
            err.errors.forEach(e => {
                errors.push(e.message);
            });
            break;
        case 'JsonWebTokenError' :
            statusCode = 401;
            errors.push('invalid access_token');
            break;
        case 'SequelizeUniqueConstraintError' :
            statusCode = 400;
            errors.push('please use different email');
            break;
        case 'AUTHENTICATION_FAILED' :
            statusCode = 401;
            errors.push('authentication failed');
            break;
        case 'AUTHORIZATION_FAILED' :
            statusCode = 401;
            errors.push('not authorized')
            break;
        case 'DATA_NOT_FOUND' :
            statusCode = 404;
            errors.push('task not found');
            break;
        case 'LOGIN_FAILED' :
            errors.push('invalid email or password');
            statusCode = 400;
            break;
        case 'FORM_INPUT_ERROR' :
            errors.push(`make sure all the required field is not empty`)
            statusCode = 400;
            break;
        default :
            console.log(err)
            console.log(err.name)
            errors.push('internal server error');
    }

    res.status(statusCode).json({ errors });
}

module.exports = errorHandler;