import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'categories', title: 'Categories' },
    { name: 'products', title: 'Products' },
    { name: 'banners', title: 'Banners' },
    { name: 'extras', title: 'Extras' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroImageDesktop', title: 'Desktop Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'heroImageMobile', title: 'Mobile Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'heroHeading', title: 'Heading', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 2, group: 'hero' }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
      ],
    }),

    // Categories
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      description: 'Pick the categories to show as big tiles. If one has no products it is skipped automatically.',
      type: 'array',
      group: 'categories',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: (Rule) => Rule.required() }),
            defineField({ name: 'imageOverride', title: 'Image Override', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(4),
    }),

    // Products
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      description: 'Hand pick products for New arrivals. Leave empty to show the newest ones.',
      type: 'array',
      group: 'products',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({ name: 'newArrivalsTitle', title: 'Title above the products', type: 'string', group: 'products' }),

    // Banners
    defineField({
      name: 'extraBanners',
      title: 'Extra Banners',
      type: 'array',
      group: 'banners',
      of: [{ type: 'reference', to: [{ type: 'promoBanner' }] }],
    }),
    defineField({ name: 'shopByCategoryTitle', title: 'Title above the category tiles', type: 'string', group: 'banners' }),

    // Extras
    defineField({
      name: 'trustStrip',
      title: 'Trust Strip',
      type: 'array',
      group: 'extras',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Phone', value: 'phone' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Delivery', value: 'truck' },
                  { title: 'Exchange', value: 'swap' },
                  { title: 'Secure', value: 'shield' },
                  { title: 'Heart', value: 'heart' },
                  { title: 'Star', value: 'star' },
                ],
              },
            }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'brandStory',
      title: 'Brand Story',
      type: 'object',
      group: 'extras',
      fields: [
        defineField({ name: 'image', title: 'Image', type: 'image' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' }),
      ],
    }),
  ],
})
