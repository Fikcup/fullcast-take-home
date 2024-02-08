import express from "express";

import { knexConfig } from "./database/connection";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

// TODO: import any middleware

const port = process.env.PORT || 3000;

// Initializes DB connection and starts server
export const knex = require("knex")(knexConfig);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
