export const builderStructure = (S: any) =>
  S.listItem()
    .title('Page Builder')
    .child(
      S.list()
        .title('Page Builder')
        .items([
          S.listItem().title('Pages').child(S.documentList().title('Pages').filter('_type == "page"')),
          S.listItem().title('Buttons').child(S.documentList().title('Buttons').filter('_type == "landingPage"')),
        ])
    );
