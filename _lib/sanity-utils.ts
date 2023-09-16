import resolveLinks from '_lib/resolveLinks';
import resolveReferences from '_lib/resolvers/resolveReferences';
import { ICategory, IMenuItem, IPageProps, IPost } from '_lib/types';
import { groq } from 'next-sanity';
import { client } from './client';

export const fetchPageData = async (slug: string | string[]): Promise<IPageProps | null> => {
  const pageQuery = groq`
    *[_type == 'page' && slug.current == $slug][0]{
      ...,
      menuColor,
      content[]{
        ...,
        image{
          alt,
          asset->{
            url,
          },
        },
      },
    }
  `;

  let pageResponse = await client.fetch(pageQuery, { slug });
  if (pageResponse == null) return null;
  pageResponse = await resolveLinks(pageResponse);
  pageResponse = await resolveReferences(pageResponse);
  return pageResponse;
};

export const fetchMenuItems = async (): Promise<IMenuItem[]> => {
  const menuQuery = groq`*[_type == 'page' && defined(menuOrder)]{name, slug, menuOrder, title} | order(menuOrder asc)`;
  return await client.fetch(menuQuery);
};

export const fetchSiteSettings = async () => {
  const siteSettingsQuery = groq`*[_type == 'siteSettings'][0]{
    ...,
    logo{
      ...,
      asset->{
        url
      }
    }
  }`;
  return await client.fetch(siteSettingsQuery);
};

export const fetchBlogPosts = async (): Promise<IPost[]> => {
  const blogsQuery = groq`*[_type == 'post']{
    ...,
    mainImage{
      ...,
      asset->{
        url
      }
    },
    categories[]->{
      name, 
      _id,
    },
    person->{
      name,
      role,
      image{
        ...,
        asset->{
          url
        }
      }
    }
  }`;
  return await client.fetch(blogsQuery);
};

export const fetchBlogCategories = async (): Promise<ICategory[]> => {
  const categoriesQuery = groq`*[_type == 'category']{...}`;
  return await client.fetch(categoriesQuery);
};

export async function getStaticBlogProps() {
  const [blogsResponse, categoriesResponse, menuResponse, siteSettingsResponse] = await Promise.all([
    fetchBlogPosts(),
    fetchBlogCategories(),
    fetchMenuItems(),
    fetchSiteSettings(),
  ]);

  const blogPageQuery = groq`*[_type == 'page' && slug.current == 'blog'][0]`;
  const blogPageData = await client.fetch(blogPageQuery);

  return {
    props: {
      blogs: blogsResponse,
      categories: categoriesResponse,
      menu: menuResponse,
      settings: siteSettingsResponse,
      content: [],
      menuColor: blogPageData?.menuColor || null,
    },
    revalidate: 3600,
  };
}

export async function getStaticPageProps({ params }) {
  const slug = params?.slug || 'etusivu';

  if (slug === 'blog' || (Array.isArray(slug) && slug[0] === 'blog')) {
    return { notFound: true };
  }

  const pageResponse = await fetchPageData(slug);
  if (!pageResponse) {
    return { notFound: true };
  }
  const [menuResponse, siteSettingsResponse] = await Promise.all([fetchMenuItems(), fetchSiteSettings()]);
  return {
    props: {
      ...pageResponse,
      menu: menuResponse,
      settings: siteSettingsResponse,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const menuItems = await fetchMenuItems();
  const paths = menuItems.map(item => ({
    params: { slug: item.slug.current },
  }));
  return { paths, fallback: true };
}

export const blurred =
  'data:image/webp;base64,UklGRrIFAABXRUJQVlA4WAoAAAAgAAAAXQIAlQEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxAMAALBUAJ0BKl4ClgE+7Xa0VKmnJKMhdBpBMB2JaW7gC+tDKcJudUd/7V/I35/QBeScJZ0XrCWKbgmuCa4KVKBpwn5J4ZNjhGKfB/msXOpRax7LEd6FQ6PihEYDaIn5KMeubNB0DrLdE4hHX29I6V++dQZEg/dJ5vacWo6B0Y4wF2jtH3T1m5eLTq9rXePcVi1mD/+xdGOLIibo1ZwO9q1i9JPYiFf5isXJ7G0i6McYC7R3XvepHQD/NYvST2Gr+04vYk4/6LUKDoxxgLtHde96ksnsScf+Yk1RHfzFYrW6u0d173qRzOF2juve9SOZwuzj0KDy2IwoC7fbhrpOeaO6971It5TpYcGkpSQvr3vUjiMLtBeC44SsFsN3vUjmcLtHdey4NJSeJmGPn7Cax3XvN/byzhdo7wTHGAu0d173qRbwaQpNZyMyQv8igeDSU1gFjphWo47rAjCOve9SOXaSlI3aG9Gkg7uPefMAaL++3gG3CM11Hd+rUczhdo5mhV7x4kGBy28ThLOnnIeFq5iWJOrtHde96kW8Bob0d60mEAPyTu6KRYEbvN7Rl8X173p0sOA0TjttYqUCzQacJyET2OexA//zH1qOZu0pH6s47uO7ju47uO7NfnJRRXatYvKZwtQ4p2SYgpL4e84T8kil1oMXn5vrm4o5dp2rh6iih+TClA04Vte2Kqs1cwPmMsQ7Vipk2h23icJZ0XrB3/ii6pu1vmiG1x7MJTJDASMJYtVjD8m5jDah0FlG1x7MJTJDASMJYsMYLr/RH8SRVycfjFNmgwc4D8k7u7wI4iQd5JQbFox3doeooofkwpQNOFARe2D/EJukTgxbIHVg3Nodt4nCWdFz87vh9XF5vpJOgFzeGoGDnAfknd3UTYlmCz7xk4FGxvefJSdPPWbRpJIgAP67VyUZ3Rj4PL3e9KAK7IPqYE2mWSFHH8jLTEtsNdJY1fAAJrLGoaknGjoM0smGbGMmexRp7kyJc6hrWPVDk37SJ9+5ZIa0g1Kxr0ZVtOwm9AKSBusG7bGxjAqqynrb2VvfmqrMi6ShmG65Jq4QtDICLpymr/0JYRt2rJkmW4kk07WYiL6qTNMRSvJm4tMRZHV8mYEMbD+d4Ttb+hy/oNS5z3G68U4Xjis96+pGswktGiS+yE6aPPqopB5tWWfOR/6qb6yyFi2r3QQOSHSEHGSUhqqESlOlezoNw4ZA+5Tn6nFfTeihFoG8kzYpEwk0G8w2DDnMCssxEAAdfxGqSQGxspAwQGWZVAeOjxjQA57EAAAAAAA=';
