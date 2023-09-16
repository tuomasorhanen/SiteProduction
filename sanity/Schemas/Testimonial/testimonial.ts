import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Your testimonial should have a title. This will be displayed on the testimonial preview card.',
      type: 'string',
      validation: Rule => [Rule.required().error('Title is required.')],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug creates a navigation path to your testimonial.',
      type: 'slug',
      validation: Rule => [Rule.required().error('A testimonial without a slug can not be navigated to.')],
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    defineField({
      name: 'mainImage',
      title: 'Main image',
      description: 'This image will be shown in the preview card for your testimonial.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
  ],
});
