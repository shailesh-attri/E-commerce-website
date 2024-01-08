export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
       
        options: {
          hotspot: true,
        }
      },
      {
        name:'tags',
        title:'Add Tags (Max. 3)',
        type:'array',
        of:[
            {
            name:'tagTitle',
            title:'Tag Title (Max. 3)',
            type:'string',
            },
        ],
      },
      { 
        name: 'category',
        title: 'Category Type',
        type: 'string',
      },
      { 
        name: 'star',
        title: 'Rating Star',
        type: 'string',
      },
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      
      { 
        name: 'price',
        title: 'Price',
        type: 'string',
      },
      { 
        name: 'oldPrice',
        title: 'Old Price',
        type: 'string',
      },
      { 
        name: 'desc',
        title: 'Description',
        type: 'string',
      },
      { 
        name: 'discount',
        title: 'Percentage discount',
        type: 'string',
      }
    ]
  }