"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.sequelize = void 0;
// db.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE_URL } = process.env;
// if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
//   throw new Error('Missing required environment variables for database connection');
// }
// export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   port: Number(DB_PORT),
//   dialect: 'postgres',
//   logging: false,
// });
exports.sequelize = new sequelize_1.Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});
const connectToDatabase = async () => {
    try {
        await exports.sequelize.sync({ alter: true });
        await exports.sequelize.authenticate();
        console.log('✅ PostgreSQL connection established successfully.');
    }
    catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
