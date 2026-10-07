import type { StructureResolver } from 'sanity/structure'

export const singletonTypes = new Set([
  'siteSettings',
  'announcementBar',
  'homePage',
  'navigation',
  'deliveryInfo',
  'interfaceText',
])

const singleton = (S: any, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Shop')
        .child(
          S.list()
            .title('Shop')
            .items([
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('colour').title('Colours'),
              S.documentTypeListItem('sizeGuide').title('Size guides'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Homepage and banners')
        .child(
          S.list()
            .title('Homepage and banners')
            .items([
              singleton(S, 'homePage', 'Home page'),
              singleton(S, 'announcementBar', 'Announcement bar'),
              S.documentTypeListItem('promoBanner').title('Promo banners'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Menus and footer')
        .child(
          S.list()
            .title('Menus and footer')
            .items([
              singleton(S, 'navigation', 'Navigation and footer'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('page').title('Pages'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              singleton(S, 'siteSettings', 'Site settings'),
              singleton(S, 'deliveryInfo', 'Delivery and returns'),
              singleton(S, 'interfaceText', 'Website wording'),
            ])
        ),
    ])
