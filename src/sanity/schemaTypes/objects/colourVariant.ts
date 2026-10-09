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
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description: 'The first photo is the main one.',
      of: [
        {
          type: 'object',
          name: 'colorImage',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'color', title: 'Color (optional)', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'color',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'No color specified',
                media,
              }
            }
          }
        },
        { type: 'image', options: { hotspot: true } }
      ],
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
        media: images && images[0] ? (images[0].image || images[0]) : undefined,
      }
    },
  },
})
