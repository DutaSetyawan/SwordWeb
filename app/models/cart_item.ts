import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Cart from '#models/cart'
import Product from '#models/product' // Kita akan buat model Product nanti
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cartId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>

  
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}