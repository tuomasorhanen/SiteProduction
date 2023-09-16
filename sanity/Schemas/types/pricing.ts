import { defineField } from 'sanity';

const Pricing = defineField({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      description: 'Add a service.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
  ],
});

export default Pricing;
