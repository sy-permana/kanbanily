const { Task, User } = require('../models');

class TaskController {
    static async getAll(req, res, next) {
        try {
            const organization = 'Hacktiv8'
            const findAll = await Task.findAll({
                attributes : [ 'id', 'title', 'category', 'createdAt' ],
                include : {
                    model : User,
                    attributes : [ 'id', 'name', 'email', 'organization' ],
                    where : {
                        organization
                    }
                }
            })
            res.status(200).json({
                msg : 'fetching success',
                organization,
                tasks : findAll
            });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { title } = req.body;
            const user = req.loggedInUser;
            const { category } = req.params;
            const newTask = await Task.create({
                title,
                category,
                userId : user.id
            })
            res.status(201).json({
                msg : 'created successfully',
                task : {
                    title : newTask.title,
                    category : newTask.category,
                    user : user.email
                }
            })
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { title, category } = req.body;
            const { id } = req.params;
            if(!title || !category) throw { name : 'FORM_INPUT_ERROR' }
            const task = await Task.update({
                title,
                category
            },{
                where : {
                    id
                },
                returning : true
            })
            res.status(200).json({
                msg : 'edit success',
                task : {
                    title : task[1][0].title,
                    category : task[1][0].category
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { id, category } = req.params;
            const task = await Task.update({
                category
            },{
                where : {
                    id
                },
                returning : true
            })
            res.status(200).json({
                msg : 'change category success',
                task : {
                    title : task[1][0].title,
                    category : task[1][0].category
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const task = await Task.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'delete success',
                task : {
                    title : req.askedTask.title,
                    category : req.askedTask.category
                }
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TaskController;