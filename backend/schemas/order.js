export default {
    name: 'orders',
    title: 'Orders',
    type: 'document',
    fields: [
        {
            name: 'stripeId',
            title: 'Stripe Id',
            type: 'string',
        },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'productName', title: 'Product Name', type: 'string' },
                        { name: 'quantity', title: 'Quantity', type: 'number' },
                        // Add more fields as needed for each product attribute
                    ]
                }
            ]
        }
    ]
}
