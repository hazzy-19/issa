import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Where does this go?',
      type: 'string',
      options: {
        list: [
          { title: 'A category', value: 'category' },
          { title: 'A page', value: 'page' },
          { title: 'A product', value: 'product' },
          { title: 'All sale items', value: 'sale' },
          { title: 'All new items', value: 'new' },
          { title: 'Chat on WhatsApp', value: 'whatsapp' },
          { title: 'Another website', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'category',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      hidden: ({ parent }) => parent?.kind !== 'category',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.kind !== 'page',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      hidden: ({ parent }) => parent?.kind !== 'product',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.kind !== 'external',
    }),
  ],
  preview: {
    select: {
      kind: 'kind',
      category: 'category.name',
      page: 'page.title',
      product: 'product.name',
      url: 'externalUrl',
    },
    prepare(selection) {
      const { kind, category, page, product, url } = selection
      let subtitle = ''
      if (kind === 'category') subtitle = `category: ${category || 'Unknown'}`
      if (kind === 'page') subtitle = `page: ${page || 'Unknown'}`
      if (kind === 'product') subtitle = `product: ${product || 'Unknown'}`
      if (kind === 'sale') subtitle = 'all sale items'
      if (kind === 'new') subtitle = 'all new items'
      if (kind === 'whatsapp') subtitle = 'WhatsApp'
      if (kind === 'external') subtitle = `website: ${url || 'Unknown'}`

      return {
        title: `Goes to ${subtitle}`,
      }
    },
  },
})
