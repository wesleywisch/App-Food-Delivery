import Prismic from '@prismicio/client';
// import { DefaultClient } from '@prismicio/client/types/client';

// Props = req?: unknown

export function getPrismicClient() {
  const prismic = Prismic.createClient(
    process.env.REACT_APP_API_ENDPOINT as string,
    {
      // req,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN as string,
    }
  );

  return prismic;
}
