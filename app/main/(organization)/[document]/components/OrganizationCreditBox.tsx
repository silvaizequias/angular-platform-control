'use client'

import { useOrganization } from '@/contexts/OrganizationContext'
import { SubscriptionType } from '@/types/organization'
import { useEffect, useState } from 'react'

interface Props {}

export default function OrganizationCreditBox(props: Props) {
  const {} = props

  const { subscription }: SubscriptionType | any = useOrganization()

  let creditCount: number = subscription?.credit
  let unlimitedCredit: boolean = subscription?.unlimited

  const [count, setCount] = useState<number>(creditCount)
  const [unlimited, setUnlimited] = useState<boolean>(unlimitedCredit)

  useEffect(() => {
    setCount(creditCount)
    setUnlimited(unlimitedCredit)
  }, [creditCount, subscription, unlimitedCredit])

  return subscription ? (
    <div className="relative bg-sky-800/60 p-4 rounded-md shadow-md">
      <div
        className={`absolute w-full rounded-t-md -m-4 ${
          count < 50 ? 'bg-red-400' : 'bg-sky-600'
        } text-center animate-bounce`}
      >
        <small
          className={`mx-auto text-xs text-slate-200 font-bold animate-pulse`}
        >
          adicione + créditos
        </small>
      </div>
      <div className="h-80 w-full flex flex-col justify-center items-center">
        <div className="mx-auto p-2">
          {!unlimited && (
            <span
              className={`text-8xl sm:text-6xl ${
                count < 50 ? 'text-red-400 animate-pulse' : 'text-slate-200'
              }`}
            >
              {count}
            </span>
          )}
        </div>
        <div className="mx-auto p-2">
          <h4 className="text-4xl sm:text-2xl text-center text-sky-200 dark:text-sky-400 shrink-0">
            {!unlimited
              ? `${
                  count == 1 ? 'crédito disponível' : 'créditos disponíveis'
                } para esta organização`
              : 'esta organização possui créditos ilimitados'}
          </h4>
        </div>
      </div>
    </div>
  ) : null
}
