import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'messages',
      title: 'Messages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            { name: 'link', title: 'Link (Optional)', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'isDismissible',
      title: 'Dismissible',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date (Optional)',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (Optional)',
      type: 'datetime',
    }),
  ],
})
