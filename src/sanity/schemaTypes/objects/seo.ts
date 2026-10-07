import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'You can leave this empty. The site will fill it in for you.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title on Google',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Titles above 60 characters may be cut off on Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Description on Google',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Descriptions above 160 characters may be cut off on Google.'),
    }),
  ],
})
