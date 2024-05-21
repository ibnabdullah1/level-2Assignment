import { TOrder } from './order.interface'
import { Order } from './order.model'

//  Create a new Product
// const createOrder = async (OrderData: TOrder) => {
//   const result = await Order.create(OrderData)
//   return result
// }

const createOrder = async (order: TOrder) => {
  const newOrder = new Order(order)
  return await newOrder.save()
}

export const OrderServices = {
  createOrder,
}
