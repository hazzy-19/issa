import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'deliveryInfo',
  title: 'Delivery and returns',
  type: 'document',
  fields: [
    defineField({
      name: 'deliveryLineInBag',
      title: 'Delivery Line In Bag',
      description: 'One short line shown in the bag, for example: Delivery is confirmed on WhatsApp.',
      type: 'string',
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Delivery Zones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'zoneName', title: 'Zone Name', type: 'string' }),
            defineField({ name: 'estimatedTime', title: 'Estimated Time', type: 'string' }),
            defineField({
              name: 'fee',
              title: 'Fee',
              description: 'Write an amount like 300, or To be confirmed.',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'returnsSummary',
      title: 'Returns Summary',
      type: 'text',
      rows: 4,
    }),
  ],
})
