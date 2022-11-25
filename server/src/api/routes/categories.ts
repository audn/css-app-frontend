import { Router } from 'express';
import requireAdmin from '../../lib/middleware/requireAdmin';
import { allCategories } from '../controllers/categories/all';
import { addCategory } from '../controllers/categories/create';
import { removeCategory } from '../controllers/categories/delete';
import { editCategory } from '../controllers/categories/edit';

const categories = Router();

categories.get('/', allCategories);
categories.post('/', requireAdmin, addCategory);
categories.delete('/:value', requireAdmin, removeCategory);
categories.put('/:value', requireAdmin, editCategory);

export default categories;
