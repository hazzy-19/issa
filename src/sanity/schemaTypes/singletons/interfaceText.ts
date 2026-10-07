import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'interfaceText',
  title: 'Website wording',
  type: 'document',
  fields: [
    defineField({ name: 'emptyBagMessage', title: 'Empty Bag Message', type: 'string', initialValue: 'Your bag is empty' }),
    defineField({ name: 'emptySearchMessage', title: 'Empty Search Message', type: 'string', initialValue: 'Nothing matches that search. Try a different word.' }),
    defineField({ name: 'emptyCategoryMessage', title: 'Empty Category Message', type: 'string', initialValue: 'Nothing here yet. Check back soon.' }),
    defineField({ name: 'soldOutLabel', title: 'Sold Out Label', type: 'string', initialValue: 'Sold out' }),
    defineField({ name: 'sizeGuideButtonText', title: 'Size Guide Button Text', type: 'string', initialValue: 'See sizing guide' }),
  ],
})
