import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'primaryCategory',
      title: 'Primary Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alsoShowIn',
      title: 'Also Show In',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Old Price (Optional)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: ['New', 'Sale', 'Bestseller', 'Sold out'],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'details',
      title: 'Detail Fields',
      type: 'object',
      fields: [
        { name: 'fabric', title: 'Fabric', type: 'string' },
        { name: 'care', title: 'Care', type: 'string' },
        { name: 'fitNotes', title: 'Fit Notes', type: 'text' },
        { name: 'modelHeight', title: 'Model Height', type: 'string' },
        { name: 'sizeWorn', title: 'Size Worn', type: 'string' },
      ],
    }),
    defineField({
      name: 'colourVariants',
      title: 'Colour Variants',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least one colour variant'),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'colourName', title: 'Colour Name', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule) => Rule.min(1).error('Add at least one image per colour'),
            },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { 
                      name: 'sizeName', 
                      title: 'Size Name', 
                      type: 'string', 
                      options: {
                        list: [
                          { title: 'Clothing: XXS', value: 'XXS' },
                          { title: 'Clothing: XS', value: 'XS' },
                          { title: 'Clothing: S', value: 'S' },
                          { title: 'Clothing: M', value: 'M' },
                          { title: 'Clothing: L', value: 'L' },
                          { title: 'Clothing: XL', value: 'XL' },
                          { title: 'Clothing: XXL', value: 'XXL' },
                          { title: 'Clothing: 3XL', value: '3XL' },
                          { title: 'One Size', value: 'One Size' },
                          { title: 'Shoe: 36', value: '36' },
                          { title: 'Shoe: 37', value: '37' },
                          { title: 'Shoe: 38', value: '38' },
                          { title: 'Shoe: 39', value: '39' },
                          { title: 'Shoe: 40', value: '40' },
                          { title: 'Shoe: 41', value: '41' },
                          { title: 'Shoe: 42', value: '42' },
                          { title: 'Shoe: 43', value: '43' },
                          { title: 'Shoe: 44', value: '44' },
                          { title: 'Shoe: 45', value: '45' },
                          { title: 'Shoe: 46', value: '46' },
                        ]
                      },
                      validation: (Rule) => Rule.required() 
                    },
                    { name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'productVideo',
      title: 'Product Video (Optional)',
      type: 'file',
    }),
    defineField({
      name: 'manualSoldOut',
      title: 'Manual Sold-out Override',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredFlag',
      title: 'Featured Flag',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'sizeGuide',
      title: 'Size Guide',
      type: 'reference',
      to: [{ type: 'sizeGuide' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'primaryCategory.name',
      media: 'colourVariants.0.images.0',
    },
  },
})
