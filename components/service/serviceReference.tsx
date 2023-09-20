import { blurred } from '_lib/sanity-utils';
import Image from 'next/image';

import { IService } from '../../_lib/types';
import Link from 'next/link';

const ServiceReferenceSection = (props: IService) => {
  const { title, mainImage, _key, content, slug } = props;

  return (
    <section key={_key} className="borderstyle relative overflow-hidden bg-black shadow-md shadow-gray-500">
      <Link href={`/${slug?.current}`}>
      {mainImage && (
        <div className="relative w-full" style={{ paddingBottom: '40%' }}>
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
            />
          )}
        </div>
      )}
      <div className="bg-bg px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="text-center text-2xl font-bold">{title}</div>
        </div>
      </div>
      </Link>
    </section>
  );
};

export default ServiceReferenceSection;
