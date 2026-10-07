import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'colourVariant',
  title: 'Colour Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'reference',
      to: [{ type: 'colour' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description: 'The first photo is the main one.',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error('Add at least one photo for this colour'),
    }),
    defineField({
      name: 'colourSoldOut',
      title: 'This colour is sold out',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'soldOutClothingSizes',
      title: 'Sizes sold out in this colour',
      type: 'array',
      description: 'Tick only the sizes that have run out. Leave empty if everything is available.',
      of: [{ type: 'string' }],
      options: {
        list: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        layout: 'grid',
      },
      hidden: ({ document }) => document?.sizeType !== 'clothing',
    }),
    defineField({
      name: 'soldOutShoeSizes',
      title: 'Sizes sold out in this colour',
      type: 'array',
      description: 'Tick only the sizes that have run out. Leave empty if everything is available.',
      of: [{ type: 'string' }],
      options: {
        list: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
        layout: 'grid',
      },
      hidden: ({ document }) => document?.sizeType !== 'shoes',
    }),
  ],
  preview: {
    select: {
      title: 'colour.name',
      images: 'images',
    },
    prepare(selection) {
      const { title, images } = selection
      const count = images ? images.length : 0
      return {
        title: title || 'Unknown colour',
        subtitle: `${count} photos`,
        media: images && images[0] ? images[0] : undefined,
      }
    },
  },
})
