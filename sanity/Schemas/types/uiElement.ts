import { SiStyleshare } from 'react-icons/si';
import { defineField } from 'sanity';

const uiElement = defineField({
  name: 'uiElement',
  type: 'object',
  title: 'UI Element',
  hidden: true,
  description: 'A styling element to enhance the UI',
  icon: SiStyleshare,
  fields: [
    {
      name: 'style',
      title: 'UI Element Style',
      type: 'string',
      options: {
        list: [
          { title: 'wave', value: 'wave' },
          { title: 'wave-two', value: 'wave-two' },
          { title: 'slice', value: 'slice' },
        ],
        validation: Rule => [Rule.required().error('A style is required.')],
      },
    },
  ],
});

export default uiElement;
