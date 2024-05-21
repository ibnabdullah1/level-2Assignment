import { TProducts } from './products.interface'
import { Product } from './products.model'

//  Create a new Product
const createProduct = async (studentData: TProducts) => {
  const result = await Product.create(studentData)
  return result
}

//  Search for products
const allProductsQuery = (searchTerm?: string) => {
  if (!searchTerm) {
    return Product.find()
  } else {
    return Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $in: [searchTerm] } },
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

export const ProductServices = {
  createProduct,
  //   getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateSingleProduct,
  allProductsQuery,
}
