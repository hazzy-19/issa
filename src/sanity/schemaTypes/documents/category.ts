import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fieldsets: [
    {
      name: 'moreOptions',
      title: 'More options (you can ignore these)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Category name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const id = context.document?._id
          const parent = (context.document?.parent as any)?._ref || null
          
          const count = await client.fetch(
            'count(*[_type == "category" && lower(name) == lower($name) && parent._ref == $parent && !(_id in [$id, "drafts." + $id])])',
            { name: value, parent, id: id ? String(id).replace('drafts.', '') : '' }
          )
          
          if (count > 0) {
            return 'You already have a category with this name here.'
          }
          return true
        }),
    }),
    defineField({
      name: 'parent',
      title: 'Sits under',
      description: 'Leave empty for a main section like Women or Men. Pick Women to create a category inside Women.',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        filter: ({ document }) => ({
          filter: '_id != $id && !defined(parent->parent)',
          params: { id: String(document._id).replace('drafts.', '') },
        }),
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const currentId = String(context.document?._id).replace('drafts.', '')
          
          let currentParentId = value._ref
          while (currentParentId) {
            if (currentParentId === currentId) {
              return 'A category cannot sit inside one of its own subcategories.'
            }
            const parentDoc = await client.fetch('*[_id == $id][0]', { id: currentParentId })
            currentParentId = parentDoc?.parent?._ref
          }
          return true
        }),
    }),
    defineField({
      name: 'tileImage',
      title: 'Picture for the home page tile',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description: 'Fills in by itself. Slugs must be unique across ALL categories, so write them like women-abayas and kids-girls-abayas.',
      type: 'slug',
      fieldset: 'moreOptions',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Order in lists',
      description: 'Smaller numbers appear first. Leave 0 to sort by name.',
      type: 'number',
      fieldset: 'moreOptions',
      initialValue: 0,
    }),
    defineField({
      name: 'hideFromWebsite',
      title: 'Hide from website',
      description: 'Turn this on to hide the category even if it has products.',
      type: 'boolean',
      fieldset: 'moreOptions',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'moreOptions',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      parentName: 'parent.name',
      grandparentName: 'parent.parent.name',
      media: 'tileImage',
    },
    prepare(selection) {
      const { title, parentName, grandparentName, media } = selection
      let subtitle = 'Main section'
      if (grandparentName && parentName) {
        subtitle = `${grandparentName} › ${parentName}`
      } else if (parentName) {
        subtitle = parentName
      }
      return {
        title: title || 'Unknown category',
        subtitle,
        media,
      }
    },
  },
})
