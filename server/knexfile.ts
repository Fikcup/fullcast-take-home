/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT 
            ? parseInt(process.env.DB_PORT) 
            : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    migrations: {
        directory: __dirname + "/src/database/migrations"
    },
    seeds: {
        directory: __dirname + "/src/database/seeds"
    }
  },
};
