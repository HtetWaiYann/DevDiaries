import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

const volunteerModel = (sequelize: any, Sequelize: any) => {
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


const volunteerTable: any = {};
volunteerTable.Sequelize = Sequelize;
volunteerTable.sequelize = sequelize;

//create model
volunteerTable.services = volunteerModel(sequelize, Sequelize);

module.exports = volunteerTable;
