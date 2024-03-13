// import logger from './logger';

const { Sequelize } = require("sequelize");
import mysql2 from "mysql2";

import env from "../../../config/env";
import logger from "../helpers/logger";

const sequelize = new Sequelize(
  env.DATABASE_NAME, // "u877916646_groupApp",
  env.DATABASE_USER, // "u877916646_username",
  env.DATABASE_PASSWORD, // "grouppApp@12",
  {
    host: env.DATABASE_HOST, // "srv915.hstgr.io",
    port: env.DATABASE_PORT, // "3306",
    dialect: env.DATABASE_PROVIDER, // "mysql",
    dialectModule: mysql2,
    pool: {
      max: 100,
      min: 0,
      acquire: 1000000,
      idle: 100000,
      evict: 2000,
    },
    dialectOptions: {
      decimalNumbers: true,
    },
    retry: {
      match: [
        /etimedout/,
        /ehostunreach/,
        /econnreset/,
        /econnrefused/,
        /etimedout/,
        /esockettimedout/,
        /ehostunreach/,
        /epipe/,
        /eai_again/,
        /sequelizeconnectionerror/,
        /sequelizeconnectionrefusederror/,
        /sequelizehostnotfounderror/,
        /sequelizehostnotreachableerror/,
        /sequelizeinvalidconnectionerror/,
        /sequelizeconnectiontimedouterror/,
      ],
      max: 5,
    },
  }
);

const databaseConfig = `
  DATABASE_PROVIDER=${env.DATABASE_PROVIDER}
  DATABASE_HOST=${env.DATABASE_HOST}
  DATABASE_PORT=${env.DATABASE_PORT}
  DATABASE_NAME=${env.DATABASE_NAME}
  DATABASE_USER=${env.DATABASE_USER}
  DATABASE_PASSWORD=${env.DATABASE_PASSWORD}
`;

export const connect = async () => {
  logger.info(`\nConnexion à la base de donnée: ${databaseConfig}`);
  // try {
  return sequelize.authenticate();
  //   logger.info(`Connexion a la base de donnée. ${databaseConfig}`);
  // } catch (error) {
  //   logger.error(
  //     `Unable to connect to the database:
  //     ${databaseConfig}
  //     --------------------------------------
  //     ${error}
  //   `
  //   );
  // }
};

// module.exports = { sequelize, connect };
