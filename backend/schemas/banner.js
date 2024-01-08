export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'product',
            title: 'Product',
            type: 'string',
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        { 
            name: 'desc',
            title: 'Description',
            type: 'string',
          },
        { 
            name: 'category',
            title: 'Category Type',
            type: 'string',
          },
        
        {
            name: 'price',
            title: 'Starting price',
            type: 'string',
        },
        { 
            name: 'oldPrice',
            title: 'Old Price',
            type: 'string',
          },
        
        {
            name: 'discount',
            title: 'Discount',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
    ],
  };