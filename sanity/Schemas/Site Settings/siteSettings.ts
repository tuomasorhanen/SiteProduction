import { RiSettings5Line } from 'react-icons/ri';
import { defineType, defineField } from 'sanity';

const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  icon: RiSettings5Line,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the website, displayed in the browser tab and used by search engines.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'A brief description of the website, used by search engines and social media for better indexing and sharing.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The logo image for the website, displayed in the header and used for branding purposes.',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'color',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'blogPage',
      title: 'Blog Page',
      type: 'boolean',
      description: 'Whether or not to display the blog page in the navigation bar.',
    }),
    defineField({
      name: 'blogMenuOrder',
      title: 'Blog Menu Order',
      type: 'number',
      description: 'The order of the blog page in the navigation bar.',
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Global Settings',
      };
    },
  },
});

export default siteSettings;
