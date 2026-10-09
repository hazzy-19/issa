import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'colour',
  title: 'Colour',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'swatch',
      title: 'Swatch',
      type: 'string',
      description: 'Hex color code (e.g. #000000)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'swatch',
    },
  },
})
