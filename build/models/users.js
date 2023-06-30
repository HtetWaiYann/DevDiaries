"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for user table
const userModel = (sequelize, Sequelize) => {
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
const userTable = {};
userTable.Sequelize = sequelize_1.Sequelize;
userTable.sequelize = sequelize_2.default;
//create model
userTable.services = userModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = userTable;
