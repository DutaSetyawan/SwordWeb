import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import CartItem from '#models/cart_item'
import type { HasMany } from '@adonisjs/lucid/types/relations' 

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number 

  @column()
  declare imageUrl: string 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

 
  @hasMany(() => CartItem)
  declare cartItems: HasMany<typeof CartItem>
}