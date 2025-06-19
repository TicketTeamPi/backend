const AuthController = () => import('#controllers/api/auth_controller')
const SectorsController = () => import('#controllers/api/sectors_controller')
const UsersController = () => import('#controllers/api/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.delete('/logout', [AuthController, 'logout'])
    router.get('/me', [AuthController, 'me'])

    router.get('/sectors', [SectorsController, 'index'])
    router.get('/sectors/:id', [SectorsController, 'show'])

    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.delete('/users/:id', [UsersController, 'destroy'])
    router.put('/users/:id/password', [UsersController, 'updatePassword'])

    router
      .group(() => {
        router.post('/sectors', [SectorsController, 'create'])
        router.put('/sectors/:id', [SectorsController, 'update'])
        router.delete('/sectors/:id', [SectorsController, 'destroy'])

        router.post('/users', [UsersController, 'create'])
        router.put('/users/:id/sector', [UsersController, 'linkToSector'])
      })
      .use(middleware.adminOnly())
  })
  .use(middleware.auth())
