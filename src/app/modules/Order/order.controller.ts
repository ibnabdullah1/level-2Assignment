import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import OrderValidationSchema from './order.validation'
import { ProductServices } from '../Product/products.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body
    const zodParseOrderData = OrderValidationSchema.parse(order)
    const isProduct = await ProductServices.getSingleProductCheckOrder(
      order.productId,
    )

    if (!isProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    const orderQuantity = order?.quantity ?? 0
    const productQuantity = isProduct?.inventory?.quantity ?? 0
    const currentQuantity = productQuantity - orderQuantity

    if (productQuantity === 0) {
      await ProductServices.updateProductQuantity(order.productId, 0, false)
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }
    if (orderQuantity > productQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }

    const result = await OrderServices.createOrder(zodParseOrderData)
    await ProductServices.updateProductQuantity(
      order.productId,
      currentQuantity,
    )

    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err: unknown) {
    const error = err as Error
    return res.status(500).json({
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
