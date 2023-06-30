"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for user table
const userCredentialModel = (sequelize, Sequelize) => {
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
const userCredentialTable = {};
userCredentialTable.Sequelize = sequelize_1.Sequelize;
userCredentialTable.sequelize = sequelize_2.default;
//create model
userCredentialTable.services = userCredentialModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = userCredentialTable;
