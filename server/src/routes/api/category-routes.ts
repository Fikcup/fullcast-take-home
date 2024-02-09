// ext dependencies
import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

// int dependencies
import { validateChangeCategoryInput } from "../../types/validators";
import { ChangeCategoryInput } from "../../types/inputs";
import { Category } from "../../models/Category";
import { createCategory } from "../../services/categories/create";

const router = Router();

// /api/categories/create
router.route("/create")
    /**
     * Create new category
     * Creates empty note on category creation
     */
    .post(validateChangeCategoryInput, async (
        req: Request, res: Response
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: ChangeCategoryInput = req.body;

            // category creation request
            const category: Category = await createCategory(input);

            res.status(201).json(category);
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "Bad Request" });
        }
    });

export default router;