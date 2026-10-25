import express from 'express';
const router = express.Router();
import * as chatCtrl from '../controllers/chat.controller.js';


router.route('/')
.get(chatCtrl.getRecentChats);


router.route('/:userId')
.get(chatCtrl.getMessageHistory)
.post(chatCtrl.sendMessage);

export default router;