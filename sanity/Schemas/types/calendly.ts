import { BsFillCalendarWeekFill } from 'react-icons/bs';

const Calendly = {
  name: 'calendly',
  title: 'Calendly',
  type: 'object',
  icon: BsFillCalendarWeekFill,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'calendlyLink',
      title: 'Calendly Link',
      type: 'url',
    },
    {
      name: 'layout',
      title: 'Calendly Layout',
      type: 'string',
      options: {
        list: [
          { title: 'calendly-right', value: 'calendly-right' },
          { title: 'calendly-left', value: 'calendly-left' },
          { title: 'calendly-popup', value: 'calendly-popup' },
        ],
        validation: Rule => [Rule.required().error('A layout is required.')],
      },
    },

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'landingPage' }] }],
    },
  ],
};
export default Calendly;
