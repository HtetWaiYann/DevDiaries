import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for patient table
const votpatientModel = (sequelize: any, Sequelize: any) => {
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


const votpatientTable: any = {};
votpatientTable.Sequelize = Sequelize;
votpatientTable.sequelize = sequelize;

//create model
votpatientTable.services = votpatientModel(sequelize, Sequelize);

module.exports = votpatientTable;
