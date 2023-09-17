import { blurred } from '_lib/sanity-utils';
import Image from 'next/image';

import { ITestimonial } from '../../_lib/types';
import { Content } from 'components/Content';
const TestimonialReferenceSection = (props: ITestimonial) => {
  const { title, slug, mainImage, _key, content } = props;

  return (
    <section key={_key} className="borderstyle relative overflow-hidden rounded-lg bg-black shadow-lg">
      {mainImage && (
        <div className="relative flex justify-center py-2 bg-accent">
          {mainImage && (
            <Image
              src={mainImage.asset.url}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={blurred}
              quality={90}
              priority
              alt={mainImage.alt}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      )}
      <div className="bg-bg px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="text-center text-2xl font-bold">{title}</div>
        </div>
        <div className='mt-4'>
        <Content content={content} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialReferenceSection;
