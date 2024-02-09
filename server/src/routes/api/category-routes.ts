// ext dependencies
import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// int dependencies
import { validateCreateCategoryInput, validateSoftDeleteCategoryInput, validateUpdateCategoryInput } from "../../types/validators";
import { CreateCategoryInput, SoftDeleteCategoryInput, UpdateCategoryInput } from "../../types/inputs";
import { Category } from "../../models/Category";
import { createCategory } from "../../services/categories/create";
import { updateCategory } from "../../services/categories/update";
import { softDeleteCategory } from "../../services/categories/delete";
import { fetchAllCategories } from "../../services/categories/query/fetchAll";
import { SortedCategory } from "../../types/transformers";

const router = Router();

// /api/categories
router.route("/")
    /**
     * Fetches all categories and orders them by p
     */
    .get(async(
        req: Request, res: Response, next: NextFunction
    ) => {
        try {
            // category fetch request
            const category: SortedCategory[] = await fetchAllCategories();

            res.status(201).json(category);
        } catch (err) {
            next(err);
        }
    });

// /api/categories/create
router.route("/create")
    /**
     * Create new category
     * Creates empty note on category creation
     */
    .post(validateCreateCategoryInput, async (
        req: Request, res: Response, next: NextFunction
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
            next(err);
        }
    });

// /api/categories/update
router.route("/update")
    /**
     * Updates existing category
     */
    .patch(validateUpdateCategoryInput, async (
        req: Request, res: Response, next: NextFunction
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: UpdateCategoryInput = req.body;

            // category update request
            const category: Category = await updateCategory(input);

            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    });

router.route("/delete")
    /**
     * Soft deletes existing category
     */
    .patch(validateSoftDeleteCategoryInput, async (
        req: Request, res: Response, next: NextFunction
    ) => {
        try {
            // validates input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const input: SoftDeleteCategoryInput = req.body;

            // category deletion request
            await softDeleteCategory(input);

            res.status(200).json({ message: "success" });
        } catch (err) {
            next(err);
        }
    });

export default router;