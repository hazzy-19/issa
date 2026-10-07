import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation and footer',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'extraHeaderLinks',
      title: 'Extra Header Links',
      description: 'The main menu builds itself from your categories. Use this only for extra links like Sale or About.',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'link', title: 'Link', type: 'link' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'link', title: 'Link', type: 'link' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({ name: 'footerBrandStatement', title: 'Footer Brand Statement', type: 'text', rows: 2, group: 'footer' }),
    defineField({ name: 'copyright', title: 'Copyright', type: 'string', group: 'footer' }),
  ],
})
