/**
 * Config source: https://git.io/JvgAf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { MailConfig } from '@ioc:Adonis/Addons/Mail'

const mailConfig: MailConfig = {
  /*
  |--------------------------------------------------------------------------
  | Default mailer
  |--------------------------------------------------------------------------
  |
  | The following mailer will be used to send emails, when you don't specify
  | a mailer
  |
  */
  mailer: 'mailgun',

  /*
  |--------------------------------------------------------------------------
  | Mailers
  |--------------------------------------------------------------------------
  |
  | You can define or more mailers to send emails from your application. A
  | single `driver` can be used to define multiple mailers with different
  | config.
  |
  | For example: Postmark driver can be used to have different mailers for
  | sending transactional and promotional emails
  |
  */
  mailers: {
    /*
    |--------------------------------------------------------------------------
    | Smtp
    |--------------------------------------------------------------------------
    |
    | Uses SMTP protocol for sending email
    |
    */
    // smtp: {
    //   driver: 'smtp',
    //   host: Env.get('SMTP_HOST'),
    //   port: Env.get('SMTP_PORT'),
    //   secure: true,
    //   tls: {
    //     rejectUnauthorized: false
    //   },
		// 	auth: {
		// 		user: Env.get('SMTP_USERNAME'),
		// 		pass: Env.get('SMTP_PASSWORD'),
    //     type: 'login'
    //   }
    // }
    mailgun: {
      driver: 'mailgun',
      baseUrl: 'https://api.mailgun.net/v3/sandboxe48344346a3a4935b99fa95683b1cb3c.mailgun.org',
      key: Env.get('MAILGUN_API_KEY') as string,
    },

    /*
    |--------------------------------------------------------------------------
    | SES
    |--------------------------------------------------------------------------
    |
    | Uses Amazon SES for sending emails. You will have to install the aws-sdk
    | when using this driver.
    |
    | ```
    | npm i aws-sdk
    | ```
    |
    */

  },
}

export default mailConfig
