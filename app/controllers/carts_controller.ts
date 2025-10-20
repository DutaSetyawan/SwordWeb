import { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import Product from '#models/product'

export default class CartController {
  /**
   * Menampilkan isi keranjang belanja pengguna
   */
  async index({ view, auth }: HttpContext) {
    const user = auth.user!
    // Cari keranjang dulu
    let cart = await Cart.query()
                          .where('userId', user.id)
                          .preload('items', (itemsQuery) => {
                            itemsQuery.preload('product')
                          })
                          .first()

    // Jika TIDAK ADA keranjang, buat baru
    if (!cart) {
      cart = await Cart.create({ userId: user.id })
      // Setelah dibuat, kita perlu memuat relasi items (yang pasti masih kosong)
      await cart.load('items')
    }

    return view.render('pages/cart', { cart })
  }

  /**
   * Menambahkan produk ke keranjang
   */
  async store({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    const productId = request.input('product_id')

    const product = await Product.find(productId)
    if (!product) {
      session.flash({ error: 'Produk tidak ditemukan.' })
      return response.redirect('back')
    }

    let cart = await Cart.query().where('userId', user.id).first()

    if (!cart) {
      cart = await Cart.create({ userId: user.id })
    }

    const existingItem = await cart.related('items')
                                    .query()
                                    .where('productId', productId)
                                    .first()

    if (existingItem) {
      existingItem.quantity += 1
      await existingItem.save()
    } else {
      await cart.related('items').create({ productId: productId, quantity: 1 })
    }

    session.flash({ success: `${product.name} ditambahkan ke keranjang!` })
    return response.redirect().back()
  }
}