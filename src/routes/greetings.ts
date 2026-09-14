import express from 'express'
import {greetingSpecific} from '../controllers/greetingController'
import { verifyToken } from '../middleware/verifyToken'
const router = express.Router()

router.get('/', verifyToken, greetingSpecific)

export default router