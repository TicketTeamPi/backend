import User from '#models/user'
import { CreateData } from '#validators/user/create'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import EmailHelper from '../../helpers/email_helper.js'

export default class CreateService {
  private async createUser(
    data: CreateData,
    enterpriseId: number,
    password: string
  ): Promise<User> {
    return await User.create({
      fullName: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
      password: password,
      enterprise_id: enterpriseId,
    })
  }

  private async sendWelcomeEmail(user: User, password: string): Promise<void> {
    const htmlContent = EmailHelper.welcomeEmail(user.fullName!, password)

    await mail.send((message) => {
      message
        .to(user.email)
        .from('no-reply@ticket.com')
        .subject('Bem-vindo ao Nosso Sistema')
        .html(htmlContent)
    })
  }

  public async handle(data: CreateData, enterpriseId: number): Promise<void> {
    db.beginGlobalTransaction()

    try {
      const password = Math.random().toString(36).slice(-8)
      const user = await this.createUser(data, enterpriseId, password)

      await this.sendWelcomeEmail(user, password)

      await db.commitGlobalTransaction()
    } catch (error) {
      await db.rollbackGlobalTransaction()
      throw error
    }
  }
}
