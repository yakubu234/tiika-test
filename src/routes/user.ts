
import express from 'express';
import { register, login } from '../controllers/user';

import { registerValidation } from '../request/register';
import { loginValidation } from '../request/login';
import { validate } from '../middleware/ValidatoreMiddleware';

const router = express.Router();

router.post('/register',validate(registerValidation),  register);
router.post('/login',validate(loginValidation), login);

export default router;
