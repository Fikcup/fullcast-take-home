// ext dependencies
import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// int dependencies
import { FetchNoteInput, UpdateNoteInput } from "../../types/inputs";
import { Note } from "../../models/Note";
import { validateUpdateNoteInput } from "../../types/validators";
import { updateNote } from "../../services/notes/update";
import { fetchNote } from "../../services/notes/query/fetchOne";

const router = Router();

router.route("/")
    /**
     * Fetches note associated with a category
     */
    .get(async (
        req: Request, res: Response, next: NextFunction
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: FetchNoteInput = req.body;

            // fetch request
            const note: Note = await fetchNote(input);    

            res.status(201).json(note);
        } catch (err) {
            next(err);
        }
    });

// /api/notes/update
router.route("/update")
    /**
     * Updates an existing note
     */
    .patch(validateUpdateNoteInput, async (
        req: Request, res: Response, next: NextFunction
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
            next(err);
        }
    });

export default router;