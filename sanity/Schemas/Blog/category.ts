import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'What is the name of your category',
      type: 'string',
      validation: Rule => [Rule.required().error('A category has to have a name.')],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Descripe the category to clarify its purpose.',
      type: 'text',
    }),
  ],
});
