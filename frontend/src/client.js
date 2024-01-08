
import imageUrlBuilder from '@sanity/image-url';
import myConfiguredSanityClient from '@sanity/client';



export const client = myConfiguredSanityClient({
  
  projectId: 'h9tirhuk',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
  token: 'skP63sPvLs4UKpzJI5BJ9GttaCobkSdescMKzL9yRD636g2WW2BWmU9HUrEme8EMdmalWGHC9NRtPKrbFlnAag8VGTJCCT3AZWU7BDNXFzWfVbb0dgacmQXCRmzznpMcCM1dq5m7d6iN2VNhtVh3oJdXkYvIXGd7et6M7b5wTnQz8S7qjhL0',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source).url()