import express from 'express';
const router = express.Router();


import adminRoutes from  './adminRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import customerRoutes from  './customerRoutes.js';
import chatRoutes from './chatRoutes.js';

import pipelineRoutes from './pipelineRoutes.js';
import dealRoutes from './DealRoutes.js';
import quotationRoutes from './quotationRoutes.js';
import invoiceRoutes from './InvoiceRoutes.js';


//protected routes here add
import { protect, authorize } from '../middleware/authMiddleware.js';

router.use('/admin', protect, authorize('admin') ,adminRoutes);
router.use('/employee', protect, authorize('employee') ,employeeRoutes);
router.use('/customer', protect, authorize('customer'), customerRoutes);


router.use('/chat', protect, chatRoutes);
router.use('/pipeline', protect, authorize('admin', 'employee'), pipelineRoutes);
router.use('/deals', protect, authorize('admin', 'employee'), dealRoutes);
router.use('/quotations', protect, authorize('admin', 'employee'), quotationRoutes);
router.use('/invoices', protect, authorize('admin', 'employee'), invoiceRoutes);

export default router;