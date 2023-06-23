import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for user table
const userCredentialModel = (sequelize: any, Sequelize: any) => {
  const users = sequelize.define('user_credentials', {
    userid: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return users;
};

const userCredentialTable: any = {};
userCredentialTable.Sequelize = Sequelize;
userCredentialTable.sequelize = sequelize;

//create model
userCredentialTable.services = userCredentialModel(sequelize, Sequelize);

module.exports = userCredentialTable;
