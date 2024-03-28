'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ATTACHMENT_REPOSITORY } from '..'
import {
  UpdateAttachmentValidation,
  UpdateAttachmentValidationType,
} from '@/validations/attachment'

export const attachmentRepositoryUpdate = async (
  id: string,
  inputs: UpdateAttachmentValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''
  const authorizationKey = session?.user?.authorizationKey ?? ''

  try {
    if (await UpdateAttachmentValidation.parseAsync(inputs)) {
      const data = await fetch(`${ATTACHMENT_REPOSITORY}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}