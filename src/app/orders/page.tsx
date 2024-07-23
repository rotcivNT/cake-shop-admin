import DefaultLayout from '@/components/Layouts/DefaultLayout'
import OrderList from '@/components/orders/OrderList'
import React from 'react'

export default function OrderPage() {
  return (
    <DefaultLayout>
      <OrderList />
    </DefaultLayout>
  )
}
