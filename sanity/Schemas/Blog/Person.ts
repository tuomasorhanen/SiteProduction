import { BsFillPersonFill } from 'react-icons/bs';

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: BsFillPersonFill,
  fields: [
    {
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: Rule => [Rule.required().error('Name is required.')],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => [
        Rule => Rule.required().error('image is required. you can also you the avatar image from "select".'),
      ],
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => [Rule.required().error('Role is required.')],
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'number',
      title: 'Phone Number',
      type: 'string',
    },
  ],
};
