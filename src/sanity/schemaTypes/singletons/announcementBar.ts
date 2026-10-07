import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcementBar',
  title: 'Announcement bar',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Show the announcement bar',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'messages',
      title: 'Messages',
      description: 'If you add more than one, they take turns.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isDismissible',
      title: 'Let visitors close it',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Show from',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'Hide after',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.document as any)?.startDate
          if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
            return 'Hide after date must be after Show from date'
          }
          return true
        }),
    }),
  ],
})
