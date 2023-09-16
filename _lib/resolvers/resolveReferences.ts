import { groq } from 'next-sanity';
import { IPage } from '_lib/types';
import { client } from '_lib/client';

const resolveReferences = async (page: IPage) => {
  const { content } = page;

  if (!content) {
    return page;
  }

  const resolvedContent = await Promise.all(
    content.map(async (item: any) => {
      const { _type } = item;

      switch (_type) {
        case 'grid':
          item.items = await Promise.all(
            item.items.map(async (gridItem: any) => {
              const { _ref, _type } = gridItem;
              if (_type === 'service' && _ref) {
                const serviceQry = groq`*[_id == '${_ref}']{
                    ...,
                    mainImage{
                      alt, 
                      asset->{
                      url,                  },
                  },
                }[0]
              `;
                const serviceData = await client.fetch(serviceQry);

                return serviceData;
              }
              if (_type === 'testimonial' && _ref) {
                const testimonialQry = groq`*[_id == '${_ref}']{
                    ...,
                    mainImage{
                      alt, 
                      asset->{
                      url,                    },
                  },
                }[0]
              `;
                const testimonialData = await client.fetch(testimonialQry);

                return testimonialData;
              } else {
                return gridItem;
              }
            })
          );
          break;
        case 'service':
          if (item._ref && item._type === 'service') {
            const serviceQry = groq`*[_id == '${item._ref}']{
                  ...,
                  mainImage{
                    alt,
                  asset->{
                    url                  },
                },
              }[0]
            `;
            const serviceData = await client.fetch(serviceQry);
            return serviceData;
          }
          break;
        case 'testimonial':
          if (item._ref && item._type === 'testimonial') {
            const testimonialQry = groq`*[_id == '${item._ref}']{
                  ...,
                  mainImage{
                    alt,
                  asset->{
                    url                  },
                },
              }[0]
            `;
            const testimonialData = await client.fetch(testimonialQry);
            return testimonialData;
          }
          break;

        default:
          break;
      }

      return item;
    })
  );

  page.content = resolvedContent;
  return page;
};

export default resolveReferences;
