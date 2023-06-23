import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for user table
const userModel = (sequelize: any, Sequelize: any) => {
  const users = sequelize.define('users', {
    userid: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    profile_image: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.TEXT,
    },
  });

  return users;
};


const userTable: any = {};
userTable.Sequelize = Sequelize;
userTable.sequelize = sequelize;

//create model
userTable.services = userModel(sequelize, Sequelize);

module.exports = userTable;
