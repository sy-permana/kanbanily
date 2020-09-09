'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey : 'userId' });
    }
  };
  Task.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'title is required'
        },
        notEmpty : {
          args : true,
          msg : 'title is required'
        }
      }
    },
    category: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'invalid category'
        },
        notEmpty : {
          args : true,
          msg : 'invalid category'
        },
        isNotOne : (value) => {
          const categories = ['backlog', 'todo', 'doing', 'done'];
          let flag = false;
          categories.forEach(i => {
            if (value === i) flag = true;
          })
          if(!flag) throw new Error ('invalid category');
        }
      }
    },
    userId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'invalid input'
        },
        notEmpty : {
          args : true,
          msg : 'invalid input'
        },
        isNumeric : {
          args : true,
          msg : 'invalid input'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    hooks : {
      beforeCreate : (task, opt) => {
        task.category = task.category.toLowerCase();
      }
    }
  });
  return Task;
};