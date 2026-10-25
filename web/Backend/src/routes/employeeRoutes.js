import express from 'express';
const router = express.Router();
import * as empCtrl from '../controllers/employee.controller.js';

router.get('/dashboard', empCtrl.getDashboard);


router.route('/leads')
.get(empCtrl.getLeads)
.post(empCtrl.createLead);

router.route('/lead/:id')
.put(empCtrl.updateLead);

router.route('/tasks')
.get(empCtrl.getTasks)
.post(empCtrl.createTask);

router.route('/task/:id')
.put(empCtrl.updateTask);


export default router;
