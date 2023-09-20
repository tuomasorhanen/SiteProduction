import { blurred } from '_lib/sanity-utils';
import { Content } from 'components/Content';
import UiElement from 'components/uIElements/UiElements';
import Image from 'next/image';

import { IService } from '../../_lib/types';
const Service = (props: IService) => {
  const { title, mainImage, _key, content } = props;
  return (
    <>
      <section
        key={props._key}
        className="relative flex aspect-square max-h-screen w-full items-center justify-center bg-black sm:h-[700px]">
        {mainImage && (
          <Image
            src={mainImage.asset.url}
            fill={true}
            placeholder="blur"
            blurDataURL={blurred}
            quality={90}
            priority
            alt={mainImage.alt}
            style={{ objectFit: 'cover' }}
            className="opacity-50"
          />
        )}
        <div className="z-30 max-w-3xl px-4 pb-2 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {title}
        </div>
      </section>
      <UiElement style="slice" _key={''} _type={'uiElement'} />
      <section className="mx-auto max-w-4xl">
        <div className="p-4 pb-16">
          <Content content={content} />
        </div>
      </section>
    </>
  );
};

export default Service;
