import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { env } from "process";

export type SendCredentialsEmailProps = {
    name: string,
    email: string,
    password: string,
}

@Injectable()
export class EmailService {
    constructor(
        private readonly _mailerService: MailerService,
        private readonly _configService: ConfigService,
    ){}

    async sendCredentials(props: SendCredentialsEmailProps) {
        this._mailerService.sendMail({
            from: this._configService.get<string>('MAIL_FROM'),
            subject: 'Suas credenciais do ticket',
            to: props.email,
            template: 'SendCredentialsEmail',
            context: {
                ...props,
            }
        })
    }
}