import express from 'express';
const router = express.Router();
import * as customerCtrl from '../controllers/customer.controller.js';


router.get('/dashboard', customerCtrl.getDashboard);

//tasks GET, POST AND PUT
router.route('/tasks')
.get(customerCtrl.getTasks)
.post(customerCtrl.createTask);

router.route('/task/:id')
.put(customerCtrl.updateTask)


router.get('/profile', customerCtrl.getProfile);

router.put('/profile/:id', customerCtrl.updateProfile);

router.route('/leads')
.get(customerCtrl.getLeads)
.post(customerCtrl.createLead);

router.route('/lead/:id')
.put(customerCtrl.updateLead)
.delete(customerCtrl.deleteLead);

export default router;
