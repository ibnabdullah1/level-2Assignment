import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import { ProductServices } from './products.service'

const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = req.body
    const product = await ProductServices.getSingleProductCheckOrder(
      order.productId,
    )

    if (product) {
      const result = await OrderServices.createOrder(order)
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

export const OrderControllers = {
  createOrder: createOrderController,
}
