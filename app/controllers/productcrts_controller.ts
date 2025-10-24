import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductController {
  public async index({ response }: HttpContext) {
    const products = await Product.query().orderBy('id', 'asc')
    return response.json({ products })
  }

  public async show({ params, response }: HttpContext) {
    const product = await Product.find(params.id)
    if (!product) return response.status(404).json({ error: 'Product not found' })
    return response.json(product)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price', 'image'])
    const product = await Product.create(data)
    return response.status(201).json({ message: 'Product added', product })
  }

  public async destroy({ params, response }: HttpContext) {
    const product = await Product.find(params.id)
    if (!product) return response.status(404).json({ error: 'Product not found' })
    await product.delete()
    return response.json({ message: 'Product deleted' })
  }
}
