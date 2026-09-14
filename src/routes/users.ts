import express from 'express'
import {
    fetchAllUsers,
    fetchUser,
    updateUser,
    deleteUser,
} from '../controllers/userController';

import { verifyToken } from '../middleware/verifyToken';

const router = express.Router()

router.get('/', verifyToken, fetchAllUsers);
router.get('/:id', verifyToken, fetchUser);
router.patch('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router
