export const testimonialStructure = (S: any) =>
  S.listItem()
    .title('testimonial')
    .child(
      S.list()
        .title('testimonial Documents')
        .items([
          S.listItem()
            .title('Testimonials')
            .child(S.documentList().title('Testimonials').filter('_type == "testimonial"')),
        ])
    );
