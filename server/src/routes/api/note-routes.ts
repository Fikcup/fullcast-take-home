// ext dependencies
import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

// int dependencies
import { UpdateNoteInput } from "../../types/inputs";
import { Note } from "../../models/Note";
import { validateUpdateNoteInput } from "../../types/validators";
import { updateNote } from "../../services/notes/update";

const router = Router();

// /api/notes/update
router.route("/update")
    .patch(validateUpdateNoteInput, async (
        req: Request, res: Response
    ) => {
    try {
        // validates input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const input: UpdateNoteInput = req.body;

        // note update request
        const note: Note = await updateNote(input);    

        res.status(201).json(note);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
    }
    });

export default router;