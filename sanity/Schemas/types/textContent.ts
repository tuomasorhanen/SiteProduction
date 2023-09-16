import { TbHeading } from 'react-icons/tb';
import { defineField } from 'sanity';

const textContent = defineField({
  name: 'headingAndTitle',
  title: 'Heading And Title',
  type: 'object',
  icon: TbHeading,
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'centered', value: 'centered' },
          { title: 'left-aligned', value: 'left-aligned' },
        ],
        validation: Rule => [Rule.required().error('A style is required.')],
      },
    },
  ],
});

export default textContent;
