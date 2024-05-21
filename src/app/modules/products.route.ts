import express from 'express'
import { ProductControllers } from './products.controller'
const router = express.Router()

//Create a new Product
router.post('/', ProductControllers.createProducts)
// Get a list of products
router.get('/', ProductControllers.getAllProducts)
// Get a single product
router.get('/:id', ProductControllers.getSingleProduct)
// Update a single product
router.put('/:productId', ProductControllers.updateSingleProduct)
// Delete a single product
router.delete('/:id', ProductControllers.deleteProduct)

export const StudentRoutes = router
