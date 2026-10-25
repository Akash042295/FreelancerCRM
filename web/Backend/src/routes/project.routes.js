import express from 'express';

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;