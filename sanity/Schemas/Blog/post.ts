import { defineField, defineType } from 'sanity';
import { ImBlogger2 } from 'react-icons/im';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: ImBlogger2,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Your post should have a title. This will be displayed on the post preview card.',
      type: 'string',
      validation: Rule => [Rule.required().error('Title is required.')],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug creates a navigation path to your post.',
      type: 'slug',
      validation: Rule => [Rule.required().error('A post without a slug can not be navigated to.')],
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'person',
      title: 'Person',
      description: 'Add the Author of this post.',
      type: 'reference',
      to: { type: 'person' },
      validation: Rule => [Rule.required().error('Author is required.')],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      description: 'This image will be shown in the preview card for your post.',
      type: 'image',
      validation: Rule => [Rule.required().error('Main image is required.')],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'Choose one or several categories that apply to this post.',
      type: 'array',
      validation: Rule => [Rule.required().error('Your post has to have at least one category.')],
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      validation: Rule => [Rule.required().error('A blog post has to have content.')],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => [Rule.required().error('A blog post has to have an excerpt.')],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      description: 'The date at which the post is published.',
      type: 'datetime',
      validation: Rule => [Rule.required().error('Published at Date is required.')],
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time',
      description: 'How many minutes does it take to read this post?',
      type: 'number',
      validation: Rule => [Rule.required().error('Reading time is required.')],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      person: 'person.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { person } = selection;
      return { ...selection, subtitle: person && `by ${person}` };
    },
  },
});
