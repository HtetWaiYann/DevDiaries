"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for patient table
const votpatientModel = (sequelize, Sequelize) => {
    const votpatients = sequelize.define('votpatients', {
        votpatientid: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        sex: {
            type: Sequelize.STRING,
        },
        township: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        regdate: {
            type: Sequelize.STRING,
        },
        serialNo: {
            type: Sequelize.STRING,
        },
        treatmentStartDate: {
            type: Sequelize.STRING,
        },
        vot: {
            type: Sequelize.BOOLEAN,
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.INTEGER
        }
    });
    return votpatients;
};
const votpatientTable = {};
votpatientTable.Sequelize = sequelize_1.Sequelize;
votpatientTable.sequelize = sequelize_2.default;
//create model
votpatientTable.services = votpatientModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = votpatientTable;
