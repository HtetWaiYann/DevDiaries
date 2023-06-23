import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: any }) => {
  // const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ DB loaded and connected!');

  const userCredentialModel = {
    name: 'userCredentialModel',
    model: require('../models/user_credentials')
  }
  
  const userModel = {
    name: 'userModel',
    model: require('../models/users'),
  };

  // create table
  userModel.model.sequelize.sync();

  // Set Containers for Dependency Injection
  await dependencyInjectorLoader({
    models: [
      userModel,
      userCredentialModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
