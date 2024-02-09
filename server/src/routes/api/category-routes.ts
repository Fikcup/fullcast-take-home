// ext dependencies
import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

// int dependencies
import { validateCreateCategoryInput, validateSoftDeleteCategoryInput, validateUpdateCategoryInput } from "../../types/validators";
import { CreateCategoryInput, SoftDeleteCategoryInput, UpdateCategoryInput } from "../../types/inputs";
import { Category } from "../../models/Category";
import { createCategory } from "../../services/categories/create";
import { updateCategory } from "../../services/categories/update";
import { softDeleteCategory } from "../../services/categories/delete";

const router = Router();

// /api/categories/create
router.route("/create")
    /**
     * Create new category
     * Creates empty note on category creation
     */
    .post(validateCreateCategoryInput, async (
        req: Request, res: Response
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: CreateCategoryInput = req.body;

            // category creation request
            const category: Category = await createCategory(input);

            res.status(201).json(category);
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "Bad Request" });
        }
    });

// /api/categories/update
router.route("/update")
    /**
     * Updates existing category
     */
    .patch(validateUpdateCategoryInput, async (
        req: Request, res: Response
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: UpdateCategoryInput = req.body;

            // category creation request
            const category: Category = await updateCategory(input);

            res.status(200).json(category);
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "Bad Request" });
        }
    });

router.route("/delete")
    .patch(validateSoftDeleteCategoryInput, async (
        req: Request, res: Response
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: SoftDeleteCategoryInput = req.body;

            // category creation request
            await softDeleteCategory(input);

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "Bad Request" });
        }
    });

export default router;