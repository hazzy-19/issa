import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'interfaceText',
  title: 'Interface Text',
  type: 'document',
  fields: [
    defineField({
      name: 'emptyBagMessage',
      title: 'Empty Bag Message',
      type: 'string',
    }),
    defineField({
      name: 'emptySearchMessage',
      title: 'Empty Search Message',
      type: 'string',
    }),
    defineField({
      name: 'soldOutLabel',
      title: 'Sold Out Label',
      type: 'string',
      initialValue: 'Sold out',
    }),
    defineField({
      name: 'sizeGuideButtonText',
      title: 'Size Guide Button Text',
      type: 'string',
      initialValue: 'SEE SIZING GUIDE',
    }),
    defineField({
      name: 'deliveryLineInBag',
      title: 'Delivery Line in Bag',
      type: 'string',
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Delivery Zones & Fees',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'zoneName', title: 'Zone Name', type: 'string' },
            { name: 'estimatedTime', title: 'Estimated Time', type: 'string' },
            { name: 'fee', title: 'Fee', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'returnsSummary',
      title: 'Returns & Exchange Summary',
      type: 'text',
    }),
  ],
})
