'use server'

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { SendEmailType } from './types'

const ACCESS_KEY_ID = process.env.PLATFORM_AWS_ACCESS_KEY ?? ''
const SECRET_ACCESS_KEY = process.env.PLATFORM_AWS_PRIVATE_KEY ?? ''

export const sendEmail = async ({
  body,
  from,
  subject,
  to,
}: SendEmailType): Promise<any> => {
  const sesClient = new SESClient({
    region: 'sa-east-1',
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  })

  try {
    const input = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `<p>${body}</p>`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: from || 'master@dedicado.digital',
    }

    const sendEmailCommand = new SendEmailCommand(input)

    return await sesClient
      .send(sendEmailCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error: any) => {
        console.log(error)
      })
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}
