"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for patient table
const patientModel = (sequelize, Sequelize) => {
    const patients = sequelize.define('patients', {
        patientid: {
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
        referDate: {
            type: Sequelize.STRING,
        },
        township: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        referFrom: {
            type: Sequelize.STRING,
        },
        referTo: {
            type: Sequelize.STRING,
        },
        signAndSymptom: {
            type: Sequelize.STRING,
        },
    });
    return patients;
};
const patientTable = {};
patientTable.Sequelize = sequelize_1.Sequelize;
patientTable.sequelize = sequelize_2.default;
//create model
patientTable.services = patientModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = patientTable;
