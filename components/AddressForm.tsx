'use client'

import { getAddressByZipCode, updateAddress } from '@/utils/handle-address'
import {
  AddressTypeByZipCode,
  UpdateAddressType,
} from '@/utils/handle-address/types'
import { AddressValidation, AddressValidationType } from '@/validations/address'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AddressForm(data: UpdateAddressType) {
  const { address, entity, id } = data
  const [isPending, startTransition] = useTransition()

  const handleZipCode = (event: { target: { value: any } }) => {
    const data = event.target.value?.replace(/[^0-9]/g, '')
    if (data.length == 8) {
      startTransition(async () => {
        const { cep, address, lat, lng }: AddressTypeByZipCode | any =
          await getAddressByZipCode(data)

        if (cep) {
          setValue('street', address)
          setValue('latitude', lat)
          setValue('longitude', lng)
        } else {
          toast.error(`cep ${data} inválido`)
        }
      })
    } else {
      toast.error(`este cep ${data} é inválido`)
    }
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AddressValidationType>({
    resolver: zodResolver(AddressValidation),
    defaultValues: {
      zipCode: address?.zipCode,
      street: address?.street,
      complement: address?.complement,
      latitude: address?.latitude,
      longitude: address?.longitude,
    },
  })

  const onSubmit: SubmitHandler<AddressValidationType> = async (inputs) => {
    try {
      const result = await updateAddress({
        address: inputs,
        entity: entity,
        id: id,
      })
      if (result?.error) {
        toast.error(result?.message)
      } else {
        toast.success(result)
      }
    } catch (error: any) {
      toast.success(error?.message || 'ocorreu um erro inesperado')
    }
  }

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full sm:w-1/4">
          <label htmlFor="zipCode">cep</label>
          <input
            className="w-full rounded-md"
            {...register('zipCode')}
            type="number"
            onBlur={handleZipCode}
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.zipCode?.message}
            </span>
          )}
        </div>
        <div className="relative w-full sm:w-3/4">
          <label htmlFor="street">logradouro</label>
          <input
            id="street"
            className="w-full rounded-md bg-slate-200/50 border-0"
            {...register('street')}
            type="text"
            disabled
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.street?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <label htmlFor="complement">complemento</label>
          <input
            id="complement"
            className="w-full rounded-md"
            {...register('complement')}
            type="text"
          />
          {errors && (
            <span className="text-xs text-red-400 italic lowercase">
              {errors?.complement?.message}
            </span>
          )}
        </div>
      </div>
      <button
        className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="submit"
      >
        atualizar endereço
      </button>
    </form>
  )
}