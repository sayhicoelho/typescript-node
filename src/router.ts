import { Router } from 'express'
import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'
import AuthMiddleware from './middlewares/AuthMiddleware'

const router = Router()

router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.post('/users/:id/mail', UserController.sendMail)

router.get('/me', AuthMiddleware, AuthController.getAuthUser)
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

export default router
