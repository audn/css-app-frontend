import { Router } from 'express';
import { allCategories } from '../controllers/categories/all';
import { addCategory } from '../controllers/categories/create';

const categories = Router();

categories.get('/', allCategories);
categories.post('/', addCategory);

export default categories;
