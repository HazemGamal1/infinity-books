import imageUrlBuilder from '@sanity/image-url'
import { createClient } from "next-sanity";

export const client = createClient({
    projectId: 'qpegdpv5',
    dataset: 'production',
    apiVersion: '2024-05-04',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: false,
    ignoreBrowserTokenWarning: true
})

const builder = imageUrlBuilder(client);

export function urlFor(source: any){
    return builder.image(source);
}