import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promoBanner',
  title: 'Promo banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name (only you see this)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'isActive',
      title: 'Show this banner',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.document as any)?.startDate
          if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
  ],
})
