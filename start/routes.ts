const AuthController = () => import('#controllers/api/auth_controller')
const SectorsController = () => import('#controllers/api/sectors_controller')
const UsersController = () => import('#controllers/api/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ResponsibleController = () => import('#controllers/api/tickets/responsibles_controller')
const TicketsController = () => import('#controllers/api/tickets_controller')
const ColumnsController = () => import('#controllers/api/columns_controller')

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.delete('/logout', [AuthController, 'logout'])
    router.get('/me', [AuthController, 'me'])

    router.get('/sectors', [SectorsController, 'index'])

    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id/password', [UsersController, 'updatePassword'])

    router.get('/tickets', [TicketsController, 'index'])
    router.get('/tickets/:id', [TicketsController, 'show'])
    router.post('/tickets', [TicketsController, 'create'])
    router.patch('/tickets/:id', [TicketsController, 'patch'])
    router.delete('/tickets/:id', [TicketsController, 'destroy'])

    router.get('/tickets/:id/responsible', [ResponsibleController, 'index'])
    router.put('/tickets/:id/responsible', [ResponsibleController, 'setResponsible'])
    router.put('/tickets/:id/status', [ResponsibleController, 'updateStatus'])
    router.put('/tickets/:id/priority', [ResponsibleController, 'updatePriority'])

    router.post('/columns', [ColumnsController, 'create'])
    router.get('/sectors/:sectorId', [ColumnsController, 'findAllBySectorId'])

    router
      .group(() => {
        router.post('/sectors', [SectorsController, 'create'])
        router.put('/sectors/:id', [SectorsController, 'update'])
        router.delete('/sectors/:id', [SectorsController, 'destroy'])

        router.post('/users', [UsersController, 'create'])
        router.put('/users/:id/sector', [UsersController, 'linkToSector'])
        router.delete('/users/:id', [UsersController, 'destroy'])
      })
      .use(middleware.adminOnly())
  })
  .use(middleware.auth())
