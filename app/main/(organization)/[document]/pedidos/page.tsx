'use client'

import PageDisplay from '@/components/PageDisplay'
import { memo } from 'react'
import OrderView from './views/OrderView'
import { Metadata } from 'next'
import { useOrganization } from '../context'
import NotFoundPage from '@/app/not-found'
import OrdersMapView from './views/OrdersMapView'

const OrderPage = async () => {
  const { organization }: any = useOrganization()

  return !organization.status ? (
    <PageDisplay
      title={`pedidos da organização ${organization?.name || ''}`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <OrderView />
      <OrdersMapView />
    </PageDisplay>
  ) : (
    <NotFoundPage />
  )
}
export default memo(OrderPage)
