import { groq } from 'next-sanity';
import { client } from './client';

const resolveUrl = navResult => {
  if (!navResult || !navResult.slug || !navResult.slug.current) return '';
  return navResult._type === 'page' ? `${navResult.slug.current}` : '';
};

const processButtons = async cnt => {
  if (!cnt.buttons) return cnt;

  const buttonPromises = cnt.buttons.map(async button => {
    if (button._type !== 'reference') return button;

    const ref = button._ref;
    const ctaQuery = groq`*[_id == '${ref}'][0]{
      ...,
      image{
        alt,
        asset->{
          url
        }
      }
    }`;

    const ctaResult = await client.fetch(ctaQuery);
    const navQuery = groq`*[_id == '${ref}']{
      navigateToPage->
    }[0].navigateToPage`;

    const navResult = await client.fetch(navQuery);
    const navigateToPage = resolveUrl(navResult);
    const linkType = ctaResult.navigateToUrl ? 'external' : 'internal';

    return {
      ...ctaResult,
      navigateToPage,
      linkType,
    };
  });

  cnt.buttons = await Promise.all(buttonPromises);
  return cnt;
};

const resolveLinks = async page => {
  if (!page) return null;

  const contentPromises = page.content.map(async cnt => {
    if (['hero', 'customButton', 'post', 'calendly'].includes(cnt._type)) {
      return await processButtons(cnt);
    } else if (cnt._type === 'grid') {
      const itemPromises = cnt.items.map(async item => {
        if (item._type === 'card') {
          return await processButtons(item);
        }
        return item;
      });
      cnt.items = await Promise.all(itemPromises);
      return cnt;
    }
    return cnt;
  });

  page.content = await Promise.all(contentPromises);
  return page;
};

export default resolveLinks;
