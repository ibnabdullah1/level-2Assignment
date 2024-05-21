import { Request, Response } from 'express'
import { ProductServices } from './products.service'
import ProductUpdateValidationSchema from './product.update.validation'

const createProducts = async (req: Request, res: Response) => {
  try {
    const products = await req.body
    const result = await ProductServices.createProduct(products)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts()

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    console.log(id)
    const result = await ProductServices.deleteProduct({ _id: id })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      })
    }
    res.status(200).json({
      success: true,
      message: 'Products deleted  successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await ProductServices.getSingleProduct({ _id: id })

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      })
    }
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

const updateSingleProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId
  const updateReqData = req.body

  const zodParseUpdateProductData =
    ProductUpdateValidationSchema.parse(updateReqData)
  const updatedProduct = await ProductServices.updateSingleProduct(
    { _id: productId },
    zodParseUpdateProductData,
  )
  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found!',
    })
  }
  res.status(200).json({
    success: true,
    message: 'Product updated successfully!',
    data: updatedProduct,
  })
}

export const ProductControllers = {
  createProducts,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateSingleProduct,
}
