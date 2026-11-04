const { Pool } = require('pg');
require('dotenv').config();


const isTest = process.env.NODE_ENV === 'test';

const config = process.env.DATABASE_URL && !isTest
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: isTest
            ? process.env.DB_NAME_TEST
            : process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };

const pool = new Pool(config);


module.exports = pool;