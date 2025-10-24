// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Wishlist from '#models/Wishlist'
import Product from '#models/product'

export default class WishlistController {
  async index({ view }: HttpContext) {
    const wishlist = await Wishlist.all()
    return view.render('transaction', { wishlist })
  }

  async add({ request, response }: HttpContext) {
    const productId = request.input('product_id')
    const product = await Product.find(productId)

    if (product) {
      await Wishlist.create({
        productId: product.id,
        name: product.name,
        price: product.price,
      })
    }

    return response.redirect('/transaction')
  }

  async viewAll({ view }: HttpContext) {
    const wishlist = await Wishlist.all()
    return view.render('seller', { wishlist })
  }
}