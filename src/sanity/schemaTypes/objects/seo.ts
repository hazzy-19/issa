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
    }),
    defineField({
      name: 'description',
      title: 'Description on Google',
      type: 'text',
      rows: 3,
    }),
  ],
})
