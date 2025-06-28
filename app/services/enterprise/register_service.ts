import Enterprise from '#models/enterprise'
import User from '#models/user'
import { RegisterData } from '#validators/enterprise/register'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import db from '@adonisjs/lucid/services/db'

export default class RegisterService {
  private async createEnterprise(data: RegisterData): Promise<Enterprise> {
    const enterprise = await Enterprise.create({
      name: data.name,
      cnpj: data.cnpj,
      phone: data.phone,
    })

    return enterprise
  }

  private async createUser(
    enterprise: Enterprise,
    data: RegisterData,
    sectorId: number
  ): Promise<User> {
    const user = await enterprise.related('users').create({
      name: data.userName,
      email: data.email,
      isAdmin: true,
      password: data.password,
      sector_id: sectorId,
    })

    return user
  }

  private async createSector(enterprise: Enterprise): Promise<number> {
    const sector = await enterprise.related('sectors').create({
      name: 'Adm',
    })

    return sector.id
  }

  public async handle(data: RegisterData): Promise<AccessToken> {
    await db.beginGlobalTransaction()

    try {
      const enterprise = await this.createEnterprise(data)

      const sectorId = await this.createSector(enterprise)

      const user = await this.createUser(enterprise, data, sectorId)

      await db.commitGlobalTransaction()

      return User.accessTokens.create(user)
    } catch (error) {
      db.rollbackGlobalTransaction()

      throw error
    }
  }
}
