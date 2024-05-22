import { TProducts } from './products.interface'
import { Product } from './products.model'

//  Create a new Product
const createProduct = async (ProductData: TProducts) => {
  const result = await Product.create(ProductData)
  return result
}

//  Search for products
const allProductsQuery = (searchTerm?: string | undefined) => {
  if (!searchTerm) {
    return Product.find()
  } else {
    return Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    })
  }
}

// // Get a all products
// const getAllProducts = async () => {
//   const result = await Product.find()
//   return result
// }

// Get a single product
const getSingleProduct = async (filter: { _id: string }) => {
  const result = await Product.findOne(filter)
  return result
}
// Order product id checked
const getSingleProductCheckOrder = async (productId: string) => {
  return await Product.findById(productId)
}
// Single product update
const updateSingleProduct = async (filter: { _id: string }, data: object) => {
  const result = await Product.findByIdAndUpdate(filter._id, data, {
    new: true,
    runValidators: true,
  })
  return result
}

// Delete a single product from the DB
const deleteProduct = async (filter: { _id: string }) => {
  const result = await Product.deleteOne(filter)
  return result
}

const updateProductQuantity = async (
  productId: string,
  quantity: number,
  inStock?: boolean,
) => {
  return await Product.findByIdAndUpdate(
    productId,

    {
      $set: { 'inventory.quantity': quantity, 'inventory.inStock': inStock },
    },
    { new: true },
  )
}
export const ProductServices = {
  createProduct,
  getSingleProductCheckOrder,
  getSingleProduct,
  deleteProduct,
  updateSingleProduct,
  allProductsQuery,
  updateProductQuantity,
}
