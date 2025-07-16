// db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DATABASE_URL 
} = process.env;
// if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
//   throw new Error('Missing required environment variables for database connection');
// }

// export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   port: Number(DB_PORT),
//   dialect: 'postgres',
//   logging: false,
// });
export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false, 
});

export const connectToDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};
