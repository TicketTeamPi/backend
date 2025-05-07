import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.seuprovedor.com',
        port: 587,
        auth: {
          user: 'seu_email@dominio.com',
          pass: 'sua_senha',
        },
      },
      defaults: {
        from: '"Nome do Remetente" <seu_email@dominio.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
 // providers: [EmailService],
 //exports: [EmailService],
})
export class EmailModule {}
