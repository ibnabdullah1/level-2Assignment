import { Model } from 'mongoose'

export interface TOrder {
  email: string
  productId: string
  price: number
  quantity: number
}
export type OrderModel = Model<TOrder>
