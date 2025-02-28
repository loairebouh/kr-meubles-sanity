import { SchemaTypeDefinition } from 'sanity'

const Product: SchemaTypeDefinition = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
      }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          title: 'Base Price',
          validation: Rule => Rule.required().min(0)
        },
        {
          name: 'discountPercentage',
          type: 'number',
          title: 'Discount Percentage',
          validation: Rule => Rule.min(0).max(100)
        }
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      description: 'description',
      price: 'price.basePrice',
      discount: 'price.discountPercentage',
      media: 'images.0.asset',
      category: 'category.title'
    },
    prepare(selection) {
      const { title, description, price, discount, media, category } = selection
      return {
        title: title,
        subtitle: `${category ? category + ' | ' : ''}${price} DZD (${discount}% OFF)`,
        subtitle2: description,
        media: media,
      }
    }
  }
}

export default Product
