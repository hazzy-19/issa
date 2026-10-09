import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sizeGuide',
  title: 'Size Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Used for these categories',
      description: 'The guide appears on every product in these categories and the ones inside them.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'rows',
      title: 'Measurements',
      description: 'Fill in only the columns you need. Empty columns are hidden on the website.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'size', title: 'Size', type: 'string' }),
            defineField({ name: 'bust', title: 'Bust (cm)', type: 'number' }),
            defineField({ name: 'waist', title: 'Waist (cm)', type: 'number' }),
            defineField({ name: 'hips', title: 'Hips (cm)', type: 'number' }),
            defineField({ name: 'length', title: 'Length (cm)', type: 'number' }),
            defineField({ name: 'sleeve', title: 'Sleeve (cm)', type: 'number' }),
            defineField({ name: 'footLength', title: 'Foot length (cm)', type: 'number' }),
          ],
          preview: {
            select: {
              size: 'size',
              bust: 'bust',
              waist: 'waist',
              hips: 'hips',
              length: 'length',
              sleeve: 'sleeve',
              footLength: 'footLength',
            },
            prepare(selection) {
              const { size, ...measurements } = selection
              const details = Object.entries(measurements)
                .filter(([_, value]) => value !== undefined && value !== null)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ')

              return {
                title: size,
                subtitle: details || 'No measurements',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'note',
      title: 'Note under the table (optional)',
      type: 'text',
    }),
  ],
})
