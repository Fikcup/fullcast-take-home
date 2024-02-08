/**
 * Connects client to MySQL DB instance
 * 
 * Locally, dotenv pulls secrets from .env file
 * In production, GitHub secrets or AWS SecretsManager would provide these fields
 */
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT 
            ? parseInt(process.env.DB_PORT) 
            : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
});