import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config();

if(envFound.error){
    // This error will crash the whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    
    // Server run port
    port: process.env.PORT || 3000,
  
    // Mongodb database url
    databaseURL: process.env.MONGODB_URI || "",
  
    // jwt secret key and hash algorithms
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
  
    //winston logger
    logs: {
      level: process.env.LOG_LEVEL || 'silly',
    },
    
    // api config
    api: {
      prefix: '/api',
    },

    //MySql DB config
    HOST: "localhost",
    USER: "hwy",
    PASSWORD: "hwyislitt",
    DB: "devdiaries",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };