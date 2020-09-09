'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, { foreignKey : 'userId' });
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'name is required'
        },
        notEmpty : {
          args : true,
          msg : 'name is required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'email is required'
        },
        notEmpty : {
          args : true,
          msg : 'email is required'
        },
        isEmail : {
          args : true,
          msg : 'invalid email'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'password is required'
        },
        notEmpty : {
          args : true,
          msg : 'password is required'
        },
        minLength : (value) => {
          if(value.length < 6) throw new Error ('password minimum of 6 character')
        }
      }
    },
    organization: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'organization not found' 
        },
        isNot : (value) => {
          if(value !== 'Hacktiv8') throw new Error ('organization not found')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeValidate : (user, opt) => {
        user.organization = 'Hacktiv8';
      },
      beforeCreate : (user, opt) => {
        user.name = user.name.toLowerCase();
        user.email = user.email.toLowerCase();
        user.organization = 'Hacktiv8';
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};