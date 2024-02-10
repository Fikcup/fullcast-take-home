// ext dependencies
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// int dependencies
import routes from "./routes";
import { CustomError } from "./types/errors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: CustomError, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ 
        error: {
            message: err.message,
            stack: err.stack
        } 
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
