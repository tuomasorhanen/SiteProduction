import { RiLayoutGridLine } from 'react-icons/ri';
import { defineField } from 'sanity';

const carousel = defineField({
  name: 'carousel',
  type: 'object',
  title: 'Carousel',
  hidden: true,
  description: 'This is a simple grid component, all items are going to be equally wide',
  icon: RiLayoutGridLine,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
{ type: 'hero' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: string }) {
      return {
        title: `${title}`,
      };
    },
  },
});

export default carousel;
