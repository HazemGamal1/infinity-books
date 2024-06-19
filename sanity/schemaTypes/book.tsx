import { title } from "process";

export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'author',
            title: 'Author',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'previousPrice',
            title: 'Previous Price',
            type: 'number'
        },
        {
            name: 'id',
            title: 'ID',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{type: 'reference', to:[{type: 'category', title: 'Category'}]}]
        },
        {
            name: 'slug',
            type: 'slug',
            title: "Book Slug",
            options: {
                source: 'title'
            }
        },
        {
            name: 'isOnSale',
            title: 'Product On Sale?',
            type: 'boolean'
        }
    ]
}