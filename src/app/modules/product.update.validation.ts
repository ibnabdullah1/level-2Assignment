import { z } from 'zod'

const VariantUpdateValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
})

const InventoryUpdateValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

const ProductUpdateValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number({ message: 'Price must be a non-negative number' }),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantUpdateValidationSchema),
  inventory: InventoryUpdateValidationSchema,
})

export default ProductUpdateValidationSchema
