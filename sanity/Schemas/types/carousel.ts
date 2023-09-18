export default {
    name: 'carousel',
    title: 'Carousel',
    type: 'object',
    fields: [
        {name: 'title',
        title: 'title',
        type: 'string',
      },
        {
          name: 'carouselItems',
          title: 'Carousel Items',
          type: 'array',
          of: [
              {
                  type: 'object',
                  fields: [
                      { name: 'title', type: 'string', title: 'Title' },
                      { name: 'description', type: 'string', title: 'Description' }
                  ]
              }
          ]
      },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true, 
            },
          },
        {
            name: 'opacity',
            title: 'Background Opacity',
            type: 'number',
            options: {
              list: [
                { title: '10', value: 10 },
                { title: '20', value: 20 },
                { title: '30', value: 30 },
                { title: '40', value: 40 },
                { title: '50', value: 50 },
                { title: '75', value: 75 },
                { title: '80', value: 80 },
                { title: '90', value: 90 },
                { title: '100', value: 100 },
              ],
            },
          },
          {
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'landingPage' }] }],
          },
          {
            name: 'customColors',
            title: 'Custom Colors',
            type: 'boolean',
          },
          {
            name: 'carouselTextColor',
            title: 'Text Color',
            type: 'color',
            hidden: ({ parent }) => !parent.customColors,
          },
          {
            name: 'carouselBgColor',
            title: 'Background Color',
            type: 'color',
            hidden: ({ parent }) => !parent.customColors,
          },
    ],
};