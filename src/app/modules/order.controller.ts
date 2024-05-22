import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import { ProductServices } from './products.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body
    const product = await ProductServices.getSingleProductCheckOrder(
      order.productId,
    )
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }
    const orderQuantity = order?.quantity ?? 0
    const productQuantity = product?.inventory?.quantity ?? 0

    if (orderQuantity > productQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }
    // Create the order
    const result = await OrderServices.createOrder(order)

    // Update the product quantity
    await ProductServices.updateProductQuantity(order.productId, orderQuantity)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err: unknown) {
    const error = err as Error
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: err,
    })
  }
}
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined
    const orders = await OrderServices.getAllOrder(email)
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found',
      })
    }
    if (orders.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrder,
}
