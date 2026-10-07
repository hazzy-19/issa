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
        { name: 'imageDesktop', title: 'Desktop Background Image', type: 'image', options: { hotspot: true } },
        { name: 'imageMobile', title: 'Mobile Background Image (Optional)', type: 'image', options: { hotspot: true }, description: 'Used on small screens' },
        { name: 'heading', title: 'Heading Text', type: 'string', initialValue: 'Intro to Fall' },
        { name: 'subheading', title: 'Subheading Text', type: 'text', initialValue: 'Timeless silhouettes, seasonal tones. Fall into something new.' },
        { name: 'button1Label', title: 'Primary Button Label', type: 'string', initialValue: 'SHOP NEW' },
        { name: 'button1Link', title: 'Primary Button Link (e.g., /?filter=new)', type: 'string' },
        { name: 'button2Label', title: 'Secondary Button Label', type: 'string', initialValue: 'SHOP SALE' },
        { name: 'button2Link', title: 'Secondary Button Link (e.g., /?filter=sale)', type: 'string' },
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
