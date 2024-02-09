// ext dependencies
import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

// int dependencies
import { ChangeNoteInput } from "../../types/inputs";
import { Note } from "../../models/Note";
import { validateChangeNoteInput } from "../../types/validators";

const router = Router();

router.route("/update")
    .put(validateChangeNoteInput, async (
        req: Request, res: Response
    ) => {
    try {
        // validates input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const input: ChangeNoteInput = req.body;

        // TODO: note update request
        
        // res.status(201).json(note);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
    }
    });

export default router;