import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'colours', title: 'Colours and photos' },
    { name: 'description', title: 'Description' },
    { name: 'advanced', title: 'Advanced' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCategory',
      title: 'Category',
      description: 'Pick the most specific one, for example Sandals. If it does not exist yet, use the Create new option in this box.',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'basics',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const category = await client.fetch('*[_id == $id][0]', { id: value._ref })
          if (category && !category.parent) {
            return 'This is a main section. Pick a more specific category if you can.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'price',
      title: 'Price (KSh)',
      type: 'number',
      group: 'basics',
    }),
    defineField({
      name: 'oldPrice',
      title: 'Old price (KSh, optional)',
      description: 'Fill this in to show the item as on sale. It must be higher than the price.',
      type: 'number',
      group: 'basics',
    }),
    defineField({
      name: 'sizeType',
      title: 'What kind of sizes?',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'Clothing sizes', value: 'clothing' },
          { title: 'Shoe sizes', value: 'shoes' },
          { title: 'One size', value: 'oneSize' },
        ],
        layout: 'radio',
      },
      initialValue: 'clothing',
    }),
    defineField({
      name: 'clothingSizes',
      title: 'Sizes you sell',
      description: 'Tick every size you stock. You only do this once for the product, not for each colour.',
      type: 'array',
      group: 'basics',
      of: [{ type: 'string' }],
      options: {
        list: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        layout: 'grid',
      },
      hidden: ({ document }) => document?.sizeType !== 'clothing',
    }),
    defineField({
      name: 'shoeSizes',
      title: 'Sizes you sell',
      description: 'Tick every size you stock. You only do this once for the product, not for each colour.',
      type: 'array',
      group: 'basics',
      of: [{ type: 'string' }],
      options: {
        list: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
        layout: 'grid',
      },
      hidden: ({ document }) => document?.sizeType !== 'shoes',
    }),
    defineField({
      name: 'badge',
      title: 'Label on the photo',
      description: 'New and Sale labels appear automatically. You do not need to set them.',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Bestseller', value: 'bestseller' },
          { title: 'Limited stock', value: 'limited' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'manualSoldOut',
      title: 'Mark the whole product as sold out',
      type: 'boolean',
      group: 'basics',
      initialValue: false,
    }),
    
    // Colours group
    defineField({
      name: 'colourVariants',
      title: 'Colours',
      description: 'Add one entry per colour. Each colour has its own photos.',
      type: 'array',
      group: 'colours',
      of: [{ type: 'colourVariant' }],
    }),

    // Description group
    defineField({
      name: 'shortDescription',
      title: 'One-line summary',
      description: 'Shown under the photo on product cards.',
      type: 'text',
      rows: 2,
      group: 'description',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full description',
      type: 'array',
      group: 'description',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [{ title: 'Bullet', value: 'bullet' }] }],
    }),
    defineField({
      name: 'details',
      title: 'Product details (optional)',
      type: 'object',
      group: 'description',
      options: { collapsible: true },
      fields: [
        defineField({ name: 'fabric', title: 'Fabric', type: 'string' }),
        defineField({ name: 'care', title: 'Care', type: 'string' }),
        defineField({
          name: 'modelInfo',
          title: 'Model info',
          description: 'Example: Model is 170 cm and wears size M.',
          type: 'string',
        }),
      ],
    }),

    // Advanced group
    defineField({
      name: 'slug',
      title: 'Web address',
      description: 'Fills in by itself from the name.',
      type: 'slug',
      group: 'advanced',
      options: { source: 'name' },
    }),
    defineField({
      name: 'alsoShowIn',
      title: 'Also show in (optional)',
      description: 'Use this if the product belongs in a second place, for example a prayer dress under Women and Prayer and Hajj.',
      type: 'array',
      group: 'advanced',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'productVideo',
      title: 'Video (optional)',
      type: 'file',
      group: 'advanced',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'sizeGuideOverride',
      title: 'Use a different size guide (optional)',
      description: 'Leave empty. The size guide is chosen automatically from the category.',
      type: 'reference',
      to: [{ type: 'sizeGuide' }],
      group: 'advanced',
    }),
    defineField({
      name: 'hideFromWebsite',
      title: 'Hide from website',
      description: 'Hides the product without deleting it.',
      type: 'boolean',
      group: 'advanced',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'advanced',
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
