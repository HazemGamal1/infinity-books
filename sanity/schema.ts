import { type SchemaTypeDefinition } from 'sanity'
import book from './schemaTypes/book'
import category from './schemaTypes/category'
import order from './schemaTypes/order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [book, category, order],
}
