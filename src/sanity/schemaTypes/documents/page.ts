import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fieldsets: [
    {
      name: 'moreOptions',
      title: 'More options',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      fieldset: 'moreOptions',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'moreOptions',
    }),
  ],
})
