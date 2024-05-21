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
const getAllOrder = async (email?: string) => {
  const filter = email ? { email } : {}
  const result = await Order.find(filter)
  return result
}

export const OrderServices = {
  createOrder,
  getAllOrder,
}
