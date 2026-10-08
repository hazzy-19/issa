import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'colourVariant',
  title: 'Colour Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'colourName',
      title: 'Colour Name',
      description: 'e.g. Black, Ivory, Dusty Rose',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description: 'The first photo is the main one.',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error('Add at least one photo'),
    }),
  ],
  preview: {
    select: {
      title: 'colourName',
      images: 'images',
    },
    prepare(selection) {
      const { title, images } = selection
      const count = images ? images.length : 0
      return {
        title: title || 'Unnamed colour',
        subtitle: `${count} photo${count !== 1 ? 's' : ''}`,
        media: images && images[0] ? images[0] : undefined,
      }
    },
  },
})
