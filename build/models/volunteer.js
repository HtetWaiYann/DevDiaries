"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const volunteerModel = (sequelize, Sequelize) => {
    const volunteers = sequelize.define('volunteers', {
        volunteerid: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        volunteer: {
            type: Sequelize.STRING,
        },
        helist: {
            type: Sequelize.STRING,
        },
        male: {
            type: Sequelize.INTEGER,
        },
        female: {
            type: Sequelize.INTEGER,
        }
    });
    return volunteers;
};
const volunteerTable = {};
volunteerTable.Sequelize = sequelize_1.Sequelize;
volunteerTable.sequelize = sequelize_2.default;
//create model
volunteerTable.services = volunteerModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = volunteerTable;
