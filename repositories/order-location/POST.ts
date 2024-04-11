'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ORDER_LOCATION_REPOSITORY } from '..'
import {
  OrderLocationValidation,
  OrderLocationValidationType,
} from '@/validations/order'

export const orderLocationRepositoryCreate = async (
  inputs: OrderLocationValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await OrderLocationValidation.parseAsync(inputs)) {
      return await fetch(`${ORDER_LOCATION_REPOSITORY}`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      }).then(async (data) => await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
