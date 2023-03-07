import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured menu components',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'featured category name',
      type: 'string',
      validation: (Rule)=>Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule)=>Rule.max(200),
    },
    {
      name: 'restaurants',
      title: 'Restaurant',
      type: 'array',
      of:[{type:"reference" ,to:[{type:"restaurants"}]}],
    },
  ],
  
})