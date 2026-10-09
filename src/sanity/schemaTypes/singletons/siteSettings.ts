import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'shop', title: 'Shop' },
    { name: 'whatsapp', title: 'WhatsApp' },
    { name: 'google', title: 'Google' },
  ],
  fieldsets: [
    {
      name: 'developerOnly',
      title: 'Developer only',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Brand
    defineField({ name: 'brandName', title: 'Brand Name', type: 'string', group: 'brand', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'brand' }),
    defineField({ name: 'logoLight', title: 'Logo for light backgrounds', type: 'image', group: 'brand' }),
    defineField({ name: 'logoDark', title: 'Logo for dark backgrounds', type: 'image', group: 'brand' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'brand' }),

    // Contact
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description: 'This is the number customers will chat with.',
      type: 'string',
      group: 'contact',
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Shop address or town', type: 'string', group: 'contact' }),
    defineField({ name: 'openingHours', title: 'Opening Hours', type: 'string', group: 'contact' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['Instagram', 'Facebook', 'TikTok', 'X', 'YouTube'],
              },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),

    // Shop
    defineField({ name: 'currencyLabel', title: 'Currency Label', type: 'string', group: 'shop', initialValue: 'KSh' }),
    defineField({
      name: 'freeDeliveryThreshold',
      title: 'Free delivery above (KSh)',
      type: 'number',
      group: 'shop',
    }),
    defineField({
      name: 'countSoldOutProducts',
      title: 'Show a category even if all its products are sold out',
      description: 'Sold-out products still appear greyed out. Turn this off to hide categories that only have sold-out products.',
      type: 'boolean',
      group: 'shop',
      initialValue: true,
    }),
    defineField({
      name: 'checkoutMode',
      title: 'Checkout Mode',
      description: 'Developer setting. Do not change.',
      type: 'string',
      group: 'shop',
      fieldset: 'developerOnly',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'M-Pesa', value: 'mpesa' },
        ],
        layout: 'radio',
      },
      initialValue: 'whatsapp',
      readOnly: ({ currentUser }) => !currentUser?.roles.some((role) => role.name === 'administrator'),
    }),

    // WhatsApp
    defineField({
      name: 'productInquiryTemplate',
      title: 'Product Inquiry Template',
      description: 'Placeholders: {productName}, {productLink}',
      type: 'text',
      group: 'whatsapp',
      initialValue: 'Hello, I would like to ask about {productName}. {productLink}',
    }),
    defineField({
      name: 'orderTemplate',
      title: 'Order Template',
      description: 'Placeholders: {items}, {total}',
      type: 'text',
      group: 'whatsapp',
      initialValue: 'Hello, I would like to order:\n{items}\nTotal: {total}',
    }),

    // Google
    defineField({
      name: 'seo',
      title: 'Default Google appearance',
      type: 'seo',
      group: 'google',
    }),
    defineField({
      name: 'shareImage',
      title: 'Image shown when the site is shared on WhatsApp or Facebook',
      type: 'image',
      group: 'google',
    }),
  ],
})
