export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'customer',
            title: 'Customer',
            type: 'string',
            
        },
        {
            name: 'customerAddress',
            title: 'Customer Adddress',
            type: 'string',
            
        },
        {
            name: 'customerNumber',
            title: 'Customer Number',
            type: 'string'
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime'
        },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            // of : [{type: 'object'}],
            of: [{
                type: 'object',
                fields: [
                    {name:'product' , type: 'string'},
                    {name: 'quantity', type: 'number'},
                    {name: 'priceAtTime', type: 'number', title : 'Price at time of order'}
                ]
            }]
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string'
        },
        {
            name: 'total',
            title: "Total",
            type: "number"
        }
    ]
}