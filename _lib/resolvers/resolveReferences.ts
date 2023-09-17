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
          case 'carousel':
            if (Array.isArray(item.items)) {
              item.items = await Promise.all(
                item.items.map(async (carouselItem: any) => {
                  const { _ref, _type, buttons } = carouselItem;
                  if (_type === 'hero' && _ref) {
                    const carouselQry = groq`*[_id == '${_ref}']{
                      ...,
                      image{
                        alt,
                        asset->{
                          url,
                        },
                      },
                      "buttons": buttons[]->{
                        ...
                      }
                    }[0]
                    `;
                    const carouselData = await client.fetch(carouselQry);
                    if (Array.isArray(buttons)) {
                      carouselData.buttons = await Promise.all(
                        buttons.map(async (button: any) => {
                          const { _ref, _type } = button;
                          if (_type === 'reference' && _ref) {
                            const buttonQry = groq`*[_id == '${_ref}']{
                              ...,
                              image {
    alt,
    "assetURL": asset->url
  },
                            }[0]`;
                            const buttonData = await client.fetch(buttonQry);
                            return buttonData;
                          }
                          return button;
                        })
                      );
                    }
                    return carouselData;
                  }
                  return carouselItem;
                })
              );
            }
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
