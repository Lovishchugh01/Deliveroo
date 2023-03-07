import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: "6tb27qvs",
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
// Run this to add exception for localhost 3000 CORS Policy
// sanity cors add http://localhost:3000
export default client;
