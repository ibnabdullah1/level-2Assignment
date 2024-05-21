import { Schema, model } from 'mongoose'
import {
  ProductModel,
  TInventory,
  TProducts,
  TVariant,
} from './products.interface'

const variantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
)

const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { _id: false },
)
const productSchema = new Schema<TProducts>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    variants: { type: [variantSchema], default: [] },
    inventory: { type: inventorySchema, required: true },
  },
  { versionKey: false },
)
export const Product = model<TProducts, ProductModel>('Products', productSchema)
