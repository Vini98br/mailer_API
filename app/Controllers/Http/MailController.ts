import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';

const emailTypeMap = {
  budget: 'Orçamento',
  briefing: 'Briefing',
  satisfaction: 'Satisfação',
};

interface BodyType {
  template: string;
  data: {
    [key: string]: string
  };
  to: string;
  from: string;
  subject: string;
}

export default class MailController {
  async sendEmail({ request, response }: HttpContextContract) {
    const {
      template,
      data,
      to,
      from,
      subject
    } = request.post<BodyType>();
    try {
      if (!Object.keys(emailTypeMap).includes(template)) {
        response.status(400).send({
          code: 'E_WRONG_TEMPLATE',
          status: 400,
          message: "O template deve ser 'briefing', 'budget' ou 'satisfaction'",
        });
      }

      if (Object.keys(data).length === 0) {
        response.status(400).send({
          code: 'E_MISSING_INFORMATION',
          status: 400,
          message: 'É necessário informar os dados.',
        });
      }

      if (!to) {
        response.status(400).send({
          code: 'E_MISSING_INFORMATION',
          status: 400,
          message: 'É necessário informar o email de destino.',
        });
      }

      await Mail.send((message) => {
        message
          .from(from || 'Almeida Designer')
          .to(to)
          .subject(`[${emailTypeMap[template]}] ${subject || 'Novo email.'}`)
          .htmlView(`emails/default`, { data, title: emailTypeMap[template] });
      });
      response.status(200).send({ message: 'Email foi enviado com sucesso.' });
    } catch (error) {
      console.log(error);
      response.status(500).send({
        code: 'E_INTERNAL_ERROR',
        status: 500,
        message: 'Ocorreu um erro interno, tente novamente mais tarde.',
      });
    }
  }
}
