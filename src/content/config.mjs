import { defineCollection } from 'astro:content';


const authorsCollection = defineCollection({ /* ... */ });

export const collections = {
    'authors': authorsCollection,
};