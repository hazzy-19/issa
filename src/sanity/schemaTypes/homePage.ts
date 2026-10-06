import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'slides',
          title: 'Hero Slides',
          type: 'array',
          description: 'Add multiple images for the hero carousel',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                { name: 'mobileImage', title: 'Mobile Image (Optional)', type: 'image', options: { hotspot: true }, description: 'If set, this image is used on mobile instead' },
                { name: 'alt', title: 'Alt Text', type: 'string' },
              ],
            },
          ],
          validation: (Rule) => Rule.min(1).error('Add at least one hero slide'),
        },
        { name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'copy', title: 'Short Copy', type: 'text' },
        { name: 'buttonLabel', title: 'Button Label', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Featured Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
            { name: 'imageOverride', title: 'Image Override (Optional)', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'sectionTitles',
      title: 'Section Titles',
      type: 'object',
      fields: [
        { name: 'shopByCategory', title: 'Shop By Category Title', type: 'string', initialValue: 'Shop by category' },
        { name: 'newArrivals', title: 'New Arrivals Title', type: 'string', initialValue: 'New arrivals' },
      ],
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      description: 'Hand-pick products to feature, or leave empty to auto-select latest',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'trustStrip',
      title: 'Trust Strip Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (String/Name)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'text', title: 'Text', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'extraBanners',
      title: 'Extra Banners',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'promoBanner' }] }],
    }),
    defineField({
      name: 'brandStory',
      title: 'Brand Story Block (Optional)',
      type: 'object',
      fields: [
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'text', title: 'Text', type: 'text' },
      ],
    }),
  ],
})
