import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createValidator } from '#validators/user/create'
import { inject } from '@adonisjs/core'
import CreateService from '#services/user/create_service'
import Sector from '#models/sector'

@inject()
export default class UsersController {
  constructor(private createService: CreateService) {}

  async index({ auth, response }: HttpContext) {
    const enterpriseId = auth.user!.enterprise_id!

    const users = await User.query().where('enterprise_id', enterpriseId)

    return response.ok({
      data: users.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })),
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const enterpriseId = auth.user!.enterprise_id!
    const user = await User.query()
      .where('id', params.id)
      .where('enterprise_id', enterpriseId)
      .firstOrFail()

    return response.ok({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    })
  }

  async create({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(createValidator)

    const enterpriseId = auth.user?.enterprise_id!

    await this.createService.handle(data, enterpriseId)

    return response.noContent()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const enterpriseId = auth.user!.enterprise_id!
    const user = await User.query()
      .where('id', params.id)
      .where('enterprise_id', enterpriseId)
      .firstOrFail()

    if (user.id === auth.user!.id) {
      return response.forbidden({ message: 'You cannot delete your own account.' })
    }

    await user.delete()

    return response.noContent()
  }

  async updatePassword({ auth, request, response }: HttpContext) {
    const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])

    const user = auth.user!

    if (!(await user.verifyPassword(currentPassword))) {
      return response.badRequest({ message: 'Current password is incorrect.' })
    }

    user.password = newPassword
    await user.save()

    return response.noContent()
  }

  async linkToSector({ auth, params, request, response }: HttpContext) {
    const enterpriseId = auth.user!.enterprise_id!
    const user = await User.query()
      .where('id', params.id)
      .where('enterprise_id', enterpriseId)
      .firstOrFail()
    const sector = await Sector.query()
      .where('id', request.input('sectorId'))
      .where('enterprise_id', enterpriseId)
      .firstOrFail()

    await user.related('sector').associate(sector)

    return response.noContent()
  }
}
