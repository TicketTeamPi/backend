import User from '#models/user'
import RegisterService from '#services/enterprise/register_service'
import { loginValidator } from '#validators/auth/login'
import { registerValidator } from '#validators/enterprise/register'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private registerService: RegisterService) {}

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const token = await this.registerService.handle(data)

    return response.ok(token)
  }

  async login({ request }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(data.email, data.password)

    return User.accessTokens.create(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.noContent()
  }

  async me({ auth, response }: HttpContext) {
    return response.ok({
      name: auth.user?.name,
      email: auth.user?.email,
      isAdmin: auth.user?.isAdmin,
    })
  }
}
