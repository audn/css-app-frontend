import { Router } from 'express';
import requireAdmin from '../../lib/middleware/requireAdmin';
import { allCategories } from '../controllers/categories/all';
import { addCategory } from '../controllers/categories/create';

const categories = Router();

categories.get('/', allCategories);
categories.post('/', requireAdmin, addCategory);

export default categories;
