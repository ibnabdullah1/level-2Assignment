import { TProducts } from './products.interface'
import { Product } from './products.model'

const createProduct = async (studentData: TProducts) => {
  const result = await Product.create(studentData)
  return result
}
const getAllProducts = async () => {
  const result = await Product.find()
  return result
}

const getSingleProduct = async (filter: { _id: string }) => {
  const result = await Product.findOne(filter)
  return result
}

const updateSingleProduct = async (filter: { _id: string }, data: object) => {
  const result = await Product.findByIdAndUpdate(filter._id, data, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProduct = async (filter: { _id: string }) => {
  const result = await Product.deleteOne(filter)
  return result
}

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateSingleProduct,
}
