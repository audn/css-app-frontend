import { Router } from 'express';
import { allLibraries } from '../controllers/library/all';
import { addLibrary } from '../controllers/library/create';
import { removeLibrary } from '../controllers/library/delete';
import { editLibrary } from '../controllers/library/edit';

const library = Router();

library.post('/', addLibrary);
library.get('/', allLibraries);
library.delete('/:value', removeLibrary);
library.put('/:value', editLibrary);

export default library;
