import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Light)',
      type: 'image',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark)',
      type: 'image',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address / Town',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'currencyLabel',
      title: 'Currency Label',
      type: 'string',
      initialValue: 'KSh',
    }),
    defineField({
      name: 'freeDeliveryThreshold',
      title: 'Free Delivery Threshold',
      type: 'number',
    }),
    defineField({
      name: 'countSoldOutProducts',
      title: 'Count sold-out products for category visibility',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'checkoutMode',
      title: 'Checkout Mode',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'M-Pesa', value: 'mpesa' },
        ],
      },
      initialValue: 'whatsapp',
    }),
    defineField({
      name: 'whatsappTemplates',
      title: 'WhatsApp Templates',
      type: 'object',
      fields: [
        { name: 'productInquiry', title: 'Product Inquiry Template', type: 'text' },
        { name: 'orderTemplate', title: 'Order Template', type: 'text' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'shareImage', title: 'Sharing Image', type: 'image' },
      ],
    }),
  ],
})
