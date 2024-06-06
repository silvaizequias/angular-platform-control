import { Metadata } from 'next'
import { Fragment, ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'você está na melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'a dedicado oferece soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Fragment>{children}</Fragment>
}