import mysql from 'mysql'
import config from '../config/config.js'
import knex from 'knex';

const connectDB = knex({
    client: 'mysql',
    connection: {
        host: config.MYSQL_IP,
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DB,
        insecureAuth : true
    },
    max: (process.env.DB_MAX_POOL)?parseInt(process.env.DB_MAX_POOL):50,
    min: 1
})

const DB_MIGRATION = () => { return ConnecDB.migrate.latest(); }


export { connectDB, DB_MIGRATION};