import { Request, Response } from 'express'
import { ProductServices } from './products.service'
import ProductUpdateValidationSchema from './product.update.validation'

const createProducts = async (req: Request, res: Response) => {
  try {
    const products = await req.body
    const zodParseProductData = ProductUpdateValidationSchema.parse(products)
    const result = await ProductServices.createProduct(zodParseProductData)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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
const searchProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query
  const products = await ProductServices.allProductsQuery(searchTerm as string)
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: searchTerm
        ? `No products found matching search term '${searchTerm}'`
        : 'No products found',
      data: [],
    })
  }
  res.status(200).json({
    success: true,
    message: searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'All products fetched successfully!',
    data: products,
  })
}

// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await ProductServices.allProductsQuery()

//     res.status(200).json({
//       success: true,
//       message: 'Products fetched successfully!',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     })
//   }
// }
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
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
  } catch (err: unknown) {
    const error = err as Error
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
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
  } catch (err: unknown) {
    const error = err as Error
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
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
  deleteProduct,
  getSingleProduct,
  updateSingleProduct,
  searchProducts,
}
