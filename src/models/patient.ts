import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for patient table
const patientModel = (sequelize: any, Sequelize: any) => {
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


const patientTable: any = {};
patientTable.Sequelize = Sequelize;
patientTable.sequelize = sequelize;

//create model
patientTable.services = patientModel(sequelize, Sequelize);

module.exports = patientTable;
