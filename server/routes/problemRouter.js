import * as problem from '../controllers/problemController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const problemRouter = express.Router();

//categories for problems
problemRouter.get('/get_categories', problem.getCategories);
problemRouter.put('/edit_categories/', tokenChecker.loginCheck, tokenChecker.adminCheck, problem.editCategories);
problemRouter.put('/edit_category', tokenChecker.loginCheck, tokenChecker.adminCheck, problem.editCategoryName, problem.editCategories);
problemRouter.delete('/delete_category', tokenChecker.loginCheck, tokenChecker.adminCheck, problem.deleteCategory, problem.editCategories);

//problems
problemRouter.get('/get_problem', problem.getProblemList);
problemRouter.get('/get_problem/:id', problem.getProblem);
problemRouter.post('/get_problem', tokenChecker.loginCheck, tokenChecker.adminCheck, problem.createProblem);
problemRouter.delete('/get_problem/:id', tokenChecker.loginCheck, tokenChecker.adminCheck, problem.removeProblem);
problemRouter.put('/get_problem/:id', tokenChecker.loginCheck, tokenChecker.adminCheck, problem.updateProblem);

export default problemRouter;