import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Your service should have a title. This will be displayed on the service preview card.',
      type: 'string',
      validation: Rule => [Rule.required().error('Title is required.')],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug creates a navigation path to your service.',
      type: 'slug',
      validation: Rule => [Rule.required().error('A service without a slug can not be navigated to.')],
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
      description: 'This image will be shown in the preview card for your service.',
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
