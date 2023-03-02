import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category name',
      type: 'string',
      validation:(Rule)=>Rule.required(),
    },
    {
      name: 'image',
      title: 'Image of category',
      type: 'image',
    },
  ],
})