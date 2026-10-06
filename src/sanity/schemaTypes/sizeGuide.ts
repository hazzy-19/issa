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
    }),
    defineField({
      name: 'categories',
      title: 'Categories It Applies To',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'tables',
      title: 'Measurements by Size',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tableName', title: 'Table Name', type: 'string' },
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'size', title: 'Size', type: 'string' },
                    { name: 'measurements', title: 'Measurements', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
