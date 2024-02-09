import express, { Request, Response, NextFunction } from "express";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

// TODO: import any middleware

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
