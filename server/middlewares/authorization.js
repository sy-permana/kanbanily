const { Task } = require('../models');

const authorization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.loggedInUser.id;
        const task = await Task.findOne({
            where : {
                id
            }
        })
        if(!task) 
            throw { name : 'DATA_NOT_FOUND' }
        else if(task.userId === userId) {
            req.askedTask = {
                title : task.title,
                category : task.category
            }
            next();
        }
        else
            throw { name : 'AUTHORIZATION_FAILED' }
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;