import { Schema, model } from 'mongoose'
import {
  ProductModel,
  TInventory,
  TProducts,
  TVariant,
} from './products.interface'

const variantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: [true, 'Type is required'] },
    value: { type: String, required: [true, 'Value is required'] },
  },
  { _id: false },
)

const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, default: true },
  },
  { _id: false },
)
const productSchema = new Schema<TProducts>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    tags: { type: [String], default: [] },
    variants: { type: [variantSchema], default: [] },
    inventory: {
      type: inventorySchema,
      required: [true, 'Inventory is required'],
    },
  },
  { versionKey: false },
)
export const Product = model<TProducts, ProductModel>('Products', productSchema)
