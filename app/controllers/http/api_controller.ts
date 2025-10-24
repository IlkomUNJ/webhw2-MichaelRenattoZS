// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Wishlist from '#models/Wishlist'

export default class ApiController {
  async products({ response }: HttpContext) {
    const products = await Product.query().orderBy('id', 'asc')
    return response.json({ products })
  }

  async wishlist({ response }: HttpContext) {
    const wishlist = await Wishlist.query().orderBy('id', 'asc')
    return response.json({ wishlist })
  }

async addWishlist({ request, response }: HttpContext) {
  const { productId } = request.only(['productId'])
  const exists = await Wishlist.query().where('productId', productId).first()
  if (exists) return response.status(400).json({ message: 'Already wishlisted' })
  const item = await Wishlist.create({ productId })
  return response.json({ message: 'Added', item })
}


  async removeWishlist({ params, response }: HttpContext) {
    const item = await Wishlist.find(params.id)
    if (!item) return response.status(404).json({ error: 'Not found' })
    await item.delete()
    return response.json({ message: 'Removed from wishlist' })
  }

  async contact({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'message'])
    console.log('Contact received:', data)
    return response.json({ message: 'Thank you for contacting us!' })
  }
}
