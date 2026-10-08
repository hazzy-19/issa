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
            parent
              ? 'count(*[_type == "category" && lower(name) == lower($name) && parent._ref == $parent && !(_id in [$id, "drafts." + $id])])'
              : 'count(*[_type == "category" && lower(name) == lower($name) && !defined(parent) && !(_id in [$id, "drafts." + $id])])',
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
      type: 'reference',
      to: [{ type: 'category' }],
      description:
        'Leave this empty for a main section (Female or Male). To make a category inside Female, pick Female here.',
      options: {
        filter: ({ document }) => ({
          filter: '_id != $id && !defined(parent->parent)',
          params: { id: String(document._id).replace('drafts.', '') },
        }),
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value?._ref) return true
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const selfId = String(context.document?._id).replace('drafts.', '')
          let currentId: string | undefined = value._ref
          for (let i = 0; i < 5 && currentId; i++) {
            if (currentId === selfId) {
              return 'A category cannot sit inside one of its own subcategories.'
            }
            currentId = await client.fetch('*[_id == $id][0].parent._ref', { id: currentId })
          }
          return true
        }),
    }),
    defineField({
      name: 'tileImage',
      title: 'Picture for the home page tile',
      description: 'Only needed for main sections like Female and Male. Other categories do not need a picture.',
      type: 'image',
      hidden: ({ document }) => Boolean(document?.parent),
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasParent = Boolean((context.document as { parent?: unknown })?.parent)
          return !hasParent && !value ? 'Add a picture for this main section' : true
        }),
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
