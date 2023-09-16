export const serviceStructure = (S: any) =>
  S.listItem()
    .title('service')
    .child(
      S.list()
        .title('service Documents')
        .items([S.listItem().title('Services').child(S.documentList().title('Services').filter('_type == "service"'))])
    );
