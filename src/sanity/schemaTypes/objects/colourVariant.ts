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
      title: 'Photos & Videos',
      type: 'array',
      description: 'The first item is the main one. You can upload images or videos here.',
      of: [
        {
          type: 'object',
          name: 'colorImage',
          title: 'Color Image',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'color', title: 'Color (optional)', type: 'string' }),
          ],
          preview: {
            select: { title: 'color', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'No color specified', media }
            }
          }
        },
        {
          type: 'object',
          name: 'colorVideo',
          title: 'Color Video',
          fields: [
            defineField({ name: 'videoFile', title: 'Video', type: 'file', options: { accept: 'video/*' } }),
            defineField({ name: 'color', title: 'Color (optional)', type: 'string' }),
          ],
          preview: {
            select: { title: 'color' },
            prepare({ title }) {
              return { title: title || 'No color specified', subtitle: 'Video' }
            }
          }
        },
        { type: 'image', options: { hotspot: true } },
        { type: 'file', title: 'Video File', options: { accept: 'video/*' } }
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
