import { z } from 'zod'

const OrderValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export default OrderValidationSchema
