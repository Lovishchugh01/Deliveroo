import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Restaurant name',
      type: 'string',
      validation:(Rule)=> Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation:(Rule)=> Rule.max(200),
    },
    {
      name: 'image',
      title: 'Image pf restaurant',
      type: 'image',
      
    },
    {
      name: 'lat',
      title: 'Latitude of restaurant',
      type: 'number',
      
    },
    {
      name: 'long',
      title: 'Longitude of restaurant',
      type: 'number',
      
    },
    {
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
      validation:(Rule)=>Rule.required(),
      
    },
    {
      name: 'rating',
      title: 'Enter a rating from (1-5)',
      type: 'number',
      validation:(Rule)=>Rule.required()
      .min(1)
      .max(5)
      .error("please enter a value between 1-5"),
      
    },
    {
      name: 'type',
      title: 'Category',
      validation:(Rule)=>Rule.required(),
      type:"reference",
      to:[{type:"category"}],
      
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of:[{type:"reference" , to:[{type:"dish"}]}],
      
    },
    
  ],


})