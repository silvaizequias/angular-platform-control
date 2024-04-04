'use server'

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { SendEmailType, SendSmsType } from './types'
import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER ?? ''

const ACCESS_KEY_ID = process.env.PLATFORM_AWS_ACCESS_KEY ?? ''
const SECRET_ACCESS_KEY = process.env.PLATFORM_AWS_PRIVATE_KEY ?? ''

export const sendEmail = async ({
  bbc,
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
        BccAddresses: [bbc || 'master@dedicado.digital'],
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

export const sendSms = ({ content, to }: SendSmsType) => {
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  try {
    return client.messages
      .create({ to: to, from: TWILIO_PHONE_NUMBER, body: content })
      .then(async (message: any) => {
        //console.log('TWILIO: ', message?.sid)
      })
      .catch((error: any) => {
        console.error('TWILIO ERROR: ', error?.status)
      })
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}
